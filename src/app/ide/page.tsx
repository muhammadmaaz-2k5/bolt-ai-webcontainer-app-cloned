// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import { Layout, LayoutContent, LayoutPanel } from '@astryxdesign/core/Layout';
import { ResizeHandle, useResizable } from '@astryxdesign/core/Resizable';
import { Stack, StackItem } from '@astryxdesign/core/Layout';
import { useMediaQuery } from '@astryxdesign/core/hooks';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import {
  Monitor,
  Tablet,
  Smartphone,
  Zap,
} from 'lucide-react';

import { fileManager, type ProjectFile } from '../../services/fileService';
import {
  generateAppWithGroq,
  ACTIVE_GROQ_KEY,
  type GeneratedAppData,
} from '../../services/groqService';

import InteractiveTerminal from '../../components/InteractiveTerminal';
import TopHeader, { type WorkspaceLayout } from '../../components/TopHeader';
import StatusBar from '../../components/StatusBar';
import AIAssistantModal from '../../components/AIAssistantModal';
import CommandPalette from '../../components/CommandPalette';
import FileExplorer from '../../components/FileExplorer';
import PropertiesPanel from '../../components/PropertiesPanel';
import InteractiveAppRenderer from '../../components/InteractiveAppRenderer';
import SandboxedAppPreview from '../../components/SandboxedAppPreview';
import LiveCodeEditor from '../../components/LiveCodeEditor';

const styles: Record<string, CSSProperties> = {
  contentFill: {
    height: '100%',
  },
  terminalWrapper: {
    minHeight: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  editorArea: {
    overflow: 'auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#090d16',
  },
  terminalPanel: {
    flexShrink: 0,
    overflow: 'hidden',
  },
};

export default function ResizableWorkspacePage() {
  const [allFiles, setAllFiles] = useState<ProjectFile[]>(() => fileManager.getAllFiles());
  const [activeFilePath, setActiveFilePath] = useState<string>(() => 'src/App.tsx');
  const [openTabs, setOpenTabs] = useState<string[]>(['src/App.tsx']);
  const [activeTermTab, setActiveTermTab] = useState<string>('terminal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layout, setLayout] = useState<WorkspaceLayout>('split');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('neutral');

  // Real-time Groq Builder State
  const [apiKey, setApiKey] = useState<string>(ACTIVE_GROQ_KEY);
  const [selectedModel, setSelectedModel] = useState<string>('openai/gpt-oss-120b');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState({
    latencyMs: 308,
    tokensPerSecond: 320,
  });

  // Active Generated App Type
  const [currentAppType, setCurrentAppType] = useState<string>('todo');
  const [currentAppName, setCurrentAppName] = useState<string>('TaskFlow Pro');

  // Real-Time Groq AI Universal App Generator
  const handleRealtimeGenerate = async (prompt: string, model: string = selectedModel) => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const result = await generateAppWithGroq(prompt, apiKey, model);

      if (result.data.operations && result.data.operations.length > 0) {
        // Apply structured file operations incrementally
        fileManager.applyOperations(result.data.operations);
      } else if (result.data.files && Object.keys(result.data.files).length > 0) {
        fileManager.clearAndSetProjectFiles(result.data.files);
      }

      setTelemetry({
        latencyMs: result.latencyMs,
        tokensPerSecond: result.tokensPerSecond || 320,
      });

      const updatedFiles = fileManager.getAllFiles();
      setAllFiles(updatedFiles);
      if (!openTabs.includes(activeFilePath)) {
        setActiveFilePath('src/App.tsx');
      }

      setHistoryItems(prev => [
        { label: `AI: ${prompt.slice(0, 32)}...`, time: 'Just now' },
        ...prev.slice(0, 8),
      ]);
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle live user edits in the Code Editor
  const handleLiveCodeEdit = (newCode: string) => {
    fileManager.updateCode(activeFilePath, newCode);
    setAllFiles(fileManager.getAllFiles());
  };

  const [historyItems, setHistoryItems] = useState<Array<{ label: string; time: string }>>([
    { label: 'Workspace active', time: 'Just now' },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-astryx-theme', theme);
    document.documentElement.setAttribute('data-theme', 'dark');
  }, [theme]);

  const refreshFiles = () => {
    setAllFiles(fileManager.getAllFiles());
  };

  const handleSelectFile = (filePath: string) => {
    setActiveFilePath(filePath);
    if (!openTabs.includes(filePath)) {
      setOpenTabs(prev => [...prev, filePath]);
    }
    setHistoryItems(prev => [
      { label: `Opened ${filePath.split('/').pop()}`, time: 'Just now' },
      ...prev.slice(0, 9),
    ]);
  };

  const handleCloseTab = (e: React.MouseEvent, filePath: string) => {
    e.stopPropagation();
    const filtered = openTabs.filter(t => t !== filePath);
    setOpenTabs(filtered);
    if (activeFilePath === filePath && filtered.length > 0) {
      setActiveFilePath(filtered[0]);
    }
  };

  const currentFile: ProjectFile =
    fileManager.getFile(activeFilePath) ||
    allFiles[0] || {
      id: 'fallback',
      name: 'App.tsx',
      path: 'src/App.tsx',
      code: '// Empty file',
      lines: 1,
      size: '0 B',
      lastModified: 'Just now',
      type: 'React Component',
      language: 'typescript',
      imports: 'none',
      exports: 'none',
      hooks: 'none',
    };

  const startPanel = useResizable({
    defaultSize: 240,
    minSizePx: 160,
    maxSizePx: 380,
    collapsible: true,
    collapsedSize: 40,
  });

  const endPanel = useResizable({
    defaultSize: 280,
    minSizePx: 200,
    maxSizePx: 420,
    collapsible: true,
    collapsedSize: 40,
  });

  const bottomPanel = useResizable({
    defaultSize: 240,
    minSizePx: 100,
    maxSizePx: Infinity,
    collapsible: true,
    collapsedSize: 40,
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', background: '#0a0e17' }}>
      {/* Top Header with Real-Time Groq AI Prompt & Model Selector */}
      <TopHeader
        activeFile={currentFile.name}
        layout={layout}
        onLayoutChange={setLayout}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        onThemeChange={setTheme}
        onGeneratePrompt={handleRealtimeGenerate}
        isGenerating={isGenerating}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        telemetry={telemetry}
      />

      {/* Main Unified Workspace */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Layout
          height="fill"
          content={
            <LayoutContent padding={0}>
              <Layout
                height="fill"
                start={
                  isMobile ? undefined : (
                    <>
                      {!startPanel.isCollapsed && (
                        <LayoutPanel
                          width={startPanel.size}
                          hasDivider={false}
                          padding={0}>
                          <FileExplorer
                            activeFile={activeFilePath}
                            onSelectFile={handleSelectFile}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            files={allFiles}
                            onFileCreated={refreshFiles}
                            onFileDeleted={refreshFiles}
                          />
                        </LayoutPanel>
                      )}
                      <ResizeHandle
                        direction="horizontal"
                        hasDivider
                        isAlwaysVisible={false}
                        resizable={startPanel.props}
                        label="Resize file explorer"
                      />
                    </>
                  )
                }
                content={
                  <LayoutContent padding={0}>
                    <Layout
                      height="fill"
                      content={
                        <LayoutContent padding={0}>
                          <Stack direction="vertical" style={styles.contentFill}>
                            {/* Editor Tabs Bar */}
                            <div className="editor-tab-bar" style={{ background: '#090d16' }}>
                              {openTabs.map(filePath => {
                                const tabName = filePath.split('/').pop() || filePath;
                                const isActive = activeFilePath === filePath;
                                return (
                                  <div
                                    key={filePath}
                                    onClick={() => setActiveFilePath(filePath)}
                                    className={`editor-tab-item ${isActive ? 'active' : ''}`}
                                  >
                                    <CodeBracketIcon style={{ width: 14, height: 14, color: isActive ? '#38bdf8' : '#64748b' }} />
                                    <span>{tabName}</span>
                                    {openTabs.length > 1 && (
                                      <span
                                        onClick={e => handleCloseTab(e, filePath)}
                                        style={{
                                          fontSize: 13,
                                          opacity: 0.6,
                                          marginLeft: 6,
                                          padding: '0 2px',
                                          borderRadius: 3,
                                        }}
                                      >
                                        ×
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Main Center Area: Split View (Code on Left, Interactive App on Right) */}
                            <StackItem size="fill" style={styles.editorArea}>
                              {layout === 'split' ? (
                                <div style={{ display: 'flex', height: '100%', width: '100%', overflow: 'hidden' }}>
                                  {/* Left: Live Editable Code Editor */}
                                  <div style={{ flex: 1, minWidth: 0, height: '100%', borderRight: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                                    <LiveCodeEditor
                                      file={currentFile}
                                      onChange={handleLiveCodeEdit}
                                      onAskAI={() => setIsAIOpen(true)}
                                    />
                                  </div>

                                  {/* Right: Live Interactive App Preview Sandbox */}
                                  <div style={{ flex: 1.15, minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column', background: '#04070d' }}>
                                    {/* Viewport Control Bar */}
                                    <div style={{
                                      padding: '6px 14px',
                                      background: '#090d16',
                                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} className="bolt-pulse-dot" />
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8' }}>Live Sandbox: {currentAppName}</span>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {[
                                          { id: 'desktop', icon: Monitor, label: 'Desktop' },
                                          { id: 'tablet', icon: Tablet, label: 'Tablet' },
                                          { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                                        ].map(vp => {
                                          const Icon = vp.icon;
                                          const isActive = viewport === vp.id;
                                          return (
                                            <button
                                              key={vp.id}
                                              onClick={() => setViewport(vp.id as any)}
                                              title={vp.label}
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 3,
                                                background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                                                border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                                                color: isActive ? '#38bdf8' : '#94a3b8',
                                                padding: '3px 6px',
                                                borderRadius: 5,
                                                fontSize: 10.5,
                                                cursor: 'pointer',
                                              }}
                                            >
                                              <Icon size={12} />
                                              <span>{vp.label}</span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Live Interactive App Container */}
                                    <div style={{ flex: 1, minHeight: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: viewport === 'desktop' ? 0 : '16px 0' }}>
                                      <SandboxedAppPreview
                                        viewport={viewport}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : layout === 'preview' ? (
                                <div style={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', background: '#04070d' }}>
                                  <div style={{
                                    padding: '6px 14px',
                                    background: '#090d16',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                  }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8' }}>Fullscreen Live App Sandbox</span>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                      {[
                                        { id: 'desktop', icon: Monitor, label: 'Desktop' },
                                        { id: 'tablet', icon: Tablet, label: 'Tablet' },
                                        { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                                      ].map(vp => {
                                        const Icon = vp.icon;
                                        const isActive = viewport === vp.id;
                                        return (
                                          <button
                                            key={vp.id}
                                            onClick={() => setViewport(vp.id as any)}
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: 3,
                                              background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                                              color: isActive ? '#38bdf8' : '#94a3b8',
                                              padding: '3px 8px',
                                              borderRadius: 5,
                                              fontSize: 11,
                                              cursor: 'pointer',
                                              border: 'none',
                                            }}
                                          >
                                            <Icon size={12} />
                                            <span>{vp.label}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div style={{ flex: 1, minHeight: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <SandboxedAppPreview
                                      viewport={viewport}
                                    />
                                  </div>
                                </div>
                              ) : (
                                /* Code Only */
                                <LiveCodeEditor
                                  file={currentFile}
                                  onChange={handleLiveCodeEdit}
                                  onAskAI={() => setIsAIOpen(true)}
                                />
                              )}
                            </StackItem>

                            {/* Terminal Resizable Panel */}
                            <ResizeHandle
                              direction="vertical"
                              hasDivider
                              isReversed
                              isAlwaysVisible={false}
                              resizable={bottomPanel.props}
                              label="Resize terminal"
                            />
                            {!bottomPanel.isCollapsed && (
                              <Stack
                                direction="vertical"
                                height={bottomPanel.size}
                                style={styles.terminalPanel}>
                                <StackItem size="fill" style={styles.terminalWrapper}>
                                  <InteractiveTerminal
                                    activeTab={activeTermTab}
                                    onTabChange={setActiveTermTab}
                                    onSelectFile={handleSelectFile}
                                    onFilesChanged={refreshFiles}
                                  />
                                </StackItem>
                              </Stack>
                            )}
                          </Stack>
                        </LayoutContent>
                      }
                      end={
                        isMobile ? undefined : (
                          <>
                            <ResizeHandle
                              direction="horizontal"
                              hasDivider
                              isReversed
                              isAlwaysVisible={false}
                              resizable={endPanel.props}
                              label="Resize properties panel"
                            />
                            {!endPanel.isCollapsed && (
                              <LayoutPanel
                                width={endPanel.size}
                                hasDivider={false}
                                padding={0}>
                                <PropertiesPanel
                                  activeFile={currentFile}
                                  onOpenPreview={() => setLayout('preview')}
                                  onOpenAI={() => setIsAIOpen(true)}
                                  historyItems={historyItems}
                                />
                              </LayoutPanel>
                            )}
                          </>
                        )
                      }
                    />
                  </LayoutContent>
                }
              />
            </LayoutContent>
          }
        />
      </div>

      {/* Bottom Status Bar */}
      <StatusBar
        activeFile={currentFile.name}
        linesCount={currentFile.lines}
        language={currentFile.language}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        activeFile={currentFile.name}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectFile={handleSelectFile}
        onOpenAI={() => setIsAIOpen(true)}
        onTogglePreview={() => setLayout(layout === 'split' ? 'code' : 'split')}
      />
    </div>
  );
}

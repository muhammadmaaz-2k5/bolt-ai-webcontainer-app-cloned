import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Columns2,
  Code2,
  Eye,
  Key,
  RotateCcw,
} from 'lucide-react';

export type WorkspaceLayout = 'split' | 'code' | 'preview';

interface TopHeaderProps {
  activeFile: string;
  layout: WorkspaceLayout;
  onLayoutChange: (layout: WorkspaceLayout) => void;
  onOpenCommandPalette: () => void;
  theme: string;
  onThemeChange: (theme: string) => void;
  onGeneratePrompt: (prompt: string, model: string) => void;
  isGenerating: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  telemetry: { latencyMs: number; tokensPerSecond: number };
}

export default function TopHeader({
  activeFile,
  layout,
  onLayoutChange,
  onOpenCommandPalette,
  theme,
  onThemeChange,
  onGeneratePrompt,
  isGenerating,
  selectedModel,
  onModelChange,
  apiKey,
  onApiKeyChange,
}: TopHeaderProps) {
  const [promptInput, setPromptInput] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;
    onGeneratePrompt(promptInput, selectedModel);
  };

  return (
    <header className="bolt-header" style={{ height: 50, padding: '0 16px', gap: 12, display: 'flex', alignItems: 'center' }}>
      {/* Brand & Project Info */}
      <div className="bolt-logo-group" style={{ gap: 10, flexShrink: 0 }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #f97316 0%, #6366f1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(249, 115, 22, 0.45)',
        }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>⚡</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            bolt.ai
          </span>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 7px',
            borderRadius: 9999,
            background: 'rgba(249, 115, 22, 0.15)',
            color: '#fb923c',
            border: '1px solid rgba(249, 115, 22, 0.3)',
          }}>
            Groq LPU
          </span>
        </div>
      </div>

      {/* Center: Real-Time Groq AI Prompt Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          maxWidth: 680,
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          border: isGenerating ? '1px solid #f97316' : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 8,
          padding: '2px 6px 2px 10px',
          boxShadow: isGenerating ? '0 0 14px rgba(249, 115, 22, 0.3)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <Sparkles size={14} color={isGenerating ? '#fb923c' : '#38bdf8'} style={{ marginRight: 8, flexShrink: 0 }} />
        <input
          type="text"
          value={promptInput}
          onChange={e => setPromptInput(e.target.value)}
          placeholder="Prompt Groq AI to build components or full pages in real time..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f8fafc',
            fontSize: 12.5,
            padding: '5px 0',
          }}
        />

        {/* Model dropdown */}
        <select
          value={selectedModel}
          onChange={e => onModelChange(e.target.value)}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#38bdf8',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 6px',
            borderRadius: 6,
            outline: 'none',
            marginRight: 6,
            cursor: 'pointer',
          }}
        >
          <option value="openai/gpt-oss-120b" style={{ background: '#0f172a' }}>gpt-oss-120b (Ultra)</option>
          <option value="openai/gpt-oss-20b" style={{ background: '#0f172a' }}>gpt-oss-20b (Turbo)</option>
          <option value="qwen/qwen3.8-27b" style={{ background: '#0f172a' }}>qwen3.8-27b (Fast)</option>
          <option value="groq/compound" style={{ background: '#0f172a' }}>groq/compound</option>
        </select>

        <button
          type="submit"
          disabled={isGenerating || !promptInput.trim()}
          style={{
            background: isGenerating
              ? '#475569'
              : promptInput.trim()
              ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
              : 'rgba(255, 255, 255, 0.08)',
            color: promptInput.trim() && !isGenerating ? '#fff' : '#94a3b8',
            border: 'none',
            borderRadius: 6,
            padding: '5px 12px',
            fontSize: 11.5,
            fontWeight: 700,
            cursor: isGenerating || !promptInput.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            boxShadow: promptInput.trim() ? '0 2px 8px rgba(249, 115, 22, 0.35)' : 'none',
          }}
        >
          {isGenerating ? <RotateCcw size={12} className="bolt-pulse-dot" /> : <Zap size={12} />}
          <span>{isGenerating ? 'Building...' : 'Build'}</span>
        </button>
      </form>

      {/* Right Controls: View Layout Switcher (Split, Code, Preview) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 7,
          padding: 2,
          gap: 2,
        }}>
          {[
            { id: 'split', label: 'Split View', icon: Columns2 },
            { id: 'code', label: 'Code Only', icon: Code2 },
            { id: 'preview', label: 'Live Preview', icon: Eye },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = layout === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onLayoutChange(tab.id as WorkspaceLayout)}
                title={tab.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 8px',
                  borderRadius: 5,
                  border: 'none',
                  fontSize: 11.5,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  background: isActive ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  boxShadow: isActive ? '0 1px 4px rgba(0, 0, 0, 0.3)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* API Key Modal Button */}
        <button
          onClick={() => setShowApiKeyModal(!showApiKeyModal)}
          title="Groq API Key Config"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: apiKey ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            border: apiKey ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
            color: apiKey ? '#4ade80' : '#94a3b8',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <Key size={12} />
          <span>{apiKey ? 'Key Active' : 'Key'}</span>
        </button>

        {/* Theme Selector */}
        <select
          value={theme}
          onChange={e => onThemeChange(e.target.value)}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            padding: '4px 6px',
            borderRadius: 6,
            fontSize: 11,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="neutral" style={{ background: '#0f172a' }}>Astryx Neutral</option>
          <option value="gothic" style={{ background: '#0f172a' }}>Astryx Gothic</option>
          <option value="chocolate" style={{ background: '#0f172a' }}>Astryx Chocolate</option>
        </select>
      </div>

      {/* Popdown for API Key */}
      {showApiKeyModal && (
        <div style={{
          position: 'absolute',
          top: 52,
          right: 16,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#0f172a',
          padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid rgba(249, 115, 22, 0.3)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
        }}>
          <Key size={14} color="#f97316" />
          <input
            type="password"
            value={apiKey}
            onChange={e => onApiKeyChange(e.target.value)}
            placeholder="Enter Groq API Key (gsk_...)"
            style={{
              width: 260,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 12,
              outline: 'none',
              fontFamily: 'var(--font-mono)',
            }}
          />
          <button
            onClick={() => setShowApiKeyModal(false)}
            style={{
              background: '#f97316',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '3px 8px',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      )}
    </header>
  );
}

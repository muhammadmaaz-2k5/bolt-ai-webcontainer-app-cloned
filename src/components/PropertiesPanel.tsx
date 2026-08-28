import React, { useState } from 'react';
import {
  FileCode,
  Info,
  Clock,
  Sparkles,
  Play,
  Copy,
  Check,
  Braces,
} from 'lucide-react';
import type { ProjectFile } from '../services/fileService';

interface PropertiesPanelProps {
  activeFile: ProjectFile;
  onOpenPreview: () => void;
  onOpenAI: () => void;
  historyItems: Array<{ label: string; time: string }>;
}

export default function PropertiesPanel({
  activeFile,
  onOpenPreview,
  onOpenAI,
  historyItems,
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'history' | 'outline'>('properties');
  const [copied, setCopied] = useState(false);

  const copyPath = () => {
    navigator.clipboard?.writeText(activeFile.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const metadataItems = [
    { label: 'Type', value: activeFile.type, color: '#38bdf8' },
    { label: 'Language', value: activeFile.language.toUpperCase(), color: '#818cf8' },
    { label: 'Lines', value: activeFile.lines.toString(), color: '#cbd5e1' },
    { label: 'Size', value: activeFile.size, color: '#cbd5e1' },
    { label: 'Modified', value: activeFile.lastModified, color: '#94a3b8' },
    { label: 'Imports', value: activeFile.imports, color: '#cbd5e1' },
    { label: 'Exports', value: activeFile.exports, color: '#38bdf8' },
    ...(activeFile.hooks !== 'none' ? [{ label: 'Hooks', value: activeFile.hooks, color: '#f472b6' }] : []),
  ];

  // Dynamic symbol extraction from real file code
  const extractSymbols = () => {
    const symbols: Array<{ name: string; kind: string }> = [];
    const fnMatches = activeFile.code.match(/function\s+([A-Za-z0-9_]+)/g) || [];
    fnMatches.forEach(fn => symbols.push({ name: fn, kind: 'Function' }));

    const classMatches = activeFile.code.match(/class\s+([A-Za-z0-9_]+)/g) || [];
    classMatches.forEach(cls => symbols.push({ name: cls, kind: 'Class' }));

    const constMatches = activeFile.code.match(/const\s+([A-Za-z0-9_]+)\s*=/g) || [];
    constMatches.slice(0, 5).forEach(c => symbols.push({ name: c.replace('=', '').trim(), kind: 'Constant' }));

    if (symbols.length === 0) {
      symbols.push({ name: activeFile.name, kind: 'Module root' });
    }
    return symbols;
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#0d131f',
      borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
      userSelect: 'none',
      overflow: 'hidden',
    }}>
      {/* Top Segmented Tab Switcher */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(255, 255, 255, 0.01)',
      }}>
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 8,
          padding: 2,
          gap: 2,
        }}>
          {[
            { id: 'properties', label: 'Properties', icon: Info },
            { id: 'history', label: 'History', icon: Clock },
            { id: 'outline', label: 'Outline', icon: Braces },
          ].map(t => {
            const IconComponent = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  padding: '5px 8px',
                  borderRadius: 6,
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  boxShadow: isActive ? '0 1px 4px rgba(0, 0, 0, 0.4)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconComponent size={12} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {activeTab === 'properties' && (
          <>
            {/* Active File Header Card */}
            <div style={{
              background: 'linear-gradient(145deg, #131d33 0%, #172033 100%)',
              borderRadius: 10,
              padding: '12px 14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                  }}>
                    <FileCode size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
                      {activeFile.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>
                      <span>{activeFile.path}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyPath}
                  title="Copy path"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 6,
                    padding: '4px 8px',
                    color: copied ? '#4ade80' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Metadata Attributes List */}
            <div style={{
              background: '#090d16',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '8px 12px',
                fontSize: 11,
                fontWeight: 700,
                color: '#64748b',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                background: 'rgba(255, 255, 255, 0.01)',
              }}>
                Live File Attributes
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {metadataItems.map((item, idx) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 12px',
                      fontSize: 12,
                      borderBottom: idx < metadataItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.03)' : 'none',
                    }}
                  >
                    <span style={{ color: '#94a3b8' }}>{item.label}</span>
                    <span style={{
                      fontFamily: item.label === 'Lines' || item.label === 'Size' ? 'var(--font-mono)' : 'var(--font-sans)',
                      color: item.color,
                      fontWeight: 500,
                      textAlign: 'right',
                      maxWidth: '60%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Component Quick Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
              <button
                onClick={onOpenPreview}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '9px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Play size={15} />
                <span>⚡ Test Component</span>
              </button>

              <button
                onClick={onOpenAI}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#f8fafc',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 8,
                  padding: '8px 14px',
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
              >
                <Sparkles size={14} color="#818cf8" />
                <span>Ask Bolt AI Copilot</span>
              </button>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Real Workspace Activity
            </div>
            {historyItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: idx === 0 ? '#38bdf8' : '#64748b',
                  }} />
                  <span style={{ color: '#e2e8f0' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 11, color: '#64748b' }}>{item.time}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'outline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Extracted AST Symbols ({activeFile.name})
            </div>
            {extractSymbols().map((sym, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: 6,
                  fontSize: 11.5,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span style={{ color: '#38bdf8' }}>{sym.name}</span>
                <span style={{
                  fontSize: 10,
                  color: '#94a3b8',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '1px 5px',
                  borderRadius: 4,
                }}>
                  {sym.kind}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

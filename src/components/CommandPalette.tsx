import React, { useState, useEffect } from 'react';
import { Search, FileCode, Play, Terminal, Sparkles, Folder, Settings, X } from 'lucide-react';
import { fileManager } from '../services/fileService';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (filePath: string) => void;
  onOpenAI: () => void;
  onTogglePreview: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectFile,
  onOpenAI,
  onTogglePreview,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allFiles = fileManager.getAllFiles();
  const files = allFiles.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) || f.path.toLowerCase().includes(query.toLowerCase())
  );

  const actions = [
    { label: '✨ Ask Bolt AI Assistant', icon: Sparkles, run: () => { onClose(); onOpenAI(); } },
    { label: '⚡ Toggle Live Preview / Code', icon: Play, run: () => { onClose(); onTogglePreview(); } },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15vh',
        zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 580,
          background: '#0f172a',
          borderRadius: 14,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '60vh',
        }}
      >
        {/* Search input header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <Search size={18} color="#94a3b8" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search real project files or run commands..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: 15,
            }}
          />
          <span style={{ fontSize: 11, color: '#64748b', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>
            ESC
          </span>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
          {/* Actions */}
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Actions
          </div>
          {actions.map((act, i) => {
            const Icon = act.icon;
            return (
              <div
                key={i}
                onClick={act.run}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  color: '#e2e8f0',
                  fontSize: 13,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Icon size={16} color="#818cf8" />
                <span>{act.label}</span>
              </div>
            );
          })}

          {/* Files */}
          <div style={{ padding: '12px 12px 6px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Real Files ({files.length})
          </div>
          {files.map(file => (
            <div
              key={file.path}
              onClick={() => {
                onSelectFile(file.path);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 8,
                cursor: 'pointer',
                color: '#e2e8f0',
                fontSize: 13,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileCode size={16} color="#38bdf8" />
                <span style={{ fontWeight: 500 }}>{file.name}</span>
                <span style={{ color: '#64748b', fontSize: 11 }}>{file.path}</span>
              </div>
              <span style={{ fontSize: 11, color: '#64748b' }}>{file.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

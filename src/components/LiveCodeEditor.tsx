import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Save, Sparkles, FileCode, CheckCircle2 } from 'lucide-react';
import type { ProjectFile } from '../services/fileService';

interface LiveCodeEditorProps {
  file: ProjectFile;
  onChange: (newCode: string) => void;
  onAskAI?: (code: string) => void;
}

export default function LiveCodeEditor({ file, onChange, onAskAI }: LiveCodeEditorProps) {
  const [code, setCode] = useState(file.code);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync internal state when active file changes
  useEffect(() => {
    setCode(file.code);
    setIsSaved(true);
  }, [file.path, file.code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCode(val);
    setIsSaved(false);
    onChange(val);
    // Debounce save indicator
    setTimeout(() => setIsSaved(true), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key inserts 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      onChange(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
    // Ctrl+S / Cmd+S save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      setIsSaved(true);
      onChange(code);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.split('\n');

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#090d16',
      color: '#f8fafc',
      fontFamily: 'var(--font-mono, "Fira Code", monospace)',
      overflow: 'hidden',
    }}>
      {/* Editor Sub-Header Bar */}
      <div style={{
        padding: '6px 14px',
        background: '#0d1322',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        userSelect: 'none',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileCode size={14} color="#38bdf8" />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#f8fafc' }}>
            {file.path}
          </span>
          <span style={{
            fontSize: 10,
            padding: '1px 6px',
            borderRadius: 4,
            background: isSaved ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)',
            color: isSaved ? '#4ade80' : '#fb923c',
            border: isSaved ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(249, 115, 22, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}>
            {isSaved ? <CheckCircle2 size={10} /> : <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fb923c' }} />}
            <span>{isSaved ? 'Live Synced' : 'Editing...'}</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#64748b', marginRight: 4 }}>
            {lines.length} lines • {file.size}
          </span>
          <button
            onClick={handleCopy}
            title="Copy Code"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 5,
              padding: '3px 8px',
              fontSize: 11,
              color: copied ? '#4ade80' : '#cbd5e1',
              cursor: 'pointer',
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

      {/* Editor Body: Line Numbers + Editable Textarea */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        {/* Line Numbers Gutter */}
        <div style={{
          width: 46,
          padding: '14px 8px 14px 0',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          color: '#475569',
          fontSize: 12.5,
          lineHeight: '22px',
          textAlign: 'right',
          userSelect: 'none',
          overflow: 'hidden',
          fontFamily: 'inherit',
          flexShrink: 0,
        }}>
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Live Editable Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="off"
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            background: 'transparent',
            color: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: 13,
            lineHeight: '22px',
            padding: '14px 16px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            whiteSpace: 'pre',
            wordWrap: 'normal',
            overflowX: 'auto',
            overflowY: 'auto',
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}

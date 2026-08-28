import React from 'react';
import { GitBranch, CheckCheck, Bell, Radio, Zap } from 'lucide-react';

export default function StatusBar({
  activeFile,
  linesCount,
  language,
}: {
  activeFile: string;
  linesCount: number;
  language: string;
}) {
  return (
    <footer className="ide-status-bar">
      {/* Left side info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#38bdf8', fontWeight: 600 }}>
          <GitBranch size={12} />
          <span>main</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#4ade80' }}>
          <Radio size={11} className="bolt-pulse-dot" />
          <span>HMR Ready</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8' }}>
          <span>0 errors</span>
          <span>•</span>
          <span>0 warnings</span>
        </div>
      </div>

      {/* Right side info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span>Ln 21, Col 1</span>
        <span>UTF-8</span>
        <span style={{ textTransform: 'capitalize' }}>{language}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#38bdf8' }}>
          <CheckCheck size={12} />
          <span>Prettier</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#a78bfa' }}>
          <Zap size={11} />
          <span>Astryx 0.5.0</span>
        </div>
      </div>
    </footer>
  );
}

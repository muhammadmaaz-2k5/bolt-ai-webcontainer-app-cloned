import React from 'react';
import { Sparkles, Zap, CheckCircle, Database, Server, Code2, Loader2, ArrowRight } from 'lucide-react';

interface AIBuildStreamBannerProps {
  isGenerating: boolean;
  currentStep: string;
  stepProgress: number; // 0 - 100
  modelName: string;
  latencyMs: number;
  tokensPerSecond: number;
  prompt: string;
  onSelectGeneratedFile?: (filePath: string) => void;
}

export default function AIBuildStreamBanner({
  isGenerating,
  currentStep,
  stepProgress,
  modelName,
  latencyMs,
  tokensPerSecond,
  prompt,
  onSelectGeneratedFile,
}: AIBuildStreamBannerProps) {
  if (!isGenerating && !prompt) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
      borderBottom: '1px solid rgba(249, 115, 22, 0.3)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      fontSize: 12,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    }}>
      {/* Left: Step progress and active prompt */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 260 }}>
        <div style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: isGenerating ? 'rgba(249, 115, 22, 0.2)' : 'rgba(34, 197, 94, 0.2)',
          border: isGenerating ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid rgba(34, 197, 94, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isGenerating ? '#fb923c' : '#4ade80',
        }}>
          {isGenerating ? <Loader2 size={13} className="bolt-pulse-dot" /> : <CheckCircle size={13} />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, color: isGenerating ? '#fb923c' : '#f8fafc' }}>
              {isGenerating ? currentStep : '⚡ Build Complete & Hot-Reloaded'}
            </span>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>
              ({isGenerating ? `${stepProgress}%` : `Done in ${latencyMs}ms`})
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Prompt: <span style={{ color: '#cbd5e1' }}>"{prompt}"</span>
          </div>
        </div>
      </div>

      {/* Middle: Real-Time Build Pipeline Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 10.5,
          padding: '2px 7px',
          borderRadius: 6,
          background: 'rgba(56, 189, 248, 0.12)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.25)',
        }}>
          <Code2 size={11} />
          <span>React JSX</span>
        </span>

        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 10.5,
          padding: '2px 7px',
          borderRadius: 6,
          background: 'rgba(244, 114, 182, 0.12)',
          color: '#f472b6',
          border: '1px solid rgba(244, 114, 182, 0.25)',
        }}>
          <Server size={11} />
          <span>NestJS TypeORM</span>
        </span>

        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 10.5,
          padding: '2px 7px',
          borderRadius: 6,
          background: 'rgba(34, 197, 94, 0.12)',
          color: '#4ade80',
          border: '1px solid rgba(34, 197, 94, 0.25)',
        }}>
          <Database size={11} />
          <span>3NF Schema</span>
        </span>
      </div>

      {/* Right: Groq LPU Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: '#94a3b8' }}>
        <span>Engine: <strong style={{ color: '#38bdf8' }}>{modelName.replace('openai/', '')}</strong></span>
        <span>Speed: <strong style={{ color: '#a855f7' }}>{tokensPerSecond} tok/s</strong></span>
      </div>
    </div>
  );
}

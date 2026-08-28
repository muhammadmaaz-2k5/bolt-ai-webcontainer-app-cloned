import { useState, useCallback } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Text, Heading } from '@astryxdesign/core/Text';
import { Sparkles, RotateCcw, Plus, Minus, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

export default function InteractiveCounterPreview() {
  const [count, setCount] = useState(12);
  const [history, setHistory] = useState<Array<{ val: number; time: string; action: string }>>([
    { val: 12, time: '12:40:02', action: 'Initial state' },
  ]);
  const [activeTheme, setActiveTheme] = useState<'gradient' | 'minimal' | 'cyber'>('gradient');

  const addHistory = (newVal: number, action: string) => {
    const time = new Date().toLocaleTimeString();
    setHistory(prev => [{ val: newVal, time, action }, ...prev.slice(0, 7)]);
  };

  const increment = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      addHistory(next, 'Increment (+1)');
      return next;
    });
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => {
      const next = Math.max(0, prev - 1);
      addHistory(next, 'Decrement (-1)');
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    addHistory(0, 'Reset');
  }, []);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#090e17',
      color: '#f8fafc',
      overflow: 'auto',
      padding: '24px',
      gap: '24px',
    }}>
      {/* Top preview toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        background: '#131c2e',
        borderRadius: 12,
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 10px #22c55e',
          }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>
            Live Component Sandbox • <span style={{ color: '#38bdf8' }}>Counter.tsx</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Theme:</span>
          {(['gradient', 'minimal', 'cyber'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              style={{
                background: activeTheme === t ? '#6366f1' : 'rgba(255,255,255,0.06)',
                border: 'none',
                color: activeTheme === t ? '#fff' : '#94a3b8',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Sandbox Card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Component Render Card */}
        <div style={{
          background: activeTheme === 'gradient'
            ? 'linear-gradient(145deg, #131d33 0%, #1e1b4b 100%)'
            : activeTheme === 'cyber'
            ? 'linear-gradient(145deg, #091a1e 0%, #032b26 100%)'
            : '#111827',
          borderRadius: 16,
          padding: 32,
          border: activeTheme === 'cyber' ? '1px solid rgba(45, 212, 191, 0.3)' : '1px solid rgba(99, 102, 241, 0.25)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background subtle glow */}
          <div style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: activeTheme === 'cyber' ? 'rgba(45, 212, 191, 0.15)' : 'rgba(99, 102, 241, 0.2)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }} />

          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: activeTheme === 'cyber' ? '#2dd4bf' : '#818cf8',
              marginBottom: 8,
            }}>
              <Sparkles size={14} /> React State Container
            </span>
            <div style={{
              fontSize: 72,
              fontWeight: 800,
              fontVariantNumeric: 'tabular-nums',
              color: activeTheme === 'cyber' ? '#2dd4bf' : '#38bdf8',
              lineHeight: 1,
              margin: '12px 0',
              textShadow: activeTheme === 'cyber'
                ? '0 0 30px rgba(45, 212, 191, 0.5)'
                : '0 0 30px rgba(56, 189, 248, 0.4)',
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              {count}
            </div>
            <p style={{ color: '#94a3b8', fontSize: 13 }}>
              Current value is {count % 2 === 0 ? 'even' : 'odd'} • {count >= 50 ? '🔥 High velocity' : 'Standard range'}
            </p>
          </div>

          {/* Interactive controls */}
          <div style={{ display: 'flex', gap: 12, zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={increment}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Plus size={16} /> Increment (+1)
            </button>

            <button
              onClick={decrement}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '10px 18px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            >
              <Minus size={16} /> Decrement (-1)
            </button>

            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* State Dispatch History & Diagnostics */}
        <div style={{
          background: '#0f172a',
          borderRadius: 16,
          padding: 20,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>
              ⚡ State Dispatch Log
            </span>
            <span style={{ fontSize: 11, color: '#64748b' }}>React Hook Inspector</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: i === 0 ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: i === 0 ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: i === 0 ? '#38bdf8' : '#64748b',
                  }} />
                  <span style={{ color: i === 0 ? '#f8fafc' : '#94a3b8', fontWeight: i === 0 ? 600 : 400 }}>
                    {h.action}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700 }}>
                    val: {h.val}
                  </span>
                  <span style={{ color: '#64748b', fontSize: 10 }}>{h.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '10px 14px',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
            color: '#4ade80',
          }}>
            <CheckCircle size={16} />
            <span>Fast Refresh active • HMR latency 14ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

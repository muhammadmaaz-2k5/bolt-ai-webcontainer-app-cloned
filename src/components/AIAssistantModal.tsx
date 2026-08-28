import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Check, Copy, Zap, Code, ShieldCheck, X } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  codeSnippet?: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'Hello! I am your Bolt AI Architect. I can help you build features, write components with Astryx Design System, refactor code, or generate tests. What would you like to build?',
    time: '12:44 PM',
  },
];

export default function AIAssistantModal({
  isOpen,
  onClose,
  activeFile,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeFile: string;
}) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let codeSnippet: string | undefined;

      if (query.toLowerCase().includes('counter') || query.toLowerCase().includes('refactor') || query.toLowerCase().includes('optimize')) {
        aiReply = `I optimized ${activeFile} using \`useReducer\` to provide clean action dispatching and memoized actions:`;
        codeSnippet = `// Optimized Counter with useReducer
type Action = { type: 'inc' } | { type: 'dec' } | { type: 'reset' };

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'inc': return state + 1;
    case 'dec': return Math.max(0, state - 1);
    case 'reset': return 0;
  }
}`;
      } else if (query.toLowerCase().includes('test')) {
        aiReply = `Here is a complete Vitest unit test suite for ${activeFile}:`;
        codeSnippet = `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from './Counter';

describe('Counter Component', () => {
  it('renders initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments count on button click', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText(/Increment/i));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});`;
      } else {
        aiReply = `I analyzed your project context around **${activeFile}**. Astryx tokens and components are integrated. Here is an enhancement you can apply:`;
        codeSnippet = `import { Stack } from '@astryxdesign/core/Layout';
import { Button } from '@astryxdesign/core/Button';

export function ActionGroup() {
  return (
    <Stack direction="horizontal" gap={2}>
      <Button label="Execute" variant="primary" />
      <Button label="Cancel" variant="secondary" />
    </Stack>
  );
}`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReply,
          codeSnippet,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 16,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 680,
        height: 600,
        background: '#0f172a',
        borderRadius: 16,
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          background: '#131d33',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Bot size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 6 }}>
                Bolt AI Assistant
                <span style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', borderRadius: 9999 }}>
                  Claude 3.7 & Gemini
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>
                Context: <span style={{ color: '#38bdf8' }}>{activeFile}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              color: '#94a3b8',
              padding: 6,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick prompt chips */}
        <div style={{
          padding: '10px 20px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          overflowX: 'auto',
        }}>
          {[
            { label: '⚡ Optimize with useReducer', query: `Refactor ${activeFile} using useReducer` },
            { label: '🧪 Generate Vitest Suite', query: `Generate unit tests for ${activeFile}` },
            { label: '🎨 Enhance Astryx styling', query: `Enhance Astryx UI tokens for ${activeFile}` },
          ].map(chip => (
            <button
              key={chip.label}
              onClick={() => handleSend(chip.query)}
              style={{
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                color: '#cbd5e1',
                padding: '4px 10px',
                borderRadius: 9999,
                fontSize: 11,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Messages list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map(m => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: 12,
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%',
              }}
            >
              {m.sender === 'ai' && (
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  <Sparkles size={14} />
                </div>
              )}

              <div style={{
                background: m.sender === 'user' ? '#4f46e5' : '#1e293b',
                padding: '10px 14px',
                borderRadius: 12,
                color: '#f8fafc',
                fontSize: 13,
                lineHeight: 1.5,
              }}>
                <div>{m.text}</div>
                {m.codeSnippet && (
                  <pre style={{
                    marginTop: 10,
                    padding: 12,
                    background: '#090d16',
                    borderRadius: 8,
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: '#38bdf8',
                    overflowX: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    <code>{m.codeSnippet}</code>
                  </pre>
                )}
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, textAlign: 'right' }}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#94a3b8', fontSize: 12 }}>
              <Sparkles size={14} className="bolt-pulse-dot" />
              <span>Bolt AI is generating code...</span>
            </div>
          )}
        </div>

        {/* Prompt Input Box */}
        <div style={{
          padding: '14px 20px',
          background: '#131d33',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: 10,
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Ask Bolt AI to modify ${activeFile} or create new component...`}
            style={{
              flex: 1,
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#f8fafc',
              fontSize: 13,
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSend()}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
              color: '#fff',
              border: 'none',
              padding: '0 16px',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

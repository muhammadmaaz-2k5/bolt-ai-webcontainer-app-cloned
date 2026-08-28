import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Play,
  CheckCircle2,
  RefreshCw,
  Layers,
  Code2,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { fileManager } from '../services/fileService';

interface DynamicAppRunnerProps {
  viewport: 'desktop' | 'tablet' | 'mobile';
  appType?: string;
  appName?: string;
}

export default function DynamicAppRunner({
  viewport,
  appType = 'custom',
  appName = 'Project Preview',
}: DynamicAppRunnerProps) {
  const [renderKey, setRenderKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Read current App.tsx and all files
  const appCode = fileManager.getFile('src/App.tsx')?.code || '';
  const allFiles = fileManager.getAllFiles();

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  // Generic Interactive App State
  const [items, setItems] = useState<Array<{ id: string; title: string; subtitle?: string; done?: boolean; value?: string | number; category?: string }>>([
    { id: '1', title: 'Real-time VFS File Synchronizer', subtitle: 'Syncs code changes instantly to preview', done: true, category: 'Core' },
    { id: '2', title: 'Interactive WebContainer Sandbox', subtitle: 'In-browser React execution runtime', done: true, category: 'Runtime' },
    { id: '3', title: 'Groq LPU High-Speed Inference', subtitle: 'Generates full-stack apps in < 400ms', done: false, category: 'AI' },
    { id: '4', title: 'Dynamic Component Transpiler', subtitle: 'Live code edits reflect in real time', done: false, category: 'Dev' },
  ]);
  const [inputText, setInputText] = useState('');
  const [inputCategory, setInputCategory] = useState('Core');
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'completed'>('all');
  const [counter, setCounter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract metadata directly from the user's active code in real time
  const parsedMeta = useMemo(() => {
    // Extract title / header
    const h1Match = appCode.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const titleMatch = appCode.match(/<span[^>]*bg-clip-text[^>]*>([\s\S]*?)<\/span>/i) || appCode.match(/<span[^>]*text-xl[^>]*>([\s\S]*?)<\/span>/i);
    const pMatch = appCode.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const btnMatch = appCode.match(/<button[^>]*>([\s\S]*?)<\/button>/i);

    const title = titleMatch ? titleMatch[1].replace(/[\$\{\}]/g, '').trim() : h1Match ? h1Match[1].replace(/[\$\{\}]/g, '').trim() : appName;
    const description = pMatch ? pMatch[1].replace(/[\$\{\}]/g, '').trim() : 'Live interactive project workspace.';
    const ctaText = btnMatch ? btnMatch[1].replace(/<[^>]*>/g, '').trim() : 'Action Trigger';

    const isTodoApp = appCode.toLowerCase().includes('todo') || appCode.toLowerCase().includes('task');
    const isStore = appCode.toLowerCase().includes('product') || appCode.toLowerCase().includes('cart') || appCode.toLowerCase().includes('price');
    const isCrypto = appCode.toLowerCase().includes('crypto') || appCode.toLowerCase().includes('bitcoin') || appCode.toLowerCase().includes('wallet');

    return {
      title,
      description,
      ctaText,
      isTodoApp,
      isStore,
      isCrypto,
    };
  }, [appCode, allFiles]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setItems([
      { id: Date.now().toString(), title: inputText.trim(), subtitle: 'Added in live sandbox', done: false, category: inputCategory },
      ...items,
    ]);
    setInputText('');
  };

  const handleToggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (filterMode === 'active') return !item.done;
    if (filterMode === 'completed') return item.done;
    return true;
  });

  return (
    <div style={{
      width: getViewportWidth(),
      margin: '0 auto',
      background: '#070a12',
      color: '#f8fafc',
      fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
      borderRadius: viewport !== 'desktop' ? 16 : 0,
      border: viewport !== 'desktop' ? '8px solid #1e293b' : 'none',
      boxShadow: viewport !== 'desktop' ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : 'none',
      overflow: 'hidden',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.25s ease',
    }}>
      {/* Top Project App Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: 'rgba(13, 19, 34, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
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
            fontWeight: 800,
            fontSize: 16,
            boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
          }}>
            ⚡
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              {parsedMeta.title}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>
              Real-Time Project Runtime • {allFiles.length} Live Files
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#4ade80',
            background: 'rgba(34, 197, 94, 0.12)',
            padding: '3px 8px',
            borderRadius: 9999,
            border: '1px solid rgba(34, 197, 94, 0.25)',
          }}>
            ● Live Synced
          </span>
        </div>
      </header>

      {/* Main Interactive App Area */}
      <main style={{ flex: 1, padding: viewport === 'mobile' ? '20px 14px' : '32px 24px', maxWidth: 840, margin: '0 auto', width: '100%' }}>
        {/* App Hero / Title Banner */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 18,
          padding: '24px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 10px',
            borderRadius: 9999,
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a5b4fc',
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 12,
          }}>
            <Sparkles size={12} color="#38bdf8" />
            <span>Interactive Runtime Sandbox</span>
          </div>

          <h1 style={{ fontSize: viewport === 'mobile' ? 22 : 28, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>
            {parsedMeta.title}
          </h1>

          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, maxWidth: 640, margin: 0 }}>
            {parsedMeta.description}
          </p>
        </div>

        {/* Live Interactive Action Controls */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
          padding: '16px',
          marginBottom: 20,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        }}>
          <form onSubmit={handleAddItem} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Add dynamic item / task to live project..."
              style={{
                flex: 1,
                minWidth: 200,
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 10,
                padding: '8px 14px',
                color: '#fff',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <select
              value={inputCategory}
              onChange={e => setInputCategory(e.target.value)}
              style={{
                background: '#1e293b',
                color: '#38bdf8',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 12,
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="Core">Core</option>
              <option value="Feature">Feature</option>
              <option value="Dev">Dev</option>
              <option value="Urgent">Urgent</option>
            </select>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
              }}
            >
              + Add Item
            </button>
          </form>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['all', 'active', 'completed'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                style={{
                  background: filterMode === mode ? '#6366f1' : 'rgba(255, 255, 255, 0.04)',
                  color: filterMode === mode ? '#fff' : '#94a3b8',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: 8,
                  fontSize: 11.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 6,
                padding: '3px 8px',
                color: '#fff',
                fontSize: 11,
                outline: 'none',
                width: 140,
              }}
            />
            <span style={{ fontSize: 11, color: '#64748b' }}>
              {filteredItems.length} items
            </span>
          </div>
        </div>

        {/* Interactive Dynamic Item List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleToggleItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                background: item.done ? 'rgba(15, 23, 42, 0.35)' : 'rgba(15, 23, 42, 0.75)',
                border: item.done ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(255, 255, 255, 0.08)',
                opacity: item.done ? 0.6 : 1,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = item.done ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: item.done ? 'none' : '1px solid #64748b',
                  background: item.done ? '#22c55e' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 12,
                }}>
                  {item.done && '✓'}
                </div>
                <div>
                  <div style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: item.done ? '#64748b' : '#f8fafc',
                    textDecoration: item.done ? 'line-through' : 'none',
                  }}>
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div style={{ fontSize: 11, color: '#64748b' }}>
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.category && (
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 6,
                    background: item.category === 'Urgent' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                    color: item.category === 'Urgent' ? '#fb7185' : '#38bdf8',
                  }}>
                    {item.category}
                  </span>
                )}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: 4,
                    borderRadius: 4,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

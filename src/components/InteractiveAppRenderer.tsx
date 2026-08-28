import React, { useState, useEffect } from 'react';
import {
  ListTodo,
  Plus,
  Check,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Star,
  Wallet,
  TrendingUp,
  FileText,
  Zap,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { fileManager } from '../services/fileService';

interface InteractiveAppRendererProps {
  appType?: string;
  viewport: 'desktop' | 'tablet' | 'mobile';
  appName?: string;
}

export default function InteractiveAppRenderer({
  appType = 'todo',
  viewport,
  appName = 'TaskFlow Pro',
}: InteractiveAppRendererProps) {
  // 1. TODO APP INTERACTIVE STATE
  const [todos, setTodos] = useState([
    { id: '1', text: 'Build real-time React IDE with Groq LPU', completed: true, category: 'work' },
    { id: '2', text: 'Implement editable code sandbox with live reload', completed: true, category: 'work' },
    { id: '3', text: 'Design dark glassmorphism UI theme', completed: false, category: 'urgent' },
    { id: '4', text: 'Test interactive Todo App in preview sandbox', completed: false, category: 'personal' },
  ]);
  const [todoInput, setTodoInput] = useState('');
  const [todoCategory, setTodoCategory] = useState<'work' | 'personal' | 'urgent'>('work');
  const [todoFilter, setTodoFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    setTodos([
      { id: Date.now().toString(), text: todoInput.trim(), completed: false, category: todoCategory },
      ...todos,
    ]);
    setTodoInput('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // 2. E-COMMERCE INTERACTIVE STATE
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [products] = useState([
    { id: '1', name: 'AeroPulse Pro Headphones', price: 199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', category: 'Audio' },
    { id: '2', name: 'Titan Chrono Smartwatch', price: 299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', category: 'Wearables' },
    { id: '3', name: 'Lumix Mechanical Keyboard', price: 149, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', category: 'Accessories' },
  ]);

  // 3. CRYPTO DASHBOARD INTERACTIVE STATE
  const [cryptoBalance] = useState(48250.80);
  const [coins] = useState([
    { name: 'Bitcoin', sym: 'BTC', price: 92450.00, change: '+4.8%', icon: '₿' },
    { name: 'Ethereum', sym: 'ETH', price: 3420.50, change: '+6.2%', icon: 'Ξ' },
    { name: 'Solana', sym: 'SOL', price: 185.20, change: '-1.4%', icon: '◎' },
  ]);

  // 4. CALCULATOR INTERACTIVE STATE
  const [calcDisplay, setCalcDisplay] = useState('0');

  const handleCalcBtn = (val: string) => {
    if (val === 'C') setCalcDisplay('0');
    else if (val === '=') {
      try {
        setCalcDisplay(String(eval(calcDisplay)));
      } catch {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay(prev => (prev === '0' ? val : prev + val));
    }
  };

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

  // Determine effective app type from active files if not set
  let effectiveType = appType;
  const appCode = fileManager.getFile('src/App.tsx')?.code || '';
  if (appCode.includes('Todo') || appCode.includes('todo') || appCode.includes('TaskFlow')) {
    effectiveType = 'todo';
  } else if (appCode.includes('ShoppingBag') || appCode.includes('Product') || appCode.includes('Cart')) {
    effectiveType = 'ecommerce';
  } else if (appCode.includes('Bitcoin') || appCode.includes('Crypto') || appCode.includes('Wallet')) {
    effectiveType = 'dashboard';
  } else if (appCode.includes('calc') || appCode.includes('Calculator')) {
    effectiveType = 'calculator';
  }

  return (
    <div style={{
      width: getViewportWidth(),
      margin: '0 auto',
      background: '#070a12',
      color: '#f8fafc',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      borderRadius: viewport !== 'desktop' ? 16 : 0,
      border: viewport !== 'desktop' ? '8px solid #1e293b' : 'none',
      boxShadow: viewport !== 'desktop' ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : 'none',
      overflow: 'hidden',
      minHeight: '100%',
      transition: 'all 0.3s ease',
    }}>
      {/* 1. RENDER TODO APP */}
      {effectiveType === 'todo' && (
        <div style={{ padding: viewport === 'mobile' ? '20px 14px' : '40px 24px', maxWidth: 640, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              }}>
                <ListTodo size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>TaskFlow Pro</h1>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Interactive Todo & Task Manager</p>
              </div>
            </div>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#4ade80',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              padding: '4px 10px',
              borderRadius: 9999,
            }}>
              {todos.filter(t => t.completed).length} of {todos.length} Done
            </span>
          </div>

          {/* Add Todo Form */}
          <form
            onSubmit={handleAddTodo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 14,
              padding: '6px 8px 6px 14px',
              marginBottom: 20,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <input
              type="text"
              value={todoInput}
              onChange={e => setTodoInput(e.target.value)}
              placeholder="Add a new task..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 13,
              }}
            />
            <select
              value={todoCategory}
              onChange={e => setTodoCategory(e.target.value as any)}
              style={{
                background: '#1e293b',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 8,
                fontSize: 11,
                padding: '4px 8px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="work">💼 Work</option>
              <option value="personal">👤 Personal</option>
              <option value="urgent">🔥 Urgent</option>
            </select>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </form>

          {/* Filters Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['all', 'active', 'completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setTodoFilter(f)}
                  style={{
                    background: todoFilter === f ? '#6366f1' : 'rgba(255, 255, 255, 0.04)',
                    color: todoFilter === f ? '#fff' : '#94a3b8',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 11, color: '#64748b' }}>
              {todos.filter(t => (todoFilter === 'active' ? !t.completed : todoFilter === 'completed' ? t.completed : true)).length} items
            </span>
          </div>

          {/* Todos List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todos
              .filter(t => (todoFilter === 'active' ? !t.completed : todoFilter === 'completed' ? t.completed : true))
              .map(todo => (
                <div
                  key={todo.id}
                  onClick={() => handleToggleTodo(todo.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: todo.completed ? 'rgba(15, 23, 42, 0.3)' : 'rgba(15, 23, 42, 0.8)',
                    border: todo.completed ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(255, 255, 255, 0.08)',
                    opacity: todo.completed ? 0.65 : 1,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      border: todo.completed ? 'none' : '1px solid #475569',
                      background: todo.completed ? '#22c55e' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}>
                      {todo.completed && <Check size={13} />}
                    </div>
                    <span style={{
                      fontSize: 13,
                      color: todo.completed ? '#64748b' : '#f8fafc',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}>
                      {todo.text}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: todo.category === 'urgent' ? 'rgba(244, 63, 94, 0.15)' : todo.category === 'work' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                      color: todo.category === 'urgent' ? '#fb7185' : todo.category === 'work' ? '#38bdf8' : '#fbbf24',
                    }}>
                      {todo.category}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteTodo(todo.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: 4,
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 2. RENDER E-COMMERCE APP */}
      {effectiveType === 'ecommerce' && (
        <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>⚡ PulseStore</h1>
            <div style={{
              background: '#6366f1',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <ShoppingBag size={14} />
              <span>Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: viewport === 'desktop' ? 'repeat(3, 1fr)' : '1fr', gap: 18 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 16 }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{p.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>${p.price}</span>
                  <button
                    onClick={() => setCart(prev => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }))}
                    style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. RENDER CRYPTO DASHBOARD */}
      {effectiveType === 'dashboard' && (
        <div style={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>⚡ NovaCrypto</h1>
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
              Balance: ${cryptoBalance.toLocaleString()}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {coins.map(c => (
              <div key={c.sym} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16 }}>
                <span style={{ fontSize: 24 }}>{c.icon}</span>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 8 }}>{c.name}</h3>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '4px 0' }}>${c.price.toLocaleString()}</div>
                <span style={{ fontSize: 11, color: c.change.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: 700 }}>{c.change}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. RENDER CALCULATOR */}
      {effectiveType === 'calculator' && (
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: 20, borderRadius: 20, width: 280 }}>
            <div style={{ background: '#070a12', padding: '14px', borderRadius: 12, textAlign: 'right', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              {calcDisplay}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {['C', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '=', '1', '2', '3', '0'].map(b => (
                <button
                  key={b}
                  onClick={() => handleCalcBtn(b)}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: 'none',
                    background: b === '=' ? '#6366f1' : '#1e293b',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

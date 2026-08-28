import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Star,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share2,
  ListTodo,
  Plus,
  Trash2,
  Film,
  Play,
  Heart,
  Clock,
  ShoppingBag,
  Check,
  Zap,
  Activity,
  Wallet,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { fileManager } from '../services/fileService';

interface SandboxedAppPreviewProps {
  viewport: 'desktop' | 'tablet' | 'mobile';
}

export default function SandboxedAppPreview({ viewport }: SandboxedAppPreviewProps) {
  const appFile = fileManager.getFile('src/App.tsx')?.code || '';
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

  // State for interactive Todo App
  const [todos, setTodos] = useState([
    { id: '1', text: 'Initialize WebContainer workspace architecture', done: true },
    { id: '2', text: 'Connect real-time AI Agent with incremental file edits', done: true },
    { id: '3', text: 'Launch live development preview', done: false },
  ]);
  const [todoInput, setTodoInput] = useState('');

  // State for interactive Blog App
  const [likes, setLikes] = useState(142);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([
    { id: '1', user: 'Dr. Sarah Jenkins', text: 'Real-time WebContainer inference delivers unmatched round-trip latency for full-stack prototyping.', time: '1h ago' },
    { id: '2', user: 'Marcus Vance', text: 'The AST parser and virtual file sync make this architecture extremely modular.', time: '3h ago' },
  ]);
  const [commentInput, setCommentInput] = useState('');

  // State for interactive Movie App
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
  const [movieFavorites, setMovieFavorites] = useState<string[]>(['1', '2']);

  // State for interactive Store
  const [cartCount, setCartCount] = useState(0);

  // State for interactive Calculator
  const [calcVal, setCalcVal] = useState('0');

  // Detect and parse the user's active code
  const parsedApp = useMemo(() => {
    const isTodo = appFile.toLowerCase().includes('todo') || appFile.toLowerCase().includes('taskflow');
    const isBlog = appFile.toLowerCase().includes('blog') || appFile.toLowerCase().includes('article') || appFile.toLowerCase().includes('comment') || appFile.toLowerCase().includes('techchronicle');
    const isMovie = appFile.toLowerCase().includes('movie') || appFile.toLowerCase().includes('cineverse') || appFile.toLowerCase().includes('film');
    const isStore = appFile.toLowerCase().includes('shoppingbag') || appFile.toLowerCase().includes('pulsestore') || appFile.toLowerCase().includes('product');
    const isCalc = appFile.toLowerCase().includes('calc') || appFile.toLowerCase().includes('calculator');
    const isCrypto = appFile.toLowerCase().includes('bitcoin') || appFile.toLowerCase().includes('crypto') || appFile.toLowerCase().includes('novacrypto');

    // Extract dynamic title, subheadline, badge, button text from actual user code
    const h1Match = appFile.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const pMatch = appFile.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const btnMatch = appFile.match(/<button[^>]*>([\s\S]*?)<\/button>/i);
    const badgeMatch = appFile.match(/<div[^>]*rounded-full[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/i);

    const headline = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : 'Bolt.ai Workspace';
    const subheadline = pMatch ? pMatch[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : 'Type any prompt in the top builder bar to build full-stack apps in real time.';
    const buttonText = btnMatch ? btnMatch[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : 'Get Started';
    const badge = badgeMatch ? badgeMatch[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : '⚡ WebContainer Active';

    return {
      isTodo,
      isBlog,
      isMovie,
      isStore,
      isCalc,
      isCrypto,
      headline,
      subheadline,
      buttonText,
      badge,
    };
  }, [appFile, allFiles]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    setTodos([{ id: Date.now().toString(), text: todoInput.trim(), done: false }, ...todos]);
    setTodoInput('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([{ id: Date.now().toString(), user: 'You', text: commentInput.trim(), time: 'Just now' }, ...comments]);
    setCommentInput('');
  };

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
      height: '100%',
      maxHeight: '100%',
      minHeight: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollBehavior: 'smooth',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.25s ease',
    }}>
      {/* 1. TODO APPLICATION */}
      {parsedApp.isTodo && (
        <div style={{ padding: viewport === 'mobile' ? '20px 14px' : '40px 24px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
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
                <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>{parsedApp.headline}</h1>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{parsedApp.subheadline}</p>
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
              {todos.filter(t => t.done).length} of {todos.length} Done
            </span>
          </div>

          <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input
              type="text"
              value={todoInput}
              onChange={e => setTodoInput(e.target.value)}
              placeholder="Add a new task..."
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                padding: '10px 14px',
                color: '#fff',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '10px 18px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
              }}
            >
              + Add
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todos.map(t => (
              <div
                key={t.id}
                onClick={() => setTodos(todos.map(x => (x.id === t.id ? { ...x, done: !x.done } : x)))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: t.done ? 'rgba(15, 23, 42, 0.35)' : 'rgba(15, 23, 42, 0.75)',
                  border: t.done ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(255, 255, 255, 0.08)',
                  opacity: t.done ? 0.6 : 1,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    border: t.done ? 'none' : '1px solid #475569',
                    background: t.done ? '#22c55e' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 12,
                  }}>
                    {t.done && '✓'}
                  </div>
                  <span style={{ fontSize: 13, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#f8fafc' }}>
                    {t.text}
                  </span>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setTodos(todos.filter(x => x.id !== t.id)); }}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. FULL BLOGS DETAILED PAGE */}
      {parsedApp.isBlog && (
        <div style={{ padding: viewport === 'mobile' ? '20px 14px' : '40px 24px', maxWidth: 740, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#818cf8', background: 'rgba(99,102,241,0.15)', padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>
              Engineering
            </span>
            <span style={{ fontSize: 11, color: '#64748b' }}>• 8 min read</span>
            <span style={{ fontSize: 11, color: '#64748b' }}>• Published Today</span>
          </div>

          <h1 style={{ fontSize: viewport === 'mobile' ? 26 : 38, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            {parsedApp.headline}
          </h1>

          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.6, marginBottom: 24 }}>
            {parsedApp.subheadline}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" alt="Author" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>Dr. Sarah Jenkins</h4>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Principal Systems Architect</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setLikes(likes + 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: '#818cf8',
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <ThumbsUp size={14} /> <span>{likes}</span>
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                style={{
                  background: isSaved ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                <Bookmark size={14} fill={isSaved ? '#fff' : 'none'} />
              </button>
            </div>
          </div>

          <div style={{ lineHeight: 1.8, fontSize: 14, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              Modern web applications demand instantaneous feedback loops. When combining WebContainers with specialized LPU inference hardware, round-trip code generation drops from dozens of seconds to sub-300 milliseconds.
            </p>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>Key Highlights</h3>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 13, color: '#94a3b8' }}>
                <li>Zero-latency Virtual File System (VFS) synchronization</li>
                <li>Real-time Abstract Syntax Tree (AST) token validation</li>
                <li>Sub-second hot module reloading via in-browser WebContainer sandboxes</li>
              </ul>
            </div>
          </div>

          {/* Comments */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageSquare size={18} color="#818cf8" /> Discussion ({comments.length})
            </h3>
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Join the discussion..."
                style={{
                  flex: 1,
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  padding: '8px 14px',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Post
              </button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {comments.map(c => (
                <div key={c.id} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 12, padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc' }}>{c.user}</span>
                    <span style={{ fontSize: 10, color: '#64748b' }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MOVIE CARDS SHOWCASE */}
      {parsedApp.isMovie && (
        <div style={{ padding: viewport === 'mobile' ? '16px' : '28px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #f43f5e, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Film size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0 }}>CineVerse 4K</h1>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Hover cards to trigger preview</p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: viewport === 'desktop' ? 'repeat(3, 1fr)' : '1fr',
            gap: 18,
          }}>
            {[
              { id: '1', title: 'Cyberpunk 2099: Neon Horizon', year: 2026, rating: 9.4, genre: 'Sci-Fi / Action', poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80', tagline: 'In a city of artificial memories, truth is the ultimate contraband.' },
              { id: '2', title: 'Interstellar Drift: Beyond Light', year: 2025, rating: 9.6, genre: 'Adventure / Space', poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', tagline: 'The deepest journey is into the unknown void.' },
              { id: '3', title: 'Shadow Samurai: Midnight Blade', year: 2026, rating: 9.1, genre: 'Martial Arts', poster: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&q=80', tagline: 'Honor is carved with steel in the dark.' },
            ].map(movie => {
              const isHovered = hoveredMovieId === movie.id;
              return (
                <div
                  key={movie.id}
                  onMouseEnter={() => setHoveredMovieId(movie.id)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                  onClick={() => setSelectedMovie(movie)}
                  style={{
                    background: '#0f172a',
                    border: isHovered ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transform: isHovered ? 'scale(1.02)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ position: 'relative', height: 180 }}>
                    <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 800, color: '#fbbf24' }}>
                      ★ {movie.rating}
                    </div>
                  </div>
                  <div style={{ padding: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#818cf8' }}>{movie.genre}</span>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '4px 0 2px' }}>{movie.title}</h3>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{movie.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. GENERAL / CUSTOM APPLICATION */}
      {!parsedApp.isTodo && !parsedApp.isBlog && !parsedApp.isMovie && (
        <div style={{ flex: 1, padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, width: '100%', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 9999,
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#a5b4fc',
              fontSize: 11.5,
              fontWeight: 600,
              marginBottom: 20,
            }}>
              <Sparkles size={13} color="#38bdf8" />
              <span>{parsedApp.badge}</span>
            </div>

            <h1 style={{
              fontSize: viewport === 'mobile' ? 28 : 42,
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: 16,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
            }}>
              {parsedApp.headline}
            </h1>

            <p style={{
              fontSize: viewport === 'mobile' ? 14 : 17,
              color: '#94a3b8',
              marginBottom: 28,
              lineHeight: 1.6,
              maxWidth: 580,
              margin: '0 auto 28px',
            }}>
              {parsedApp.subheadline}
            </p>

            <button
              onClick={() => alert(`Clicked: ${parsedApp.buttonText}`)}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>{parsedApp.buttonText}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Star,
  Check,
  ShoppingBag,
  ListTodo,
  Plus,
  Trash2,
  Activity,
  Wallet,
  Play,
  Film,
  Heart,
  Clock,
  Flame,
  Info,
} from 'lucide-react';
import { fileManager } from '../services/fileService';

interface LiveProjectPreviewProps {
  viewport: 'desktop' | 'tablet' | 'mobile';
  allFilesVersion?: number;
}

export default function LiveProjectPreview({
  viewport,
}: LiveProjectPreviewProps) {
  // Read all live project files dynamically from fileManager
  const allFiles = fileManager.getAllFiles();
  const appFile = fileManager.getFile('src/App.tsx')?.code || '';
  const heroFile = fileManager.getFile('src/components/Hero.tsx')?.code || '';
  const navbarFile = fileManager.getFile('src/components/Navbar.tsx')?.code || '';
  const featuresFile = fileManager.getFile('src/components/Features.tsx')?.code || '';
  const pricingFile = fileManager.getFile('src/components/Pricing.tsx')?.code || '';
  const footerFile = fileManager.getFile('src/components/Footer.tsx')?.code || '';

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

  // Movie state
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
  const [favMovies, setFavMovies] = useState<string[]>(['1', '2']);
  const [movieCat, setMovieCat] = useState('Trending');

  const MOVIES_LIST = [
    {
      id: '1',
      title: 'Cyberpunk 2099: Neon Horizon',
      year: 2026,
      duration: '2h 18m',
      rating: 9.4,
      genre: 'Sci-Fi / Action',
      poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80',
      backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
      tagline: 'In a city of artificial memories, truth is the ultimate contraband.',
    },
    {
      id: '2',
      title: 'Interstellar Drift: Beyond Light',
      year: 2025,
      duration: '2h 45m',
      rating: 9.6,
      genre: 'Adventure / Space',
      poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
      backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80',
      tagline: 'The deepest journey is into the unknown void.',
    },
    {
      id: '3',
      title: 'Shadow Samurai: Midnight Blade',
      year: 2026,
      duration: '1h 58m',
      rating: 9.1,
      genre: 'Martial Arts / Drama',
      poster: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&q=80',
      backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80',
      tagline: 'Honor is carved with steel in the dark.',
    },
    {
      id: '4',
      title: 'Quantum Odyssey: Multiverse Gate',
      year: 2025,
      duration: '2h 10m',
      rating: 8.9,
      genre: 'Mystery / Thriller',
      poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&q=80',
      backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80',
      tagline: 'Every choice creates a universe. Only one survives.',
    },
  ];

  // Detect component type
  const structure = useMemo(() => {
    const isMovie = appFile.toLowerCase().includes('movie') || appFile.toLowerCase().includes('cineverse') || appFile.toLowerCase().includes('film');
    const isTodo = (appFile.toLowerCase().includes('todo') || appFile.toLowerCase().includes('taskflow')) && !isMovie;
    const isEcommerce = (appFile.toLowerCase().includes('shoppingbag') || appFile.toLowerCase().includes('pulsestore')) && !isMovie;
    const isCrypto = appFile.toLowerCase().includes('novacrypto') || appFile.toLowerCase().includes('bitcoin');
    const isCalc = appFile.toLowerCase().includes('calculator') || appFile.toLowerCase().includes('calc');

    const hasNavbar = appFile.includes('<Navbar') || !!navbarFile;
    const hasFeatures = appFile.includes('<Features') && !!featuresFile;
    const hasPricing = appFile.includes('<Pricing') && !!pricingFile;
    const isSimpleApp = !hasNavbar && !hasFeatures && !hasPricing && !isMovie && !isTodo && !isEcommerce && !isCrypto && !isCalc;

    // Extract headline and text
    const codeToScan = heroFile || appFile;
    const h1Match = codeToScan.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const pMatch = codeToScan.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const btnMatch = codeToScan.match(/<button[^>]*>([\s\S]*?)<\/button>/i);
    const badgeMatch = codeToScan.match(/<div[^>]*rounded-full[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/i);

    const headline = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : 'Hello World';
    const subheadline = pMatch ? pMatch[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : '';
    const buttonText = btnMatch ? btnMatch[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : 'Get Started';
    const badge = badgeMatch ? badgeMatch[1].replace(/<[^>]*>/g, '').replace(/[\$\{\}]/g, '').trim() : '';

    return {
      isMovie,
      isTodo,
      isEcommerce,
      isCrypto,
      isCalc,
      isSimpleApp,
      hasNavbar,
      headline,
      subheadline,
      buttonText,
      badge,
    };
  }, [appFile, heroFile, navbarFile, featuresFile, pricingFile, footerFile, allFiles]);

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
      {/* 1. MOVIE CARDS SHOWCASE (With 3D Hover & Animated Preview Modal) */}
      {structure.isMovie && (
        <div style={{ padding: viewport === 'mobile' ? '16px' : '28px', maxWidth: 1100, margin: '0 auto' }}>
          {/* Movie Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #f43f5e, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)',
              }}>
                <Film size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  CineVerse <span style={{ fontSize: 10, background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '2px 8px', borderRadius: 9999 }}>4K HDR</span>
                </h1>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Hover cards to trigger animated preview</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6, background: '#0d1322', padding: 4, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              {['Trending', 'Sci-Fi', 'Action', 'Featured'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setMovieCat(cat)}
                  style={{
                    background: movieCat === cat ? 'linear-gradient(135deg, #f43f5e, #6366f1)' : 'transparent',
                    color: movieCat === cat ? '#fff' : '#94a3b8',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 7,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Movie Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewport === 'desktop' ? 'repeat(4, 1fr)' : viewport === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
            gap: 18,
          }}>
            {MOVIES_LIST.map(movie => {
              const isHovered = hoveredMovieId === movie.id;
              const isFav = favMovies.includes(movie.id);

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
                    transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'none',
                    boxShadow: isHovered ? '0 20px 30px rgba(99, 102, 241, 0.3)' : 'none',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Poster Box */}
                  <div style={{ position: 'relative', width: '100%', height: 220, overflow: 'hidden' }}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, transparent 60%)' }} />

                    {/* Rating Badge */}
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#fbbf24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <Star size={11} fill="#fbbf24" />
                      <span>{movie.rating}</span>
                    </div>

                    {/* Play Button on Hover */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                      transition: 'all 0.2s ease',
                    }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f43f5e, #6366f1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(244, 63, 94, 0.5)',
                      }}>
                        <Play size={20} fill="#fff" style={{ marginLeft: 2 }} />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '14px' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
                      {movie.genre}
                    </span>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '8px 0 4px', lineHeight: 1.3 }}>
                      {movie.title}
                    </h3>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {movie.tagline}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: 11 }}>
                      <span style={{ color: '#64748b' }}>{movie.year} • {movie.duration}</span>
                      <span style={{ color: '#f43f5e', fontWeight: 700 }}>Watch →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Preview */}
          {selectedMovie && (
            <div
              onClick={() => setSelectedMovie(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}
            >
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  background: '#0f172a',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 20,
                  maxWidth: 600,
                  width: '100%',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: 260 }}>
                  <img src={selectedMovie.backdrop} alt={selectedMovie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', boxShadow: '0 0 25px rgba(244, 63, 94, 0.8)' }}>
                      <Play size={26} fill="#fff" style={{ marginLeft: 3 }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#818cf8' }}>{selectedMovie.genre}</span>
                    <span style={{ color: '#fbbf24', fontSize: 12, fontWeight: 800 }}>★ {selectedMovie.rating}/10</span>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '8px 0 4px' }}>{selectedMovie.title}</h2>
                  <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>{selectedMovie.tagline}</p>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    style={{ marginTop: 16, background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. SIMPLE / CUSTOM APP RENDERER */}
      {structure.isSimpleApp && !structure.isMovie && (
        <div style={{ minHeight: '100%', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, width: '100%', margin: '0 auto' }}>
            <h1 style={{
              fontSize: viewport === 'mobile' ? 32 : 48,
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: 16,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
            }}>
              {structure.headline}
            </h1>

            {structure.subheadline && (
              <p style={{
                fontSize: viewport === 'mobile' ? 14 : 18,
                color: '#94a3b8',
                marginBottom: 28,
                lineHeight: 1.6,
              }}>
                {structure.subheadline}
              </p>
            )}

            {structure.buttonText && (
              <button
                onClick={() => alert(`Clicked: ${structure.buttonText}`)}
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
                <span>{structure.buttonText}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

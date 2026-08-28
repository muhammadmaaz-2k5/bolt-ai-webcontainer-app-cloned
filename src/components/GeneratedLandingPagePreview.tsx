import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Sparkles,
  Star,
  ChevronDown,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Heart,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { fileManager } from '../services/fileService';
import type { GeneratedLandingPageData } from '../services/groqService';

interface GeneratedLandingPagePreviewProps {
  data: GeneratedLandingPageData;
  viewport: 'desktop' | 'tablet' | 'mobile';
}

export default function GeneratedLandingPagePreview({
  data,
  viewport,
}: GeneratedLandingPagePreviewProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  // Dynamically extract live content from the actual project files in fileManager
  const liveProject = useMemo(() => {
    const navbarFile = fileManager.getFile('src/components/Navbar.tsx')?.code || '';
    const heroFile = fileManager.getFile('src/components/Hero.tsx')?.code || '';
    const featuresFile = fileManager.getFile('src/components/Features.tsx')?.code || '';
    const pricingFile = fileManager.getFile('src/components/Pricing.tsx')?.code || '';
    const testimonialsFile = fileManager.getFile('src/components/Testimonials.tsx')?.code || '';
    const faqFile = fileManager.getFile('src/components/FAQ.tsx')?.code || '';

    // Extract title
    let title = data.title;
    const titleMatch = navbarFile.match(/bg-clip-text[^>]*>\s*([\s\S]*?)\s*<\/span>/i);
    if (titleMatch && titleMatch[1].trim()) {
      title = titleMatch[1].trim().replace(/[\{\}\$]/g, '');
    }

    // Extract hero headline & subheadline
    let heroHeadline = data.heroHeadline;
    const h1Match = heroFile.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match && h1Match[1].trim()) {
      heroHeadline = h1Match[1].trim().replace(/[\{\}\$]/g, '');
    }

    let heroSubheadline = data.heroSubheadline;
    const pMatch = heroFile.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch && pMatch[1].trim()) {
      heroSubheadline = pMatch[1].trim().replace(/[\{\}\$]/g, '');
    }

    // Extract badge
    let badgeText = data.badgeText;
    const badgeMatch = heroFile.match(/<span>([\s\S]*?)<\/span>/i);
    if (badgeMatch && badgeMatch[1].trim()) {
      badgeText = badgeMatch[1].trim().replace(/[\{\}\$]/g, '');
    }

    // Extract CTA text
    let ctaPrimary = data.ctaPrimaryText;
    const ctaMatch = heroFile.match(/<span>([\s\S]*?)<\/span>[\s\S]*?<ArrowRight/i);
    if (ctaMatch && ctaMatch[1].trim()) {
      ctaPrimary = ctaMatch[1].trim().replace(/[\{\}\$]/g, '');
    }

    // Extract features JSON array if present in file
    let features = data.features;
    const featuresJsonMatch = featuresFile.match(/const features\s*=\s*(\[[\s\S]*?\]);/);
    if (featuresJsonMatch) {
      try {
        features = JSON.parse(featuresJsonMatch[1]);
      } catch (e) {}
    }

    // Extract pricing JSON array if present in file
    let pricingPlans = data.pricingPlans;
    const pricingJsonMatch = pricingFile.match(/const plans\s*=\s*(\[[\s\S]*?\]);/);
    if (pricingJsonMatch) {
      try {
        pricingPlans = JSON.parse(pricingJsonMatch[1]);
      } catch (e) {}
    }

    // Extract testimonials JSON array if present in file
    let testimonials = data.testimonials;
    const testimonialsJsonMatch = testimonialsFile.match(/const testimonials\s*=\s*(\[[\s\S]*?\]);/);
    if (testimonialsJsonMatch) {
      try {
        testimonials = JSON.parse(testimonialsJsonMatch[1]);
      } catch (e) {}
    }

    // Extract FAQs JSON array if present in file
    let faqs = data.faqs;
    const faqsJsonMatch = faqFile.match(/const faqs\s*=\s*(\[[\s\S]*?\]);/);
    if (faqsJsonMatch) {
      try {
        faqs = JSON.parse(faqsJsonMatch[1]);
      } catch (e) {}
    }

    return {
      title,
      heroHeadline,
      heroSubheadline,
      badgeText,
      ctaPrimary,
      ctaSecondary: data.ctaSecondaryText,
      features,
      pricingPlans,
      testimonials,
      faqs,
    };
  }, [data, fileManager.getAllFiles()]);

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
      position: 'relative',
      minHeight: '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
          color: '#fff',
          padding: '10px 18px',
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 13,
          boxShadow: '0 10px 25px rgba(99, 102, 241, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <Sparkles size={16} />
          <span>{showToast}</span>
        </div>
      )}

      {/* 1. Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(7, 10, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
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
            fontSize: 16,
            fontWeight: 800,
            color: '#fff',
            boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
          }}>
            ⚡
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
            {liveProject.title}
          </span>
        </div>

        {viewport === 'desktop' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: '#94a3b8' }}>
            <a href="#features" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Features</a>
            <a href="#pricing" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Pricing</a>
            <a href="#testimonials" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Reviews</a>
            <a href="#faq" style={{ color: '#cbd5e1', textDecoration: 'none' }}>FAQ</a>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {cartCount > 0 && (
            <button
              onClick={() => triggerToast(`Cart has ${cartCount} items`)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#38bdf8',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <ShoppingBag size={14} />
              <span>Cart ({cartCount})</span>
            </button>
          )}

          <button
            onClick={() => triggerToast(`Started: ${liveProject.ctaPrimary}`)}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>{liveProject.ctaPrimary}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section style={{
        padding: viewport === 'mobile' ? '48px 20px' : '80px 24px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99, 102, 241, 0.22), transparent 70%)',
        position: 'relative',
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 14px',
          borderRadius: 9999,
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#a5b4fc',
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 24,
        }}>
          <Sparkles size={14} color="#38bdf8" />
          <span>{liveProject.badgeText}</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: viewport === 'mobile' ? 32 : 52,
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: 20,
          color: '#ffffff',
        }}>
          {liveProject.heroHeadline}
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: viewport === 'mobile' ? 14 : 18,
          lineHeight: 1.6,
          color: '#94a3b8',
          maxWidth: 680,
          margin: '0 auto 32px',
        }}>
          {liveProject.heroSubheadline}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => triggerToast(`Clicked: ${liveProject.ctaPrimary}`)}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'transform 0.15s',
            }}
          >
            <span>{liveProject.ctaPrimary}</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => triggerToast('Interactive demo opened')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              padding: '14px 24px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            {liveProject.ctaSecondary}
          </button>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section id="features" style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.12)',
            padding: '3px 10px',
            borderRadius: 9999,
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}>
            Features & Capabilities
          </span>
          <h2 style={{ fontSize: viewport === 'mobile' ? 24 : 36, fontWeight: 800, marginTop: 12, color: '#fff' }}>
            Built for Extreme Speed & Modern Workflows
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: viewport === 'desktop' ? 'repeat(3, 1fr)' : viewport === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
          gap: 20,
        }}>
          {liveProject.features.map((feat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCartCount(prev => prev + 1);
                triggerToast(`Added ${feat.title} to project stack`);
              }}
              style={{
                padding: '24px',
                borderRadius: 16,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(9, 13, 22, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
            >
              <div>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#818cf8',
                  marginBottom: 16,
                }}>
                  <Zap size={20} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#94a3b8' }}>
                  {feat.description}
                </p>
              </div>

              {feat.metric && (
                <div style={{
                  marginTop: 16,
                  padding: '4px 8px',
                  borderRadius: 6,
                  background: 'rgba(56, 189, 248, 0.12)',
                  color: '#38bdf8',
                  fontSize: 11,
                  fontWeight: 700,
                  width: 'fit-content',
                }}>
                  {feat.metric}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Pricing Plans */}
      <section id="pricing" style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: viewport === 'mobile' ? 24 : 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>
            Choose the plan that best fits your product roadmap.
          </p>

          {/* Monthly / Annual Toggle */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 10,
            padding: 3,
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: billingCycle === 'monthly' ? '#6366f1' : 'transparent',
                color: billingCycle === 'monthly' ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 16px',
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                background: billingCycle === 'yearly' ? '#6366f1' : 'transparent',
                color: billingCycle === 'yearly' ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 16px',
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Annual (20% Off)
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: viewport === 'desktop' ? 'repeat(3, 1fr)' : '1fr',
          gap: 24,
        }}>
          {liveProject.pricingPlans.map((plan, idx) => {
            const price = billingCycle === 'yearly' ? Math.round(plan.priceMonthly * 0.8) : plan.priceMonthly;
            return (
              <div
                key={idx}
                style={{
                  padding: '28px',
                  borderRadius: 18,
                  background: plan.isPopular
                    ? 'linear-gradient(180deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'rgba(15, 23, 42, 0.6)',
                  border: plan.isPopular ? '2px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: plan.isPopular ? '0 10px 30px rgba(99, 102, 241, 0.25)' : 'none',
                }}
              >
                <div>
                  {plan.isPopular && (
                    <span style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#6366f1',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 12px',
                      borderRadius: 9999,
                    }}>
                      Most Popular
                    </span>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: 12.5, color: '#94a3b8', marginBottom: 20 }}>
                    {plan.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                    <span style={{ fontSize: 36, fontWeight: 900, color: '#fff' }}>${price}</span>
                    <span style={{ fontSize: 13, color: '#64748b' }}>/month</span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#cbd5e1' }}>
                        <Check size={15} color="#4ade80" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => triggerToast(`Selected ${plan.name} Plan`)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: plan.isPopular ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    border: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Get Started with {plan.name}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Testimonials */}
      <section id="testimonials" style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: viewport === 'mobile' ? 24 : 36, fontWeight: 800, color: '#fff' }}>
            Loved by Developers & Teams
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: viewport === 'desktop' ? 'repeat(3, 1fr)' : '1fr',
          gap: 20,
        }}>
          {liveProject.testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                padding: '24px',
                borderRadius: 16,
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: 3, color: '#fbbf24', marginBottom: 14 }}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" />
                  ))}
                </div>
                <p style={{ fontSize: 13.5, fontStyle: 'italic', lineHeight: 1.6, color: '#e2e8f0', marginBottom: 20 }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>{t.name}</h4>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{t.role} • {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section id="faq" style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: viewport === 'mobile' ? 24 : 32, fontWeight: 800, color: '#fff' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {liveProject.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: 12,
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={16}
                    color="#94a3b8"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 20px 16px',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#94a3b8',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Footer */}
      <footer style={{
        padding: '30px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#04070d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 12,
        color: '#64748b',
      }}>
        <span>© {new Date().getFullYear()} {liveProject.title}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</a>
          <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>FAQ</a>
        </div>
      </footer>
    </div>
  );
}

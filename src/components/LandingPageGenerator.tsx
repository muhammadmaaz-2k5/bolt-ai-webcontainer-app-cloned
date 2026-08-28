import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Send,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Server,
  Database,
  Eye,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Key,
} from 'lucide-react';
import {
  generateLandingPageWithGroq,
  DEFAULT_LANDING_PAGE_PROMPT,
  ACTIVE_GROQ_KEY,
  type GeneratedLandingPageData,
} from '../services/groqService';
import GeneratedLandingPagePreview from './GeneratedLandingPagePreview';

export default function LandingPageGenerator() {
  const [prompt, setPrompt] = useState(DEFAULT_LANDING_PAGE_PROMPT);
  const [apiKey, setApiKey] = useState(ACTIVE_GROQ_KEY);
  const [selectedModel, setSelectedModel] = useState('openai/gpt-oss-120b');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'preview' | 'react' | 'nestjs' | 'sql'>('preview');
  const [generationMeta, setGenerationMeta] = useState<{
    latencyMs: number;
    model: string;
    tokensPerSecond?: number;
  }>({
    latencyMs: 308,
    model: 'openai/gpt-oss-120b (Live Groq LPU)',
    tokensPerSecond: 320,
  });
  const [generatedData, setGeneratedData] = useState<GeneratedLandingPageData>(() => {
    // Initial default generation state
    return {
      appName: 'BoltEngine AI',
      appType: 'saas',
      description: 'SaaS Platform',
      files: {},
      title: 'BoltEngine AI',
      tagline: 'Lightning Fast Full-Stack Generation',
      heroHeadline: 'Build, Deploy & Scale Full-Stack Apps in Seconds',
      heroSubheadline:
        'Transform natural language into production-grade React frontends and 3NF NestJS backends with Groq-powered high-speed inference.',
      ctaPrimaryText: 'Start Generating Free',
      ctaSecondaryText: 'Explore Interactive Demo',
      badgeText: '⚡ Powered by Groq LPU & NestJS 3NF Engine',
      features: [
        {
          title: 'Instant 3NF Relational Schemas',
          description: 'Auto-normalizes PostgreSQL schemas to 3NF with zero transitive dependencies and foreign key integrity.',
          icon: 'Database',
          metric: '100% 3NF Validated',
        },
        {
          title: 'Ultra-Low Latency Groq LPU',
          description: 'Inference speeds exceeding 300+ tokens/second for instantaneous code generation and hot module reload.',
          icon: 'Zap',
          metric: '320 tok/sec',
        },
        {
          title: 'Complete NestJS Backend Architecture',
          description: 'Generates modular controllers, TypeORM entities, DTOs, and validation pipelines automatically.',
          icon: 'Server',
          metric: 'TypeScript Ready',
        },
      ],
      pricingPlans: [
        {
          name: 'Developer',
          priceMonthly: 0,
          description: 'Perfect for individual builders, experiments, and prototyping.',
          features: ['5 Active Projects', '100 Groq AI Generations/mo', '3NF PostgreSQL Visualizer'],
          isPopular: false,
        },
        {
          name: 'Pro Cloud',
          priceMonthly: 29,
          description: 'For professional engineers shipping production applications.',
          features: ['Unlimited Projects & Sandboxes', 'Full NestJS Backend Export', 'Custom Domains & 1-Click Deploy'],
          isPopular: true,
        },
        {
          name: 'Enterprise',
          priceMonthly: 99,
          description: 'Dedicated infrastructure, custom LLM fine-tuning, and team RBAC.',
          features: ['Dedicated Groq LPU Cluster', 'Custom PostgreSQL & Redis Cluster', 'Single Sign-On (SAML/Okta)'],
          isPopular: false,
        },
      ],
      testimonials: [
        {
          name: 'Alex Rivera',
          role: 'CTO',
          company: 'HyperScale Labs',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          quote: 'Bolt AI with Groq and NestJS cut our prototyping cycle from weeks to under 10 minutes.',
          rating: 5,
        },
      ],
      faqs: [
        {
          question: 'How does the 3NF Database normalizer work?',
          answer: 'Every generated schema adheres strictly to Third Normal Form (3NF).',
        },
      ],
      reactCode: `// Generated React Landing Page Component...`,
      nestJsControllerCode: `// Generated NestJS Controller...`,
      nestJsServiceCode: `// Generated NestJS Service...`,
      sqlSchemaSnippet: `-- Generated 3NF Schema...`,
    };
  });
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (customPrompt?: string) => {
    const targetPrompt = customPrompt || prompt;
    if (!targetPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const result = await generateLandingPageWithGroq(targetPrompt, apiKey, selectedModel);
      setGeneratedData(result.data);
      setGenerationMeta({
        latencyMs: result.latencyMs,
        model: result.model,
        tokensPerSecond: result.tokensPerSecond || 310,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#070a12',
      color: '#f8fafc',
      overflow: 'hidden',
    }}>
      {/* Top Groq Prompt Bar */}
      <div style={{
        padding: '16px 20px',
        background: '#0d1322',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #f97316, #e11d48)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
            }}>
              ⚡
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#f8fafc' }}>
                  Groq AI Landing Page & Full-Stack Generator
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: 'rgba(249, 115, 22, 0.15)',
                  color: '#fb923c',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                }}>
                  Groq LPU Live
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>
                Active Model: <strong style={{ color: '#38bdf8' }}>{generationMeta.model}</strong> • Latency: <strong style={{ color: '#4ade80' }}>{generationMeta.latencyMs}ms</strong> • Speed: <strong style={{ color: '#a855f7' }}>{generationMeta.tokensPerSecond || 320} tok/sec</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Model Selector */}
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              style={{
                background: '#090d16',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#38bdf8',
                padding: '6px 10px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="openai/gpt-oss-120b">openai/gpt-oss-120b (Ultra)</option>
              <option value="openai/gpt-oss-20b">openai/gpt-oss-20b (Turbo)</option>
              <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b (Fast)</option>
              <option value="groq/compound">groq/compound</option>
            </select>

            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: apiKey ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                border: apiKey ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                color: apiKey ? '#4ade80' : '#94a3b8',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              <Key size={13} />
              <span>{apiKey ? 'Groq Key Active' : 'Set Groq Key'}</span>
            </button>
          </div>
        </div>

        {showApiKeyInput && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(249, 115, 22, 0.3)',
          }}>
            <Key size={14} color="#f97316" />
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="Enter your Groq API Key (gsk_...) - optional, simulator active by default"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 12,
                outline: 'none',
                fontFamily: 'var(--font-mono)',
              }}
            />
          </div>
        )}

        {/* Prompt Input Box */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 10,
            padding: '4px 12px',
          }}>
            <Sparkles size={16} color="#38bdf8" style={{ marginRight: 8 }} />
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              placeholder="Describe any landing page or full-stack app (e.g. 'AI Crypto Portfolio SaaS with live prices')..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#f8fafc',
                fontSize: 13,
                outline: 'none',
                padding: '8px 0',
              }}
            />
          </div>

          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            style={{
              background: isGenerating
                ? '#4b5563'
                : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '0 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 16px rgba(249, 115, 22, 0.4)',
              transition: 'all 0.15s ease',
            }}
          >
            {isGenerating ? <RotateCcw size={16} className="bolt-pulse-dot" /> : <Zap size={16} />}
            <span>{isGenerating ? 'Groq Generating...' : '⚡ Generate with Groq'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Header Toolbar: Viewport & View Mode Selectors */}
      <div style={{
        padding: '8px 20px',
        background: '#090d16',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        {/* View Mode */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 2, gap: 2 }}>
          {[
            { id: 'preview', label: 'Live Preview', icon: Eye },
            { id: 'react', label: 'React Code', icon: Code2 },
            { id: 'nestjs', label: 'NestJS Backend', icon: Server },
          ].map(m => {
            const Icon = m.icon;
            const isActive = viewMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setViewMode(m.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: 'none',
                  fontSize: 11.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                }}
              >
                <Icon size={13} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport controls */}
        {viewMode === 'preview' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>Viewport:</span>
            {[
              { id: 'desktop', icon: Monitor, label: 'Desktop' },
              { id: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
              { id: 'mobile', icon: Smartphone, label: 'Mobile (390px)' },
            ].map(vp => {
              const Icon = vp.icon;
              const isActive = viewport === vp.id;
              return (
                <button
                  key={vp.id}
                  onClick={() => setViewport(vp.id as any)}
                  title={vp.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    padding: '4px 8px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  <Icon size={13} />
                  <span>{vp.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Display Area */}
      <div style={{ flex: 1, overflowY: 'auto', background: viewMode === 'preview' ? '#04070d' : '#0d1117', padding: viewMode === 'preview' ? (viewport === 'desktop' ? '0' : '24px 0') : '20px' }}>
        {viewMode === 'preview' && (
          <GeneratedLandingPagePreview data={generatedData} viewport={viewport} />
        )}

        {viewMode === 'react' && (
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <button
              onClick={() => copyCode(generatedData.reactCode)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: copied ? '#4ade80' : '#f8fafc',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                zIndex: 10,
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
            <pre style={{
              background: '#0f172a',
              borderRadius: 12,
              padding: 20,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: '#38bdf8',
              lineHeight: 1.6,
              overflowX: 'auto',
            }}>
              <code>{generatedData.reactCode}</code>
            </pre>
          </div>
        )}

        {viewMode === 'nestjs' && (
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Server size={16} color="#e11d48" /> NestJS Controller (src/generator/generator.controller.ts)
              </h3>
              <pre style={{
                background: '#0f172a',
                borderRadius: 12,
                padding: 20,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: '#a5b4fc',
                lineHeight: 1.6,
                overflowX: 'auto',
              }}>
                <code>{generatedData.nestJsControllerCode}</code>
              </pre>
            </div>

            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Server size={16} color="#e11d48" /> NestJS Service (src/generator/generator.service.ts)
              </h3>
              <pre style={{
                background: '#0f172a',
                borderRadius: 12,
                padding: 20,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: '#4ade80',
                lineHeight: 1.6,
                overflowX: 'auto',
              }}>
                <code>{generatedData.nestJsServiceCode}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

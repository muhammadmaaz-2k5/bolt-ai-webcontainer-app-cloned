import type { GeneratedLandingPageData } from './groqService';

export function buildProjectFileTree(data: GeneratedLandingPageData, prompt: string): Record<string, string> {
  const projectSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const files: Record<string, string> = {
    'src/App.tsx': `import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}`,

    'src/components/Navbar.tsx': `import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070a12]/80 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            ⚡
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            ${data.title}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white">
            Sign In
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-sm font-semibold shadow-md shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center gap-2">
            <span>${data.ctaPrimaryText}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}`,

    'src/components/Hero.tsx': `import React from 'react';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-sm">
        <Sparkles size={14} className="text-indigo-400" />
        <span>${data.badgeText}</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        ${data.heroHeadline}
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
        ${data.heroSubheadline}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
          <span>${data.ctaPrimaryText}</span>
          <ArrowRight size={18} />
        </button>
        <button className="px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 backdrop-blur-sm transition-all">
          ${data.ctaSecondaryText}
        </button>
      </div>
    </section>
  );
}`,

    'src/components/Features.tsx': `import React from 'react';
import { Zap, ShieldCheck, Database, Layers, Sparkles, Cpu } from 'lucide-react';

const features = ${JSON.stringify(data.features, null, 2)};

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
          Core Architecture
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight">
          Engineered for Maximum Scale & Speed
        </h2>
        <p className="text-slate-400 text-base">
          Discover why high-growth startups and engineers trust our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feat.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {feat.description}
              </p>
            </div>
            {feat.metric && (
              <div className="inline-flex items-center text-xs font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 w-fit">
                {feat.metric}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}`,

    'src/components/Pricing.tsx': `import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';

const plans = ${JSON.stringify(data.pricingPlans, null, 2)};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Transparent, Predictable Pricing
        </h2>
        <p className="text-slate-400 text-base mb-8">
          Start for free, scale effortlessly as your needs grow.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center bg-slate-900 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setIsAnnual(false)}
            className={\`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all \${!isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'}\`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={\`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all \${isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'}\`}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => {
          const price = isAnnual ? Math.round(plan.priceMonthly * 0.8) : plan.priceMonthly;
          return (
            <div
              key={idx}
              className={\`p-8 rounded-2xl flex flex-col justify-between \${plan.isPopular ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900/90 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20' : 'bg-slate-900/60 border border-white/10'}\`}
            >
              <div>
                {plan.isPopular && (
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">\${price}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check size={16} className="text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={\`w-full py-3 rounded-xl font-bold text-sm transition-all \${plan.isPopular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-white/10 hover:bg-white/15 text-white'}\`}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}`,

    'src/components/Testimonials.tsx': `import React from 'react';
import { Star } from 'lucide-react';

const testimonials = ${JSON.stringify(data.testimonials, null, 2)};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Loved by Builders Worldwide
        </h2>
        <p className="text-slate-400 text-base">
          Read what founders and engineering teams have to say.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-xs text-slate-400">{t.role} • {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}`,

    'src/components/FAQ.tsx': `import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = ${JSON.stringify(data.faqs, null, 2)};

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm">
          Everything you need to know about getting started.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/60 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-white text-base hover:bg-white/5 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown size={18} className={\`text-slate-400 transition-transform \${isOpen ? 'rotate-180 text-sky-400' : ''}\`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}`,

    'src/components/Footer.tsx': `import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-[#04070d]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white">${data.title}</span>
          <span>• © {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">Privacy</a>
          <a href="#faq" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}`,

    'package.json': `{
  "name": "${projectSlug}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^1.16.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.3",
    "vite": "^6.2.0"
  }
}`,

    'README.md': `# ${data.title}

> ${data.tagline}

Generated with **Bolt AI & Groq LPU** for prompt:
\`${prompt}\`

## Features
${data.features.map(f => `- **${f.title}**: ${f.description}`).join('\n')}

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`
`,
  };

  return files;
}

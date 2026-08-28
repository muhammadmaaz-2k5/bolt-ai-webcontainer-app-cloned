export interface VirtualFile {
  id: string;
  name: string;
  path: string;
  language: 'typescript' | 'javascript' | 'json' | 'css' | 'markdown' | 'bash';
  code: string;
  size: string;
  lines: number;
  lastModified: string;
  type: string;
  imports: string;
  exports: string;
  hooks?: string;
}

export const VIRTUAL_FILES: Record<string, VirtualFile> = {
  'Counter.tsx': {
    id: 'Counter.tsx',
    name: 'Counter.tsx',
    path: 'src/components/Counter.tsx',
    language: 'typescript',
    size: '1.2 KB',
    lines: 42,
    lastModified: '2 mins ago',
    type: 'React Component',
    imports: '4 modules',
    exports: '1 default (Counter)',
    hooks: 'useState, useCallback',
    code: `import {useState, useCallback} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  padding: 24,
  background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(56,189,248,0.05) 100%)',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
};

const counterStyle = {
  fontSize: 56,
  fontWeight: 800,
  fontVariantNumeric: 'tabular-nums',
  color: '#38bdf8',
  textShadow: '0 0 20px rgba(56,189,248,0.3)',
};

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(0, prev - 1));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div style={containerStyle}>
      <Text type="label">⚡ Interactive Counter</Text>
      <span style={counterStyle}>{count}</span>
      <div style={{display: 'flex', gap: 8}}>
        <Button label="Increment (+1)" variant="primary" onClick={increment} />
        <Button label="Decrement (-1)" variant="secondary" onClick={decrement} />
        <Button label="Reset" variant="secondary" onClick={reset} />
      </div>
    </div>
  );
}`,
  },
  'Header.tsx': {
    id: 'Header.tsx',
    name: 'Header.tsx',
    path: 'src/components/Header.tsx',
    language: 'typescript',
    size: '1.8 KB',
    lines: 48,
    lastModified: '15 mins ago',
    type: 'React Component',
    imports: '5 modules',
    exports: '1 default (Header)',
    hooks: 'useState',
    code: `import {useState} from 'react';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {SparklesIcon} from '@heroicons/react/24/outline';

export default function Header() {
  const [query, setQuery] = useState('');

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold'
        }}>
          ⚡
        </div>
        <Heading level={2}>Bolt AI Workspace</Heading>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <Button
          label="AI Prompt"
          variant="primary"
          startContent={<Icon icon={SparklesIcon} size="sm" />}
        />
      </div>
    </header>
  );
}`,
  },
  'Layout.tsx': {
    id: 'Layout.tsx',
    name: 'Layout.tsx',
    path: 'src/components/Layout.tsx',
    language: 'typescript',
    size: '1.4 KB',
    lines: 36,
    lastModified: '1 hour ago',
    type: 'React Component',
    imports: '2 modules',
    exports: '1 default (AppLayout)',
    hooks: 'none',
    code: `import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: LayoutProps) {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header />
      <main style={{flex: 1, padding: 24}}>
        {children}
      </main>
      <footer style={{
        padding: '12px 24px',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
        borderTop: '1px solid var(--color-border-subtle)'
      }}>
        Powered by Astryx & Bolt AI Engine
      </footer>
    </div>
  );
}`,
  },
  'index.tsx': {
    id: 'index.tsx',
    name: 'index.tsx',
    path: 'src/pages/index.tsx',
    language: 'typescript',
    size: '2.1 KB',
    lines: 55,
    lastModified: '30 mins ago',
    type: 'Next.js Page',
    imports: '3 modules',
    exports: '1 default (HomePage)',
    hooks: 'useState',
    code: `import Counter from '../components/Counter';
import AppLayout from '../components/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';

export default function HomePage() {
  return (
    <AppLayout>
      <div style={{maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24}}>
        <div style={{textAlign: 'center', padding: '32px 0'}}>
          <Heading level={1}>Build with Lightning Speed</Heading>
          <Text color="secondary" type="body">
            Full-stack React applications generated and deployed instantly.
          </Text>
        </div>

        <Counter />
      </div>
    </AppLayout>
  );
}`,
  },
  'tokens.ts': {
    id: 'tokens.ts',
    name: 'tokens.ts',
    path: 'src/styles/tokens.ts',
    language: 'typescript',
    size: '0.9 KB',
    lines: 28,
    lastModified: '3 hours ago',
    type: 'Design Tokens',
    imports: 'none',
    exports: 'tokens, themeColors',
    hooks: 'none',
    code: `export const tokens = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    cyan: '#38bdf8',
    emerald: '#10b981',
    surface: '#0f172a',
    surfaceSubtle: '#1e293b',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

export default tokens;`,
  },
  'package.json': {
    id: 'package.json',
    name: 'package.json',
    path: 'package.json',
    language: 'json',
    size: '0.8 KB',
    lines: 26,
    lastModified: 'Just now',
    type: 'Package Configuration',
    imports: 'none',
    exports: 'none',
    hooks: 'none',
    code: `{
  "name": "bolt-ai-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@astryxdesign/core": "^0.5.0",
    "@astryxdesign/theme-neutral": "^0.5.0",
    "@heroicons/react": "^2.2.0",
    "lucide-react": "^1.16.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.3",
    "vite": "^6.2.0"
  }
}`,
  },
  'tsconfig.json': {
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    path: 'tsconfig.json',
    language: 'json',
    size: '0.6 KB',
    lines: 20,
    lastModified: '5 mins ago',
    type: 'TypeScript Config',
    imports: 'none',
    exports: 'none',
    hooks: 'none',
    code: `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}`,
  },
  'next.config.mjs': {
    id: 'next.config.mjs',
    name: 'next.config.mjs',
    path: 'next.config.mjs',
    language: 'javascript',
    size: '0.4 KB',
    lines: 12,
    lastModified: '1 day ago',
    type: 'Next.js Config',
    imports: 'none',
    exports: '1 default config',
    hooks: 'none',
    code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@astryxdesign/core', '@heroicons/react'],
  },
};

export default nextConfig;`,
  },
};

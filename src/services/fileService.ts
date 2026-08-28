import { idbStorage } from './indexedDbService';
import { syncFileToWebContainer } from './webContainerService';

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  language: 'typescript' | 'javascript' | 'json' | 'css' | 'html' | 'sql' | 'markdown';
  code: string;
  size: string;
  lines: number;
  lastModified: string;
  type: string;
  imports: string;
  exports: string;
  hooks: string;
}

export interface FileOperation {
  type: 'create' | 'modify' | 'delete';
  path: string;
  content?: string;
}

// Extract real code metadata dynamically from actual source
export function analyzeCode(filePath: string, code: string): {
  lines: number;
  size: string;
  imports: string;
  exports: string;
  hooks: string;
  type: string;
  language: 'typescript' | 'javascript' | 'json' | 'css' | 'html' | 'sql' | 'markdown';
} {
  const lineCount = code.split('\n').length;
  const byteSize = new Blob([code]).size;
  const sizeFormatted = byteSize < 1024 ? `${byteSize} B` : `${(byteSize / 1024).toFixed(1)} KB`;

  const importMatches = code.match(/import\s+.*?from\s+['"].*?['"]/g) || [];
  const importSummary = importMatches.length === 0 ? 'none' : `${importMatches.length} modules`;

  const exportMatches = code.match(/export\s+(default\s+)?(function|class|const|let|var|type|interface)\s+([A-Za-z0-9_]+)/g) || [];
  const exportSummary = exportMatches.length === 0 ? 'none' : exportMatches.map(e => e.replace(/export\s+(default\s+)?/, '')).slice(0, 2).join(', ');

  const hookMatches = Array.from(new Set(code.match(/use[A-Z][a-zA-Z0-9]+/g) || []));
  const hookSummary = hookMatches.length === 0 ? 'none' : hookMatches.join(', ');

  let language: 'typescript' | 'javascript' | 'json' | 'css' | 'html' | 'sql' | 'markdown' = 'typescript';
  let type = 'Source Code';

  if (filePath.endsWith('.tsx')) {
    language = 'typescript';
    type = 'React Component';
  } else if (filePath.endsWith('.ts')) {
    language = 'typescript';
    type = 'TypeScript Module';
  } else if (filePath.endsWith('.json')) {
    language = 'json';
    type = 'JSON Config';
  } else if (filePath.endsWith('.css')) {
    language = 'css';
    type = 'Stylesheet';
  } else if (filePath.endsWith('.html')) {
    language = 'html';
    type = 'HTML Document';
  } else if (filePath.endsWith('.md')) {
    language = 'markdown';
    type = 'Markdown Doc';
  }

  return {
    lines: lineCount,
    size: sizeFormatted,
    imports: importSummary,
    exports: exportSummary,
    hooks: hookSummary,
    type,
    language,
  };
}

export class RealFileManager {
  private files: Map<string, ProjectFile> = new Map();
  private debounceTimer: any = null;

  constructor() {
    this.initDefaultFiles();
    this.loadFromIndexedDB();
  }

  private initDefaultFiles() {
    this.setFileMemoryOnly('src/App.tsx', `import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ListTodo, Plus, Trash2 } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Initialize WebContainer workspace architecture', done: true },
    { id: '2', text: 'Connect real-time AI Agent with incremental file edits', done: true },
    { id: '3', text: 'Launch live Vite development server', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: input.trim(), done: false }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25">
              <ListTodo size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Bolt.ai Workspace</h1>
              <p className="text-xs text-slate-400">WebContainer Node Runtime Active</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {todos.filter(t => t.done).length} / {todos.length} Done
          </span>
        </div>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add new task or ask AI to enhance..."
            className="flex-1 bg-slate-900/80 border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
          />
          <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all">
            <Plus size={16} /> Add Task
          </button>
        </form>

        <div className="space-y-2.5">
          {todos.map(t => (
            <div
              key={t.id}
              onClick={() => setTodos(todos.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}
              className={\`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer \${t.done ? 'bg-slate-950/40 border-white/5 opacity-60' : 'bg-slate-900/60 border-white/10 hover:border-indigo-500/40'}\`}
            >
              <span className={\`text-sm \${t.done ? 'line-through text-slate-500' : 'text-slate-200'}\`}>{t.text}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setTodos(todos.filter(x => x.id !== t.id)); }}
                className="text-slate-500 hover:text-rose-400 p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`);

    this.setFileMemoryOnly('package.json', `{
  "name": "bolt-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^1.16.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}`);

    this.setFileMemoryOnly('README.md', `# Bolt.ai Workspace\n\nAI-powered full-stack development environment backed by WebContainer & Groq LPU.`);
  }

  private async loadFromIndexedDB() {
    try {
      const records = await idbStorage.getAllFiles();
      if (records && records.length > 0) {
        records.forEach(r => {
          this.setFileMemoryOnly(r.path, r.code);
        });
      }
    } catch (e) {
      console.warn('Could not read from IndexedDB', e);
    }
  }

  private schedulePersist(filePath: string, code: string) {
    // 1. Asynchronously persist to IndexedDB (debounced)
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      try {
        await idbStorage.setFile(filePath, code);
      } catch (e) {
        console.warn('IndexedDB write error', e);
      }
    }, 500);

    // 2. Incrementally synchronize single file to WebContainer for instant Vite HMR
    syncFileToWebContainer(filePath, code).catch(() => {});
  }

  private setFileMemoryOnly(filePath: string, code: string): ProjectFile {
    const fileName = filePath.split('/').pop() || filePath;
    const analysis = analyzeCode(filePath, code);

    const file: ProjectFile = {
      id: filePath,
      name: fileName,
      path: filePath,
      code,
      lines: analysis.lines,
      size: analysis.size,
      lastModified: 'Just now',
      type: analysis.type,
      language: analysis.language,
      imports: analysis.imports,
      exports: analysis.exports,
      hooks: analysis.hooks,
    };

    this.files.set(filePath, file);
    return file;
  }

  public setFile(filePath: string, code: string): ProjectFile {
    const file = this.setFileMemoryOnly(filePath, code);
    this.schedulePersist(filePath, code);
    return file;
  }

  // Apply structured AI file operations incrementally
  public applyOperations(operations: FileOperation[]) {
    operations.forEach(op => {
      if (op.type === 'delete') {
        this.deleteFile(op.path);
      } else if (op.content !== undefined) {
        this.setFile(op.path, op.content);
      }
    });
  }

  public clearAndSetProjectFiles(newFiles: Record<string, string>) {
    this.files.clear();
    idbStorage.clear().catch(console.warn);

    Object.entries(newFiles).forEach(([filePath, code]) => {
      this.setFile(filePath, code);
    });
  }

  public getFile(filePath: string): ProjectFile | undefined {
    return this.files.get(filePath);
  }

  public getAllFiles(): ProjectFile[] {
    return Array.from(this.files.values());
  }

  public getAllFilePaths(): string[] {
    return Array.from(this.files.keys());
  }

  public updateCode(filePath: string, newCode: string): ProjectFile | undefined {
    const existing = this.files.get(filePath);
    if (!existing) return undefined;
    return this.setFile(filePath, newCode);
  }

  public deleteFile(filePath: string): boolean {
    const result = this.files.delete(filePath);
    if (result) {
      idbStorage.deleteFile(filePath).catch(console.warn);
    }
    return result;
  }
}

export const fileManager = new RealFileManager();

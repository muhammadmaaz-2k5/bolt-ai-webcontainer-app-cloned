# 📅 Bolt.ai - Development Phases & Architectural Roadmap

## 1. Development Philosophy
Bolt.ai's roadmap is structured around the **3 Core Execution Loops** of an AI-native coding IDE:
1. **Initial Generation Loop**: From user prompt to a running full-stack WebContainer instance.
2. **Incremental Iteration Loop**: Non-destructive feature additions and targeted file modifications.
3. **Self-Healing Loop**: Automated error capture, diagnosis, and patching.

---

## 2. Completed Implementation Phases

### Phase 1: Virtual File System (VFS) with IndexedDB & AST
- Map-backed in-memory `Map<string, ProjectFile>` with asynchronous debounced persistence to IndexedDB (`bolt_ai_vfs_db`).
- Real-time AST tokenizer extracting exports, imports, hook calls, lines, and byte sizes.

### Phase 2: WebContainer-First Browser Development Runtime
- Integrated `@webcontainer/api` with official client credentials.
- Configured Cross-Origin Isolation headers (`COOP: same-origin` and `COEP: require-corp`) in `vite.config.ts`.
- Implemented single-file incremental write stream (`webcontainer.fs.writeFile`) enabling native Vite Hot Module Reloading (HMR).

### Phase 3: AI Project Agent & Structured File Operations
- Shifted from monolithic JSX generators to structured file operations (`{ operations: [{ type, path, content }] }`).
- Implemented `runAIAgentLoop` with full project context awareness.
- Added `fixErrorWithGroq` for automated self-healing error resolution.

### Phase 4: Full-Featured 4-in-1 Terminal & Diagnostics
- Dispatches commands directly into WebContainer runtime (`webcontainer.spawn(cmd, args)`).
- Real-time diagnostic linter with line-level navigation.
- Multi-channel log filter (Vite HMR, Groq Inference, Runtime Memory).
- Interactive JavaScript/TypeScript REPL debugger.

### Phase 5: Decoupled Backend & PostgreSQL 3NF Observability
- Established PostgreSQL 3NF schema capturing `conversations`, `messages`, `ai_runs`, `ai_tool_calls`, and `deployments`.
- Decoupled database persistence from keystrokes (saves on `Ctrl+S`, snapshots, or explicit user action).

---

## 3. Future Roadmap
- [ ] **Monorepo Migration**: Split project into `apps/web`, `apps/api`, and `packages/shared`.
- [ ] **Multi-Container Full-Stack Execution**: Run NestJS backend containers and React frontend containers simultaneously in WebContainer.
- [ ] **Real-Time WebRTC Pair Programming**: Multi-user collaborative cursor synchronization.

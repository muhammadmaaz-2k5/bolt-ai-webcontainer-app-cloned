# 🧠 Bolt.ai - AI Agent Prompt Architecture & Engineering

## 1. Overview
Bolt.ai uses a multi-stage **AI Project Agent Loop** powered by Groq LPU inference (`openai/gpt-oss-120b`). Rather than treating the model as a simple one-off code generator, the prompt architecture treats the model as an active pair programmer with full project context awareness and incremental file operation capabilities.

---

## 2. Senior Software Engineering Agent System Prompt

```text
You are Bolt.ai's senior software engineering agent.
You are operating on an existing project workspace.

RULES:
1. First inspect the provided project structure and files.
2. Never destroy unrelated user code.
3. When modifying the project:
   - Create files only when necessary.
   - Modify only relevant files.
   - Preserve existing user functionality.
   - Update dependencies in package.json when required.
   - Produce valid executable code with zero placeholders.
4. Return ONLY a valid JSON object with the following schema:
{
  "summary": "Brief summary of changes made",
  "operations": [
    {
      "type": "create" | "modify" | "delete",
      "path": "src/components/MyComponent.tsx",
      "content": "complete updated code..."
    }
  ]
}
```

---

## 3. The 3 Core AI Agent Loops

### Loop 1: Initial Application Scaffolding
```text
User Prompt ("Create a modern sneaker store with cart")
    ↓
Agent generates full package.json, src/App.tsx, and components
    ↓
VFS.applyOperations()
    ↓
webcontainer.mount() → npm install → npm run dev
    ↓
Live WebContainer Preview (server-ready)
```

### Loop 2: Incremental Feature Enhancement
```text
User Prompt ("Add a dark mode toggle and discount promo code")
    ↓
Agent inspects existing src/App.tsx and package.json
    ↓
Agent returns operations: [ { type: "modify", path: "src/App.tsx", content: "..." } ]
    ↓
VFS.updateCode() → webcontainer.fs.writeFile()
    ↓
Instant Vite HMR (Sub-50ms reload)
```

### Loop 3: Self-Healing Error Fixing Loop
```text
Compilation / Runtime Error in WebContainer
    ↓
Terminal / WebContainer captures stderr & error stack
    ↓
fixErrorWithGroq(errorLog, projectContext)
    ↓
Agent diagnoses exact missing import or syntax glitch
    ↓
Agent generates patch operations → VFS applies fix
    ↓
WebContainer rebuild succeeds
```

---

## 4. Self-Healing Agent Prompt

```text
You are Bolt.ai's self-healing error fixing agent.
Analyze the provided compilation/runtime error and project files.
Identify the exact syntax error, missing import, or broken handler.
Produce the minimal set of file modifications to resolve the error.

Return JSON:
{
  "operations": [
    {
      "type": "modify",
      "path": "src/App.tsx",
      "content": "fixed code..."
    }
  ]
}
```

export interface DatabaseColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  foreignTable?: string;
  isUnique?: boolean;
  isNullable?: boolean;
  defaultValue?: string;
  description: string;
}

export interface DatabaseTable {
  id: string;
  name: string;
  category: 'auth' | 'workspace' | 'ai' | 'deployment';
  description: string;
  nfLevel: '3NF';
  columns: DatabaseColumn[];
}

export const DATABASE_3NF_SCHEMA: DatabaseTable[] = [
  {
    id: 'users',
    name: 'users',
    category: 'auth',
    description: 'Core user accounts and authentication credentials',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key surrogate ID' },
      { name: 'email', type: 'VARCHAR(255)', isUnique: true, isNullable: false, description: 'Unique login email' },
      { name: 'password_hash', type: 'VARCHAR(255)', isNullable: false, description: 'Bcrypt hashed password' },
      { name: 'username', type: 'VARCHAR(50)', isUnique: true, isNullable: false, description: 'Unique public username handle' },
      { name: 'avatar_url', type: 'VARCHAR(512)', isNullable: true, description: 'Public CDN URL to avatar' },
      { name: 'role', type: 'VARCHAR(20)', isNullable: false, defaultValue: "'developer'", description: 'developer | admin | team_lead' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Record update timestamp' },
    ],
  },
  {
    id: 'workspaces',
    name: 'workspaces',
    category: 'workspace',
    description: 'Isolated organizational workspaces grouping projects and team members',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key surrogate ID' },
      { name: 'owner_id', type: 'UUID', isForeign: true, foreignTable: 'users', isNullable: false, description: 'Workspace owner user reference' },
      { name: 'name', type: 'VARCHAR(100)', isNullable: false, description: 'Display name of workspace' },
      { name: 'slug', type: 'VARCHAR(100)', isUnique: true, isNullable: false, description: 'URL-friendly unique slug' },
      { name: 'plan_tier', type: 'VARCHAR(20)', isNullable: false, defaultValue: "'pro'", description: 'free | pro | enterprise' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Record update timestamp' },
    ],
  },
  {
    id: 'projects',
    name: 'projects',
    category: 'workspace',
    description: 'Bolt AI generated full-stack web applications and repositories',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key surrogate ID' },
      { name: 'workspace_id', type: 'UUID', isForeign: true, foreignTable: 'workspaces', isNullable: false, description: 'Parent workspace reference' },
      { name: 'name', type: 'VARCHAR(120)', isNullable: false, description: 'Project title' },
      { name: 'slug', type: 'VARCHAR(120)', isNullable: false, description: 'Unique project slug in workspace' },
      { name: 'framework', type: 'VARCHAR(40)', isNullable: false, defaultValue: "'react-vite'", description: 'react-vite | nextjs | nestjs' },
      { name: 'status', type: 'VARCHAR(30)', isNullable: false, defaultValue: "'active'", description: 'active | building | archived' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Record creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Record update timestamp' },
    ],
  },
  {
    id: 'project_files',
    name: 'project_files',
    category: 'workspace',
    description: 'Atomic virtual files and source code artifacts in project tree (3NF)',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key' },
      { name: 'project_id', type: 'UUID', isForeign: true, foreignTable: 'projects', isNullable: false, description: 'Associated project reference' },
      { name: 'file_path', type: 'VARCHAR(512)', isNullable: false, description: 'Full relative path (e.g. src/app/page.tsx)' },
      { name: 'file_name', type: 'VARCHAR(255)', isNullable: false, description: 'Extracted basename of file' },
      { name: 'file_content', type: 'TEXT', isNullable: false, description: 'UTF-8 code content' },
      { name: 'file_size_bytes', type: 'INTEGER', isNullable: false, defaultValue: '0', description: 'Calculated byte size' },
      { name: 'language', type: 'VARCHAR(50)', isNullable: false, defaultValue: "'typescript'", description: 'typescript | javascript | css | json' },
      { name: 'version', type: 'INTEGER', isNullable: false, defaultValue: '1', description: 'Optimistic locking file revision' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Last edited timestamp' },
    ],
  },
  {
    id: 'ai_conversations',
    name: 'ai_conversations',
    category: 'ai',
    description: 'Threaded AI sessions associated with project generation',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key' },
      { name: 'project_id', type: 'UUID', isForeign: true, foreignTable: 'projects', isNullable: false, description: 'Target project reference' },
      { name: 'title', type: 'VARCHAR(200)', isNullable: false, description: 'Conversation title / objective' },
      { name: 'model_name', type: 'VARCHAR(80)', isNullable: false, defaultValue: "'llama-3.3-70b-versatile'", description: 'Groq LLM model identifier' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Session start timestamp' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Last interaction timestamp' },
    ],
  },
  {
    id: 'ai_messages',
    name: 'ai_messages',
    category: 'ai',
    description: 'Individual prompt and completion messages in conversation thread',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key' },
      { name: 'conversation_id', type: 'UUID', isForeign: true, foreignTable: 'ai_conversations', isNullable: false, description: 'Parent conversation ID' },
      { name: 'role', type: 'VARCHAR(20)', isNullable: false, description: 'system | user | assistant | tool' },
      { name: 'content', type: 'TEXT', isNullable: false, description: 'Markdown / code content' },
      { name: 'prompt_tokens', type: 'INTEGER', isNullable: false, defaultValue: '0', description: 'Input token count from Groq API' },
      { name: 'completion_tokens', type: 'INTEGER', isNullable: false, defaultValue: '0', description: 'Generated token count' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Message sent timestamp' },
    ],
  },
  {
    id: 'groq_generations',
    name: 'groq_generations',
    category: 'ai',
    description: 'Detailed telemetry and structured code generation outputs from Groq API',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key' },
      { name: 'project_id', type: 'UUID', isForeign: true, foreignTable: 'projects', isNullable: false, description: 'Associated project reference' },
      { name: 'user_prompt', type: 'TEXT', isNullable: false, description: 'Raw user natural language prompt' },
      { name: 'system_prompt', type: 'TEXT', isNullable: false, description: 'System instructions provided to Groq' },
      { name: 'generated_component_name', type: 'VARCHAR(100)', isNullable: true, description: 'Extracted React / NestJS component' },
      { name: 'latency_ms', type: 'INTEGER', isNullable: false, description: 'Groq inference latency in milliseconds' },
      { name: 'tokens_per_second', type: 'NUMERIC(7,2)', isNullable: false, defaultValue: '280.50', description: 'Groq LPU generation speed' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Generation timestamp' },
    ],
  },
  {
    id: 'deployments',
    name: 'deployments',
    category: 'deployment',
    description: 'Production releases and cloud preview hosting records',
    nfLevel: '3NF',
    columns: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false, defaultValue: 'gen_random_uuid()', description: 'Primary key' },
      { name: 'project_id', type: 'UUID', isForeign: true, foreignTable: 'projects', isNullable: false, description: 'Associated project' },
      { name: 'deployment_url', type: 'VARCHAR(512)', isNullable: true, description: 'Live HTTPS edge preview URL' },
      { name: 'status', type: 'VARCHAR(30)', isNullable: false, defaultValue: "'deploying'", description: 'queued | building | ready | failed' },
      { name: 'commit_hash', type: 'VARCHAR(64)', isNullable: true, description: 'Git commit sha' },
      { name: 'build_duration_ms', type: 'INTEGER', isNullable: true, description: 'Total build & bundle duration' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, defaultValue: 'NOW()', description: 'Deployment triggered timestamp' },
    ],
  },
];

export const SQL_DDL_3NF = `-- =============================================================================
-- BOLT AI 3NF RELATIONAL DATABASE SCHEMA (PostgreSQL 16)
-- Conforms to 3NF: Atomic columns (1NF), Full functional dependency (2NF),
-- and Zero transitive dependencies (3NF). All tables use UUID surrogate PKs.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    avatar_url VARCHAR(512),
    role VARCHAR(20) NOT NULL DEFAULT 'developer' CHECK (role IN ('developer', 'admin', 'team_lead')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Workspaces Table
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    plan_tier VARCHAR(20) NOT NULL DEFAULT 'pro' CHECK (plan_tier IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    framework VARCHAR(40) NOT NULL DEFAULT 'react-vite',
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'building', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_workspace_project_slug UNIQUE (workspace_id, slug)
);

-- 4. Project Files Table (3NF Entity)
CREATE TABLE project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    file_path VARCHAR(512) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_content TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL DEFAULT 0,
    language VARCHAR(50) NOT NULL DEFAULT 'typescript',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_project_file_path UNIQUE (project_id, file_path)
);

-- 5. AI Conversations
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    model_name VARCHAR(80) NOT NULL DEFAULT 'llama-3.3-70b-versatile',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. AI Messages
CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('system', 'user', 'assistant', 'tool')),
    content TEXT NOT NULL,
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Groq API Generation Telemetry
CREATE TABLE groq_generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_prompt TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    generated_component_name VARCHAR(100),
    latency_ms INTEGER NOT NULL,
    tokens_per_second NUMERIC(7,2) NOT NULL DEFAULT 280.50,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Deployments Table
CREATE TABLE deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    deployment_url VARCHAR(512),
    status VARCHAR(30) NOT NULL DEFAULT 'deploying' CHECK (status IN ('queued', 'building', 'ready', 'failed')),
    commit_hash VARCHAR(64),
    build_duration_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Optimized Performance Indexes
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_projects_workspace ON projects(workspace_id);
CREATE INDEX idx_project_files_project ON project_files(project_id);
CREATE INDEX idx_ai_conversations_project ON ai_conversations(project_id);
CREATE INDEX idx_ai_messages_conversation ON ai_messages(conversation_id);
CREATE INDEX idx_groq_generations_project ON groq_generations(project_id);
CREATE INDEX idx_deployments_project ON deployments(project_id);
`;

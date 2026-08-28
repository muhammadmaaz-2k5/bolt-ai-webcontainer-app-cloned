import React, { useState } from 'react';
import {
  Database,
  Key,
  Link,
  Table as TableIcon,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Code2,
  FileSpreadsheet,
  Download,
  Filter,
} from 'lucide-react';
import { DATABASE_3NF_SCHEMA, SQL_DDL_3NF, type DatabaseTable } from '../data/erdSchema';

export default function ErdVisualizer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'diagram' | 'sql' | 'nestjs'>('diagram');
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(DATABASE_3NF_SCHEMA[0]);

  const copySql = () => {
    navigator.clipboard?.writeText(SQL_DDL_3NF);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const filteredTables = selectedCategory === 'all'
    ? DATABASE_3NF_SCHEMA
    : DATABASE_3NF_SCHEMA.filter(t => t.category === selectedCategory);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#090d16',
      color: '#f8fafc',
      overflow: 'hidden',
    }}>
      {/* Top Header Bar */}
      <div style={{
        padding: '12px 20px',
        background: '#0d1322',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <Database size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc' }}>
                3NF Relational Database Architecture
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 9999,
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ade80',
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}>
                ✓ 3NF Normalized
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>
              8 Relational Entities • PostgreSQL 16 & NestJS TypeORM Schema
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 8,
            padding: 3,
            gap: 3,
          }}>
            {[
              { id: 'diagram', label: 'ERD Visualizer', icon: TableIcon },
              { id: 'sql', label: 'PostgreSQL DDL', icon: Database },
              { id: 'nestjs', label: 'NestJS Entities', icon: Code2 },
            ].map(t => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isActive ? '#1e293b' : 'transparent',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={13} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={copySql}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: copied ? '#4ade80' : '#f8fafc',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied DDL' : 'Copy DDL'}</span>
          </button>
        </div>
      </div>

      {/* PostgreSQL Connection & 3NF Compliance Banner */}
      <div style={{
        padding: '8px 20px',
        background: 'rgba(99, 102, 241, 0.08)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        fontSize: 12,
        color: '#a5b4fc',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '2px 8px',
            borderRadius: 6,
            background: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            fontWeight: 700,
            fontSize: 11,
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} className="bolt-pulse-dot" />
            PG Connected: bolt
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8', fontSize: 11 }}>
            postgresql://postgres:maaz@localhost:5432/bolt
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'auth', 'workspace', 'ai', 'deployment'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: selectedCategory === cat ? '#fff' : '#94a3b8',
                padding: '2px 8px',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content View */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {activeTab === 'diagram' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 20,
          }}>
            {filteredTables.map(table => (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table)}
                style={{
                  background: '#0f172a',
                  borderRadius: 12,
                  border: selectedTable?.id === table.id
                    ? '1px solid #38bdf8'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: selectedTable?.id === table.id
                    ? '0 0 20px rgba(56, 189, 248, 0.15)'
                    : '0 4px 14px rgba(0, 0, 0, 0.4)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Table Header */}
                <div style={{
                  padding: '10px 14px',
                  background: table.category === 'auth'
                    ? 'linear-gradient(135deg, #1e1b4b, #131d33)'
                    : table.category === 'ai'
                    ? 'linear-gradient(135deg, #064e3b, #0d1b2a)'
                    : table.category === 'deployment'
                    ? 'linear-gradient(135deg, #3b0764, #131d33)'
                    : 'linear-gradient(135deg, #1e293b, #0f172a)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TableIcon size={15} color="#38bdf8" />
                    <span style={{ fontWeight: 700, fontSize: 13, color: '#f8fafc' }}>
                      {table.name}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 10,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}>
                    {table.category}
                  </span>
                </div>

                {/* Table Columns */}
                <div style={{ padding: '8px 0' }}>
                  {table.columns.map(col => (
                    <div
                      key={col.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 14px',
                        fontSize: 12,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {col.isPrimary ? (
                          <span title="Primary Key" style={{ color: '#fbbf24' }}>
                            <Key size={12} />
                          </span>
                        ) : col.isForeign ? (
                          <span title={`Foreign Key -> ${col.foreignTable}`} style={{ color: '#38bdf8' }}>
                            <Link size={12} />
                          </span>
                        ) : (
                          <span style={{ width: 12, height: 12, display: 'inline-block' }} />
                        )}
                        <span style={{
                          color: col.isPrimary ? '#fbbf24' : col.isForeign ? '#38bdf8' : '#e2e8f0',
                          fontWeight: col.isPrimary || col.isForeign ? 600 : 400,
                        }}>
                          {col.name}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: '#94a3b8',
                        }}>
                          {col.type}
                        </span>
                        {!col.isNullable && (
                          <span style={{ fontSize: 9, color: '#f87171', fontWeight: 700 }}>
                            NN
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer info */}
                <div style={{
                  padding: '8px 14px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                  fontSize: 11,
                  color: '#64748b',
                }}>
                  {table.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sql' && (
          <div style={{
            background: '#0d1117',
            borderRadius: 12,
            padding: 20,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.6,
            color: '#38bdf8',
            overflowX: 'auto',
          }}>
            <pre style={{ margin: 0 }}>
              <code>{SQL_DDL_3NF}</code>
            </pre>
          </div>
        )}

        {activeTab === 'nestjs' && (
          <div style={{
            background: '#0d1117',
            borderRadius: 12,
            padding: 20,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.6,
            color: '#a5b4fc',
            overflowX: 'auto',
          }}>
            <pre style={{ margin: 0 }}>
              <code>{`// NestJS TypeORM Entity: User.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ default: 'developer' })
  role: string;

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  workspaces: Workspace[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}`}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

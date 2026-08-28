import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  RefreshCw,
  FolderPlus,
  FilePlus,
  Trash2,
} from 'lucide-react';
import { fileManager, type ProjectFile } from '../services/fileService';

interface FileExplorerProps {
  activeFile: string;
  onSelectFile: (filePath: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  files: ProjectFile[];
  onFileCreated?: (newFilePath: string) => void;
  onFileDeleted?: (deletedFilePath: string) => void;
}

export default function FileExplorer({
  activeFile,
  onSelectFile,
  searchQuery,
  onSearchChange,
  files,
  onFileCreated,
  onFileDeleted,
}: FileExplorerProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    src: true,
    'src/components': true,
    'src/app': true,
    'src/app/ide': true,
    'src/backend': true,
    'src/backend/entities': true,
    'src/backend/groq': true,
  });

  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const toggleFolder = (folderKey: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) {
      return <FileCode size={14} color="#38bdf8" />;
    }
    if (fileName.endsWith('.json')) {
      return <FileJson size={14} color="#fbbf24" />;
    }
    if (fileName.endsWith('.mjs') || fileName.endsWith('.js')) {
      return <FileText size={14} color="#f472b6" />;
    }
    if (fileName.endsWith('.css')) {
      return <FileCode size={14} color="#a78bfa" />;
    }
    return <FileCode size={14} color="#94a3b8" />;
  };

  const handleCreateNewFile = () => {
    if (!newFileName.trim()) {
      setIsCreatingFile(false);
      return;
    }
    const path = newFileName.startsWith('src/') ? newFileName : `src/${newFileName}`;
    const newFile = fileManager.setFile(
      path,
      `// ${newFileName}\nexport default function () {\n  return <div>New File</div>;\n}\n`,
    );
    setIsCreatingFile(false);
    setNewFileName('');
    onFileCreated?.(newFile.path);
    onSelectFile(newFile.path);
  };

  const isSearching = searchQuery.trim().length > 0;
  const filteredFiles = isSearching
    ? files.filter(f => f.path.toLowerCase().includes(searchQuery.toLowerCase()) || f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#0d131f',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      userSelect: 'none',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        padding: '12px 14px 10px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.01)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#94a3b8',
          }}>
            Workspace Explorer
          </span>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '1px 6px',
            borderRadius: 9999,
            background: 'rgba(56, 189, 248, 0.12)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}>
            {files.length} real files
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => setIsCreatingFile(true)}
            title="Create Real File"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 4,
              display: 'flex',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
          >
            <FilePlus size={14} />
          </button>
        </div>
      </div>

      {/* Filter search bar */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 6,
          padding: '4px 8px',
        }}>
          <Search size={13} color="#64748b" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search real workspace files..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: 12,
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>
      </div>

      {/* New file input bar */}
      {isCreatingFile && (
        <div style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', gap: 6 }}>
          <input
            autoFocus
            type="text"
            value={newFileName}
            onChange={e => setNewFileName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreateNewFile()}
            placeholder="e.g. src/components/Button.tsx"
            style={{
              flex: 1,
              background: '#090d16',
              border: '1px solid #6366f1',
              borderRadius: 4,
              color: '#fff',
              fontSize: 11,
              padding: '3px 6px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleCreateNewFile}
            style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Create
          </button>
        </div>
      )}

      {/* Tree list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}>
        {isSearching ? (
          <div>
            {filteredFiles.map(file => (
              <div
                key={file.path}
                onClick={() => onSelectFile(file.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: activeFile === file.path ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: activeFile === file.path ? '#38bdf8' : '#cbd5e1',
                  border: activeFile === file.path ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  fontSize: 12.5,
                  fontWeight: activeFile === file.path ? 600 : 400,
                  marginBottom: 2,
                }}
              >
                {getFileIcon(file.name)}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{file.name}</span>
                  <span style={{ fontSize: 10, color: '#64748b' }}>{file.path}</span>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#64748b' }}>
                  {file.size}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {files.map(file => {
              const isSelected = activeFile === file.path || activeFile === file.name;
              return (
                <div
                  key={file.path}
                  onClick={() => onSelectFile(file.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 8px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: isSelected ? '#38bdf8' : '#cbd5e1',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                    fontSize: 12.5,
                    fontWeight: isSelected ? 600 : 400,
                  }}
                  onMouseEnter={e => !isSelected && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)')}
                  onMouseLeave={e => !isSelected && (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {getFileIcon(file.name)}
                    <span>{file.path}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    {file.lines}L
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom real file telemetry */}
      <div style={{
        padding: '10px 14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        fontSize: 11,
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 0, 0, 0.2)',
      }}>
        <span>Live VFS: <strong style={{ color: '#4ade80' }}>Synced</strong></span>
        <span style={{ color: '#38bdf8' }}>localStorage</span>
      </div>
    </div>
  );
}

import { auth, WebContainer, type FileSystemTree } from '@webcontainer/api';

// Initialize WebContainer authentication from environment
const CLIENT_ID = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_WEBCONTAINER_CLIENT_ID) ||
  'wc_api_drtoolofficial_1237199fc840517b0d4c4f1ae667c192';

try {
  auth.init({
    clientId: CLIENT_ID,
    scope: '',
  });
} catch (e) {
  console.warn('WebContainer auth initialization:', e);
}

let webcontainerInstance: WebContainer | null = null;
let isBooting = false;
let bootListeners: Array<(instance: WebContainer) => void> = [];
let serverUrl: string | null = null;
let serverReadyListeners: Array<(url: string) => void> = [];

export async function getWebContainer(): Promise<WebContainer> {
  if (webcontainerInstance) return webcontainerInstance;

  if (isBooting) {
    return new Promise(resolve => {
      bootListeners.push(resolve);
    });
  }

  isBooting = true;
  try {
    webcontainerInstance = await WebContainer.boot();

    // Listen for WebContainer server-ready events
    webcontainerInstance.on('server-ready', (port, url) => {
      console.log(`[WebContainer] Dev Server Ready on port ${port}: ${url}`);
      serverUrl = url;
      serverReadyListeners.forEach(listener => listener(url));
    });

    bootListeners.forEach(listener => listener(webcontainerInstance!));
    bootListeners = [];
    isBooting = false;
    return webcontainerInstance;
  } catch (error) {
    isBooting = false;
    console.error('Failed to boot WebContainer:', error);
    throw error;
  }
}

export function onWebContainerServerReady(callback: (url: string) => void) {
  if (serverUrl) {
    callback(serverUrl);
  }
  serverReadyListeners.push(callback);
}

export function convertToFileSystemTree(files: Record<string, string>): FileSystemTree {
  const tree: FileSystemTree = {};

  Object.entries(files).forEach(([filePath, content]) => {
    const parts = filePath.split('/');
    let currentDir = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!currentDir[part]) {
        currentDir[part] = { directory: {} };
      }
      currentDir = (currentDir[part] as any).directory;
    }

    const fileName = parts[parts.length - 1];
    currentDir[fileName] = {
      file: {
        contents: content,
      },
    };
  });

  return tree;
}

// Incremental single-file write to WebContainer (triggers instant Vite HMR)
export async function syncFileToWebContainer(filePath: string, content: string): Promise<void> {
  if (!webcontainerInstance) return;
  try {
    const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    
    // Ensure parent directories exist
    const parts = cleanPath.split('/').filter(Boolean);
    if (parts.length > 1) {
      let cur = '';
      for (let i = 0; i < parts.length - 1; i++) {
        cur += `/${parts[i]}`;
        try {
          await webcontainerInstance.fs.mkdir(cur, { recursive: true });
        } catch (e) {}
      }
    }

    await webcontainerInstance.fs.writeFile(cleanPath, content);
  } catch (err) {
    console.warn(`[WebContainer] Failed to write file ${filePath}:`, err);
  }
}

// Full workspace mount
export async function mountWorkspaceFiles(filesMap: Record<string, string>, instance?: WebContainer): Promise<void> {
  const wc = instance || (await getWebContainer());
  const tree = convertToFileSystemTree(filesMap);
  await wc.mount(tree);
}

// Real subprocess runner
export async function runWebContainerProcess(
  cmd: string,
  args: string[] = [],
  onData?: (data: string) => void,
): Promise<{ exitCode: number }> {
  const wc = await getWebContainer();
  const process = await wc.spawn(cmd, args);

  if (onData) {
    process.output.pipeTo(
      new WritableStream({
        write(data) {
          onData(data);
        },
      }),
    );
  }

  const exitCode = await process.exit;
  return { exitCode };
}

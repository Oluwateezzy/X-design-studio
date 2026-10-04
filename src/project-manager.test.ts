import Module from 'node:module';

// ─── 1. Register Mock 'vscode' Module for Standalone Node Testing ────────
const inMemoryFs = new Map<string, string>();
const createdDirs = new Set<string>();

const mockVscodeFs: any = {
  createDirectory: async (uri: any) => {
    createdDirs.add(uri.path);
  },
  readFile: async (uri: any) => {
    const content = inMemoryFs.get(uri.path);
    if (content === undefined) {
      const err: any = new Error('File Not Found');
      err.code = 'FileNotFound';
      throw err;
    }
    return Buffer.from(content, 'utf8');
  },
  writeFile: async (uri: any, content: Uint8Array) => {
    inMemoryFs.set(uri.path, Buffer.from(content).toString('utf8'));
  },
  delete: async (uri: any) => {
    let deletedAny = false;
    for (const key of Array.from(inMemoryFs.keys())) {
      if (key === uri.path || key.startsWith(uri.path + '/')) {
        inMemoryFs.delete(key);
        deletedAny = true;
      }
    }
    for (const dir of Array.from(createdDirs.values())) {
      if (dir === uri.path || dir.startsWith(uri.path + '/')) {
        createdDirs.delete(dir);
        deletedAny = true;
      }
    }
    if (!deletedAny) {
      const err: any = new Error('File Not Found');
      err.code = 'FileNotFound';
      throw err;
    }
  },
  readDirectory: async (uri: any) => {
    const parentPath = uri.path;
    const entries: [string, number][] = [];
    const seen = new Set<string>();

    for (const key of inMemoryFs.keys()) {
      if (key.startsWith(parentPath + '/')) {
        const sub = key.slice(parentPath.length + 1);
        const name = sub.split('/')[0];
        if (!seen.has(name)) {
          seen.add(name);
          entries.push([name, 2 /* FileType.Directory */]);
        }
      }
    }
    return entries;
  },
  stat: async (uri: any) => {
    if (inMemoryFs.has(uri.path) || createdDirs.has(uri.path)) {
      return { type: 1 };
    }
    const err: any = new Error('File Not Found');
    err.code = 'FileNotFound';
    throw err;
  },
};

class FileSystemErrorMock extends Error {
  code: string;
  constructor(message?: string) {
    super(message);
    this.code = 'FileNotFound';
  }
}

const vscodeMock = {
  workspace: {
    fs: mockVscodeFs,
    findFiles: async (pattern: string) => {
      const results: any[] = [];
      for (const pathKey of inMemoryFs.keys()) {
        if (pathKey.endsWith('/project.json')) {
          results.push({ path: pathKey, scheme: 'file', toString: () => pathKey });
        }
      }
      return results;
    },

  },
  Uri: {
    joinPath: (base: any, ...segments: string[]) => {
      const raw = [base.path, ...segments].join('/');
      const parts: string[] = [];
      for (const part of raw.split('/')) {
        if (part === '' || part === '.') continue;
        if (part === '..') {
          parts.pop();
        } else {
          parts.push(part);
        }
      }
      const joined = '/' + parts.join('/');
      return {
        path: joined,
        scheme: 'file',
        toString: () => joined,
      };
    },
    file: (pathStr: string) => ({
      path: pathStr,
      scheme: 'file',
      toString: () => pathStr,
    }),
    parse: (uriStr: string) => ({
      path: uriStr.replace(/^file:\/\//, ''),
      scheme: 'file',
      toString: () => uriStr,
    }),
  },

  FileType: {
    File: 1,
    Directory: 2,
  },
  FileSystemError: FileSystemErrorMock,
};

// Hook into CommonJS module resolution for 'vscode' BEFORE requiring ProjectManager
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string) {
  if (id === 'vscode') {
    return vscodeMock;
  }
  return originalRequire.apply(this, arguments as any);
};

// ─── 2. Require Modules ───────────────────────────────────────────────────
const { FileSystemStorage } = require('./storage/file-system-storage.ts');
const { ProjectManager, ACTIVE_PROJECT_STATE_KEY } = require('./project-manager.ts');

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertNotNull<T>(value: T | null | undefined, message: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`Assertion Failed (${message}): expected non-null value`);
  }
}

// Mock Memento for vscode.globalState
class MockMemento {
  private store = new Map<string, any>();
  get<T>(key: string, defaultValue?: T): T | undefined {
    return this.store.has(key) ? this.store.get(key) : defaultValue;
  }
  async update(key: string, value: any): Promise<void> {
    if (value === undefined) {
      this.store.delete(key);
    } else {
      this.store.set(key, value);
    }
  }
}

console.log('Testing ProjectManager Service (Task 3.1)...');

async function runProjectManagerTests() {
  const workspaceRoot = { path: '/workspace/my-design-system', scheme: 'file' } as any;
  const storage = new FileSystemStorage(workspaceRoot);
  const memento = new MockMemento() as any;
  const pm = new ProjectManager(storage, memento, workspaceRoot);

  // Test 1: createProject() creates full directory structure and valid manifest
  const manifest = await pm.createProject({
    name: 'Acme Design System',
    description: 'Design tokens & components for Acme SaaS product',
    source: { type: 'scratch' },
  });

  assertEqual(manifest.name, 'Acme Design System', 'Manifest name correct');
  assertEqual(manifest.slug, 'acme-design-system', 'Manifest slug generated');
  assertEqual(manifest.version, '2.0.0', 'Manifest version is 2.0.0');
  assertEqual(manifest.creationSource.type, 'scratch', 'Manifest creationSource type correct');


  // Verify created files in inMemoryFs
  const projectDirStr = '/workspace/my-design-system/.x-design-system';
  assertEqual(inMemoryFs.has(`${projectDirStr}/project.json`), true, 'project.json written');
  assertEqual(inMemoryFs.has(`${projectDirStr}/global/theme.json`), true, 'global/theme.json written');
  assertEqual(inMemoryFs.has(`${projectDirStr}/global/global.design.md`), true, 'global/global.design.md written');
  assertEqual(inMemoryFs.has(`${projectDirStr}/global/global.preview.html`), true, 'global/global.preview.html written');
  assertEqual(inMemoryFs.has(`${projectDirStr}/pages/landing/page.json`), true, 'pages/landing/page.json written');

  // Verify default components created (hero, card, button, badge, table, nav)
  const expectedComponentSlugs = ['hero-section', 'feature-card', 'action-button', 'status-badge', 'data-table', 'navbar'];
  for (const slug of expectedComponentSlugs) {
    assertEqual(inMemoryFs.has(`${projectDirStr}/components/${slug}/component.json`), true, `components/${slug}/component.json created`);
    assertEqual(inMemoryFs.has(`${projectDirStr}/components/${slug}/component.html`), true, `components/${slug}/component.html created`);
  }
  console.log('✔ createProject() produced complete folder tree & valid manifest');

  // Test 2: openProject() loads full project state
  const loaded = await pm.openProject(workspaceRoot);
  assertNotNull(loaded, 'openProject returns loaded project');
  assertEqual(loaded.manifest.name, 'Acme Design System', 'Loaded manifest name matches');
  assertEqual(loaded.globalTheme.version, 2, 'Loaded global theme is V2');
  assertEqual(loaded.pages.length, 1, 'Loaded 1 default page');
  assertEqual(loaded.pages[0].slug, 'landing', 'Landing page slug matches');
  assertEqual(loaded.components.length, 6, 'Loaded 6 default components');
  console.log('✔ openProject() loads manifest, theme, pages, and components');

  // Test 3: getActiveProject() & setActiveProject()
  const activeProject = await pm.getActiveProject();
  assertNotNull(activeProject, 'getActiveProject returns current active project');
  assertEqual(activeProject.manifest.slug, 'acme-design-system', 'Active project slug matches');
  console.log('✔ getActiveProject() & setActiveProject() tracking verified');

  // Test 4: listProjects() finds workspace projects
  const projectSummaries = await pm.listProjects();
  assertEqual(projectSummaries.length, 1, 'listProjects finds 1 project');
  assertEqual(projectSummaries[0].manifest.slug, 'acme-design-system', 'Summary slug matches');
  console.log('✔ listProjects() finds .x-design-system/ directories in workspace');

  // Test 5: deleteProject()
  await pm.deleteProject(workspaceRoot);
  const deletedActive = await pm.getActiveProject();
  assertEqual(deletedActive, null, 'getActiveProject returns null after project deletion');
  console.log('✔ deleteProject() removes directory and resets active project state');

  console.log('\nAll Task 3.1 ProjectManager tests passed successfully!');
}

runProjectManagerTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

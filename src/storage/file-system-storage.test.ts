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
          results.push({ path: pathKey, scheme: 'file' });
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
  },

  FileType: {
    File: 1,
    Directory: 2,
  },
  FileSystemError: FileSystemErrorMock,
};

// Hook into CommonJS module resolution for 'vscode' BEFORE requiring file-system-storage
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string) {
  if (id === 'vscode') {
    return vscodeMock;
  }
  return originalRequire.apply(this, arguments as any);
};

// ─── 2. Require FileSystemStorage after registering module hook ──────────
const { FileSystemStorage } = require('./file-system-storage.ts');

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

console.log('Testing FileSystemStorage CRUD, directory auto-creation, malformed JSON, and discovery...');

const storage = new FileSystemStorage();

// Test 1: getProjectUri normalization
const mockUri1 = { path: '/workspace/my-app', scheme: 'file' } as any;
const mockUri2 = { path: '/workspace/my-app/.x-design-system', scheme: 'file' } as any;

const projUri1 = storage.getProjectUri(mockUri1);
assertEqual(projUri1.path, '/workspace/my-app/.x-design-system', 'getProjectUri appends .x-design-system');

const projUri2 = storage.getProjectUri(mockUri2);
assertEqual(projUri2.path, '/workspace/my-app/.x-design-system', 'getProjectUri preserves existing .x-design-system');

console.log('✔ getProjectUri normalization tests passed');

async function runStorageTests() {
  const rootDir = { path: '/workspace/demo-app', scheme: 'file' } as any;

  // 1. Write and read ProjectManifest
  const sampleManifest: any = {
    name: 'Demo System',
    slug: 'demo-system',
    description: 'Storage layer test manifest',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0',
    creationSource: { type: 'scratch' },
    globalThemeId: 'theme-1',
    pages: ['index'],
    components: ['hero-banner'],
  };

  await storage.writeProjectManifest(rootDir, sampleManifest);
  const readManifest = await storage.readProjectManifest(rootDir);
  assertNotNull(readManifest, 'Read ProjectManifest non-null');
  assertEqual(readManifest.name, 'Demo System', 'ProjectManifest name match');

  // 2. ProjectExists check
  const exists = await storage.projectExists(rootDir);
  assertEqual(exists, true, 'projectExists returns true after writing manifest');

  // 3. Write and read PageConfig
  const samplePage: any = {
    slug: 'index',
    name: 'Index Page',
    description: 'Main landing page',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    overrides: {},
    components: [{ slug: 'hero-banner' }],
  };

  await storage.writePageConfig(rootDir, 'index', samplePage);
  const readPage = await storage.readPageConfig(rootDir, 'index');
  assertNotNull(readPage, 'Read PageConfig non-null');
  assertEqual(readPage.name, 'Index Page', 'PageConfig name match');

  const pageList = await storage.listPages(rootDir);
  assertEqual(pageList.includes('index'), true, 'listPages includes index');

  // 4. Write and read ComponentConfig & ComponentHtml
  const sampleComp: any = {
    slug: 'hero-banner',
    name: 'Hero Banner',
    category: 'hero',
    description: 'Main hero component',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tokens: {},
    transitions: [],
  };

  await storage.writeComponentConfig(rootDir, 'hero-banner', sampleComp);
  await storage.writeComponentHtml(rootDir, 'hero-banner', '<section class="hero"><h1>Hero</h1></section>');

  const readComp = await storage.readComponentConfig(rootDir, 'hero-banner');
  assertNotNull(readComp, 'Read ComponentConfig non-null');
  assertEqual(readComp.name, 'Hero Banner', 'ComponentConfig name match');

  const readHtml = await storage.readComponentHtml(rootDir, 'hero-banner');
  assertEqual(readHtml, '<section class="hero"><h1>Hero</h1></section>', 'Component HTML string match');

  const compList = await storage.listComponents(rootDir);
  assertEqual(compList.includes('hero-banner'), true, 'listComponents includes hero-banner');

  // 5. Malformed JSON handling
  inMemoryFs.set('/workspace/demo-app/.x-design-system/pages/bad-page/page.json', '{ bad json ...');
  const badPage = await storage.readPageConfig(rootDir, 'bad-page');
  assertEqual(badPage, null, 'Malformed JSON returns null without crashing');

  // 6. Missing file handling
  const missingPage = await storage.readPageConfig(rootDir, 'non-existent-page');
  assertEqual(missingPage, null, 'Missing file returns null');

  // 7. Delete operations
  await storage.deletePageDir(rootDir, 'index');
  const deletedPage = await storage.readPageConfig(rootDir, 'index');
  assertEqual(deletedPage, null, 'Deleted page returns null');

  // 8. Find projects discovery
  const foundProjects = await storage.findProjects();
  assertEqual(foundProjects.length >= 1, true, 'findProjects finds project directory');

  console.log('✔ All FileSystemStorage CRUD and error handling tests passed successfully!');
}

runStorageTests()
  .catch((err) => {
    console.error('Test failed:', err);
    process.exit(1);
  });

import Module from 'node:module';

// ─── 1. Register Mock 'vscode' Module for Standalone Node Testing ────────
const inMemoryFs = new Map<string, string>();

const mockVscodeFs: any = {
  readFile: async (uri: any) => {
    const content = inMemoryFs.get(uri.path);
    if (content === undefined) {
      const err: any = new Error('File Not Found');
      err.code = 'FileNotFound';
      throw err;
    }
    return Buffer.from(content, 'utf8');
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
          const isFile = !key.slice(parentPath.length + 1).includes('/');
          entries.push([name, isFile ? 1 /* FileType.File */ : 2 /* FileType.Directory */]);
        }
      }
    }
    return entries;
  },
};

const vscodeMock = {
  workspace: {
    fs: mockVscodeFs,
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
};

// Hook into CommonJS module resolution for 'vscode' BEFORE requiring ImportService
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string) {
  if (id === 'vscode') {
    return vscodeMock;
  }
  return originalRequire.apply(this, arguments as any);
};

// ─── 2. Require ImportService ─────────────────────────────────────────────
const { ImportService } = require('./import-service.ts');

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

console.log('Testing ImportService Codebase Parser (Task 3.3)...');

async function runImportServiceTests() {
  const importer = new ImportService();
  const sampleFolder = { path: '/projects/my-app', scheme: 'file' } as any;

  // Populate mock filesystem with CSS, Tailwind Config, and HTML Font Link
  inMemoryFs.set(
    '/projects/my-app/styles/global.css',
    `:root {
  --primary: #3B82F6;
  --secondary: #1E3A8A;
  --bg: #0B0F19;
  --text: #F9FAFB;
  --custom-glow-token: #FF0055;
}`
  );

  inMemoryFs.set(
    '/projects/my-app/tailwind.config.js',
    `module.exports = {
  theme: {
    extend: {
      colors: {
        accent: '#10B981',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
};`
  );

  inMemoryFs.set(
    '/projects/my-app/index.html',
    `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body></body>
</html>`
  );

  // Test 1: importFromCodebase()
  const result = await importer.importFromCodebase(sampleFolder);

  assertEqual(result.success, true, 'Codebase import success is true');
  assertNotNull(result.theme, 'Extracted theme is non-null');

  // Validation Criterion 1: CSS variable --primary: #3B82F6 extracts colors.primary.hex = '#3B82F6'
  assertEqual(result.theme.colors.primary.hex, '#3B82F6', 'Extracted colors.primary.hex matches #3B82F6');
  assertEqual(result.theme.colors.secondary.hex, '#1E3A8A', 'Extracted colors.secondary.hex matches #1E3A8A');
  assertEqual(result.theme.colors.bg.hex, '#0B0F19', 'Extracted colors.bg.hex matches #0B0F19');
  assertEqual(result.theme.colors.text.hex, '#F9FAFB', 'Extracted colors.text.hex matches #F9FAFB');
  console.log('✔ Scanning CSS file with --primary: #3B82F6 extracts colors.primary.hex = "#3B82F6"');

  // Validation Criterion 2: Tailwind config extracts color & fontFamily values
  assertEqual(result.theme.colors.accent.hex, '#10B981', 'Extracted Tailwind accent color matches #10B981');
  assertEqual(result.theme.typography.fontName, 'Outfit', 'Extracted Google Font name matches Outfit');
  console.log('✔ Scanning Tailwind config & HTML links extracts colors and Google Fonts');

  // Validation Criterion 3: Missing tokens get sensible defaults from preset theme
  assertNotNull(result.theme.colors.cta.hex, 'Unspecified cta token has sensible default');
  assertNotNull(result.theme.colors.semantic.success.hex, 'Unspecified success token has sensible default');
  console.log('✔ Missing tokens receive sensible defaults (not left empty)');

  // Validation Criterion 4: Warnings list unrecognized variables
  const hasCustomWarning = result.warnings.some((w: string) => w.includes('custom-glow-token'));
  assertEqual(hasCustomWarning, true, 'Unmapped CSS variable added to warnings');
  console.log('✔ Warnings list unrecognized variables for user review');

  // Validation Criterion 5: Real-world CSS file parser test without crashing
  const complexCss = `
    /* Real-World CSS file test */
    :root {
      --color-primary: #0066CC;
      --color-background: #121212;
      --card-bg: #1E1E1E;
      --surface-border: #333333;
      --danger: #FF3333;
      --unrecognized-1: #112233;
    }
  `;
  const parsedColors: Record<string, string> = {};
  const dummyWarnings: string[] = [];
  importer.extractCssVariables(complexCss, parsedColors, dummyWarnings);
  assertEqual(parsedColors['primary'], '#0066CC', 'Extracted --color-primary');
  assertEqual(parsedColors['background'], '#121212', 'Extracted --color-background');
  assertEqual(parsedColors['card-bg'], '#1E1E1E', 'Extracted --card-bg');
  console.log('✔ Real-world CSS file parser executed without crashing');

  console.log('\nAll Task 3.3 ImportService unit tests passed successfully!');
}

runImportServiceTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

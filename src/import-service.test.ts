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
  // Task 3.4 URL Importer Tests
  console.log('Testing ImportService URL Parser (Task 3.4)...');

  // Test 1: Invalid URL handling
  const invalidUrlResult = await importer.importFromUrl('not-a-valid-url-format:::');
  assertEqual(invalidUrlResult.success, false, 'Invalid URL returns success: false');
  assertEqual(invalidUrlResult.errors.length > 0, true, 'Invalid URL returns descriptive error');
  console.log('✔ Invalid URL returns descriptive error message');

  // Test 2: Empty URL handling
  const emptyUrlResult = await importer.importFromUrl('');
  assertEqual(emptyUrlResult.success, false, 'Empty URL returns success: false');
  console.log('✔ Empty URL returns error message');

  // Task 3.5 Design-MD Parser Tests
  console.log('\nTesting ImportService Design-MD Parser (Task 3.5)...');

  // Test 1: X Design System generated .design.md file reproduction
  inMemoryFs.set(
    '/projects/my-app/system.design.md',
    `# Theme Specification: Cyberpunk Neon (Theme #4)

**Category**: Cyberpunk  
**Brand Personality**: High contrast neon cyberpunk design system  
**Typography**: Google Font **Outfit** (\`font-family: 'Outfit', sans-serif\`)  

---

## 1. Typography & Google Fonts Setup

<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">

---

## 2. Color Palette Tokens (V2 System)

| Token Name | Hex Value | HSL Value | Target Usage |
| :--- | :--- | :--- | :--- |
| **Background (\`--theme-bg\`)** | \`#0B0F19\` | \`hsl(222, 38%, 7%)\` | Main app background |
| **Primary (\`--theme-primary\`)** | \`#00F0FF\` | \`hsl(184, 100%, 50%)\` | Primary brand background |
| **Secondary (\`--theme-secondary\`)** | \`#7000FF\` | - | Secondary actions |
| **Accent (\`--theme-accent\`)** | \`#FF007A\` | \`hsl(331, 100%, 50%)\` | Hero text highlight |

---

## 4. CSS Custom Variables & Keyframe Motion Directives

\`\`\`css
:root {
  --theme-font: 'Outfit', sans-serif;
  --theme-bg: #0B0F19;
  --theme-primary: #00F0FF;
  --theme-secondary: #7000FF;
  --theme-accent: #FF007A;
  --theme-card-bg: #161B26;
  --theme-card-border: #262F40;
  --theme-text-color: #F3F4F6;
  --theme-muted-text: #9CA3AF;
  --theme-badge-bg: #161B26;
  --theme-badge-border: #00F0FF;
  --theme-badge-text: #00F0FF;
}
\`\`\`
`
  );

  const xDesignMdFileUri = { path: '/projects/my-app/system.design.md', fsPath: '/projects/my-app/system.design.md', scheme: 'file' } as any;
  const xDesignResult = await importer.importFromDesignMd(xDesignMdFileUri);

  assertEqual(xDesignResult.success, true, 'X Design System MD import succeeds');
  assertNotNull(xDesignResult.theme, 'Extracted theme is non-null');
  assertEqual(xDesignResult.theme.name, 'Cyberpunk Neon', 'Theme name reproduced correctly');
  assertEqual(xDesignResult.theme.category, 'Cyberpunk', 'Theme category reproduced correctly');
  assertEqual(xDesignResult.theme.typography.fontName, 'Outfit', 'Font name reproduced correctly');
  assertEqual(xDesignResult.theme.colors.bg.hex, '#0B0F19', 'Background color hex reproduced');
  assertEqual(xDesignResult.theme.colors.primary.hex, '#00F0FF', 'Primary color hex reproduced');
  assertEqual(xDesignResult.theme.colors.secondary.hex, '#7000FF', 'Secondary color hex reproduced');
  assertEqual(xDesignResult.theme.colors.accent.hex, '#FF007A', 'Accent color hex reproduced');
  console.log('✔ Importing an X Design System-generated .design.md file reproduces the original theme');

  // Test 2: Generic Markdown with CSS Variables
  inMemoryFs.set(
    '/projects/my-app/generic-theme.md',
    `# Simple Theme
Here are our variables:
\`\`\`css
:root {
  --primary: #10B981;
  --bg: #18181B;
}
\`\`\`
`
  );

  const genericMdFileUri = { path: '/projects/my-app/generic-theme.md', fsPath: '/projects/my-app/generic-theme.md', scheme: 'file' } as any;
  const genericResult = await importer.importFromDesignMd(genericMdFileUri);

  assertEqual(genericResult.success, true, 'Generic MD import succeeds');
  assertNotNull(genericResult.theme, 'Generic theme is non-null');
  assertEqual(genericResult.theme.colors.primary.hex, '#10B981', 'Generic primary color extracted');
  assertEqual(genericResult.theme.colors.bg.hex, '#18181B', 'Generic background color extracted');
  console.log('✔ Importing generic markdown with CSS variables extracts tokens');

  // Test 3: Markdown without recognizable tokens
  inMemoryFs.set(
    '/projects/my-app/notes.md',
    `# Team Meeting Notes
- Discussed application flow
- Decided to review styles later
`
  );

  const tokenlessMdFileUri = { path: '/projects/my-app/notes.md', fsPath: '/projects/my-app/notes.md', scheme: 'file' } as any;
  const tokenlessResult = await importer.importFromDesignMd(tokenlessMdFileUri);

  assertEqual(tokenlessResult.success, false, 'Tokenless MD import returns success: false');
  assertEqual(tokenlessResult.errors.length > 0, true, 'Tokenless MD import returns error message');
  console.log('✔ Files without recognisable tokens return success: false with descriptive errors');

  // Test 4: Non-markdown file graceful rejection
  const nonMdFileUri = { path: '/projects/my-app/hero.png', fsPath: '/projects/my-app/hero.png', scheme: 'file' } as any;
  const nonMdResult = await importer.importFromDesignMd(nonMdFileUri);

  assertEqual(nonMdResult.success, false, 'Non-MD file import returns success: false');
  assertEqual(nonMdResult.errors[0].includes('Invalid file type'), true, 'Non-MD file returns descriptive type error');
  console.log('✔ Non-markdown files are rejected gracefully');

  console.log('\nAll Task 3.3, 3.4, and 3.5 ImportService unit tests passed successfully!');
}

runImportServiceTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});



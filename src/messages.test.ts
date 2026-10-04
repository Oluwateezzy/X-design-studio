import {
  isV2WebviewMessage,
  isV2ExtensionMessage,
  isV2Message,
  WebviewToExtensionMessageV2,
  ExtensionToWebviewMessageV2,
} from './messages.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('Testing V2 Message Protocol & Type Guards (Task 2.4)...');

// Test 1: V2 Webview Message Discrimination
const v2WebviewMsgs: WebviewToExtensionMessageV2[] = [
  { type: 'createProject', name: 'App', description: 'Test App', source: { type: 'scratch' } },
  { type: 'openProject', projectPath: '/path/to/project' },
  { type: 'listProjects' },
  { type: 'saveGlobalTheme', theme: { version: 2, colors: {} } as any },
  { type: 'createPage', name: 'Home', description: 'Landing page' },
  { type: 'savePage', slug: 'home', config: { slug: 'home', name: 'Home' } as any },
  { type: 'deletePage', slug: 'home' },
  { type: 'getPage', slug: 'home' },
  { type: 'listPages' },
  { type: 'createComponent', name: 'Hero', category: 'hero', description: 'Hero banner' },
  { type: 'saveComponent', slug: 'hero', config: { slug: 'hero', name: 'Hero' } as any, html: '<div>Hero</div>' },
  { type: 'deleteComponent', slug: 'hero' },
  { type: 'getComponent', slug: 'hero' },
  { type: 'listComponents' },
  { type: 'regenerateFiles', target: 'global' },
  { type: 'importFromSource', sourceType: 'codebase', source: './src' },
];

for (const msg of v2WebviewMsgs) {
  assertEqual(isV2WebviewMessage(msg), true, `isV2WebviewMessage identifies ${msg.type}`);
  assertEqual(isV2Message(msg), true, `isV2Message identifies ${msg.type}`);
  assertEqual(isV2ExtensionMessage(msg), false, `isV2ExtensionMessage rejects webview msg ${msg.type}`);
}
console.log('✔ All 16 V2 Webview message types validated');

// Test 2: V2 Extension Message Discrimination
const v2ExtensionMsgs: ExtensionToWebviewMessageV2[] = [
  { type: 'projectList', projects: [] },
  { type: 'projectLoaded', manifest: {} as any, theme: {} as any, pages: [], components: [] },
  { type: 'pageLoaded', config: {} as any, resolvedTheme: {} as any },
  { type: 'componentLoaded', config: {} as any, html: '<div>Component</div>' },
  { type: 'pageList', pages: [] },
  { type: 'componentList', components: [] },
  { type: 'importResult', success: true },
  { type: 'filesRegenerated', target: 'global', success: true },
];

for (const msg of v2ExtensionMsgs) {
  assertEqual(isV2ExtensionMessage(msg), true, `isV2ExtensionMessage identifies ${msg.type}`);
  assertEqual(isV2Message(msg), true, `isV2Message identifies ${msg.type}`);
  assertEqual(isV2WebviewMessage(msg), false, `isV2WebviewMessage rejects extension msg ${msg.type}`);
}
console.log('✔ All 8 V2 Extension message types validated');

// Test 3: V1 Message rejection by V2 type guards
const v1Msgs = [
  { type: 'exportFile', fileName: 'test.html', content: '...', format: 'html' },
  { type: 'copyToClipboard', text: 'hello' },
  { type: 'saveThemeState', theme: {} },
  { type: 'fetchGoogleFonts' },
  { type: 'restoreState' },
  { type: 'fileSaved', fileName: 'a.txt', success: true },
];

for (const msg of v1Msgs) {
  assertEqual(isV2WebviewMessage(msg), false, `isV2WebviewMessage rejects V1 ${msg.type}`);
  assertEqual(isV2ExtensionMessage(msg), false, `isV2ExtensionMessage rejects V1 ${msg.type}`);
  assertEqual(isV2Message(msg), false, `isV2Message rejects V1 ${msg.type}`);
}
console.log('✔ V1 messages correctly rejected by V2 type guards');

// Test 4: Exhaustive Switch Statement Check for WebviewToExtensionMessageV2
function handleWebviewV2Message(msg: WebviewToExtensionMessageV2): string {
  switch (msg.type) {
    case 'createProject': return 'createProject';
    case 'openProject': return 'openProject';
    case 'listProjects': return 'listProjects';
    case 'saveGlobalTheme': return 'saveGlobalTheme';
    case 'createPage': return 'createPage';
    case 'savePage': return 'savePage';
    case 'deletePage': return 'deletePage';
    case 'getPage': return 'getPage';
    case 'listPages': return 'listPages';
    case 'createComponent': return 'createComponent';
    case 'saveComponent': return 'saveComponent';
    case 'deleteComponent': return 'deleteComponent';
    case 'getComponent': return 'getComponent';
    case 'listComponents': return 'listComponents';
    case 'regenerateFiles': return 'regenerateFiles';
    case 'importFromSource': return 'importFromSource';
  }
}

for (const msg of v2WebviewMsgs) {
  assertEqual(handleWebviewV2Message(msg), msg.type, `Exhaustive switch handled ${msg.type}`);
}
console.log('✔ Exhaustive switch handling for V2 Webview messages verified');

// Test 5: Exhaustive Switch Statement Check for ExtensionToWebviewMessageV2
function handleExtensionV2Message(msg: ExtensionToWebviewMessageV2): string {
  switch (msg.type) {
    case 'projectList': return 'projectList';
    case 'projectLoaded': return 'projectLoaded';
    case 'pageLoaded': return 'pageLoaded';
    case 'componentLoaded': return 'componentLoaded';
    case 'pageList': return 'pageList';
    case 'componentList': return 'componentList';
    case 'importResult': return 'importResult';
    case 'filesRegenerated': return 'filesRegenerated';
  }
}

for (const msg of v2ExtensionMsgs) {
  assertEqual(handleExtensionV2Message(msg), msg.type, `Exhaustive switch handled ${msg.type}`);
}
console.log('✔ Exhaustive switch handling for V2 Extension messages verified');

console.log('\nAll Task 2.4 Message Protocol V2 tests passed successfully!');

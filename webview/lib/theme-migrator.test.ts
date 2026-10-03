import { colorTokenToCss } from './types/color-token.js';
import { PRESET_THEMES } from './themes-dataset.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log(`Testing validation of all ${PRESET_THEMES.length} V2 preset themes...`);
let validationCount = 0;

for (const theme of PRESET_THEMES) {
  assertEqual(theme.version, 2, `theme ${theme.id} version`);
  assertEqual(typeof theme.id, 'string', `theme ${theme.id} id`);
  assertEqual(typeof theme.colors.primary.hex, 'string', `theme ${theme.id} primary hex`);
  assertEqual(theme.colors.cta.gradient !== null, true, `theme ${theme.id} cta gradient present`);

  // Verify CTA gradient CSS rendering works cleanly
  const css = colorTokenToCss(theme.colors.cta);
  assertEqual(css.startsWith('linear-gradient'), true, `theme ${theme.id} cta CSS gradient string`);
  validationCount++;
}

console.log(`✔ Successfully validated all ${validationCount} V2 preset themes!`);

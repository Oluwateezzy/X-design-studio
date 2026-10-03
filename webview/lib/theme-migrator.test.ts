import { migrateV1ToV2 } from './theme-migrator.js';
import { colorTokenToCss } from './types/color-token.js';
import { PRESET_THEMES } from './themes-dataset.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log(`Testing migration of all ${PRESET_THEMES.length} preset themes...`);
let migrationCount = 0;

for (const theme of PRESET_THEMES) {
  const v2 = migrateV1ToV2(theme);
  assertEqual(v2.version, 2, `theme ${theme.id} version`);
  assertEqual(v2.id, theme.id, `theme ${theme.id} id`);
  assertEqual(typeof v2.colors.primary.hex, 'string', `theme ${theme.id} primary hex`);
  assertEqual(v2.colors.cta.gradient !== null, true, `theme ${theme.id} cta gradient present`);

  // Verify CTA gradient CSS round-trip matches original btnGradient
  const css = colorTokenToCss(v2.colors.cta);
  assertEqual(css, theme.colors.btnGradient, `theme ${theme.id} btnGradient match`);
  migrationCount++;
}

console.log(`✔ Successfully migrated all ${migrationCount} preset themes!`);

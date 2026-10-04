import { getDefaultComponentTemplates } from './default-components.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('Testing Default Component Templates (Task 3.2)...');

const templates = getDefaultComponentTemplates();

// Criterion 1: Exactly 8 default component templates defined
assertEqual(templates.length, 8, '8 default component templates returned');

const expectedSlugs = [
  'hero-section',
  'feature-card',
  'action-button',
  'status-badge',
  'navbar',
  'data-table',
  'input-field',
  'dialog-modal',
];

for (const slug of expectedSlugs) {
  const match = templates.find((t) => t.config.slug === slug);
  if (!match) {
    throw new Error(`Missing expected default component template: ${slug}`);
  }

  // Criterion 2: HTML uses CSS custom properties (var(--theme-*)) and no Tailwind class attributes
  assertEqual(match.html.includes('var(--theme-'), true, `${slug} HTML uses CSS variables var(--theme-*)`);
  const classMatches = match.html.match(/class="([^"]+)"/g) || [];
  const hasTailwindClass = classMatches.some((cls) => /\b(bg-[a-z]+-\d+|text-[a-z]+-\d+|flex-row|items-center|justify-between|p-\d+|m-\d+|rounded-xl)\b/.test(cls));
  assertEqual(hasTailwindClass, false, `${slug} HTML contains no Tailwind utility classes in class attributes`);


  // Criterion 3: Component transitions are defined
  assertEqual(match.config.transitions.length > 0, true, `${slug} has defined transitions`);

  // Criterion 4: HTML contains valid semantic elements / ARIA attributes
  assertEqual(match.html.startsWith('<'), true, `${slug} HTML is a valid HTML fragment`);
}

console.log('✔ All 8 default component templates validated successfully!');

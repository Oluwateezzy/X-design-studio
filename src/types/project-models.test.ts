import {
  ComponentCategory,
  type ProjectManifest,
  type PageConfig,
  type ComponentConfig,
} from './index.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('Testing Project, Page, and Component data models...');

// Test 1: ProjectManifest
const sampleProject: ProjectManifest = {
  name: 'Fintech Escrow Portal',
  slug: 'fintech-escrow-portal',
  description: 'High-trust multi-sig escrow portal',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  version: '1.0.0',
  creationSource: {
    type: 'scratch',
  },
  globalThemeId: 'theme-1',
  pages: ['index', 'dashboard'],
  components: ['hero-banner', 'escrow-card'],
};

assertEqual(sampleProject.name, 'Fintech Escrow Portal', 'ProjectManifest name');
assertEqual(sampleProject.slug, 'fintech-escrow-portal', 'ProjectManifest slug');
assertEqual(sampleProject.creationSource.type, 'scratch', 'ProjectManifest creationSource type');
assertEqual(sampleProject.pages.length, 2, 'ProjectManifest pages count');
console.log('✔ ProjectManifest model tests passed');

// Test 2: PageConfig & PageComponentRef
const samplePage: PageConfig = {
  slug: 'index',
  name: 'Home Landing Page',
  description: 'Main escrow landing page',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  overrides: {
    colors: {
      primary: { hex: '#1E3A8A', gradient: null },
    },
  },
  components: [
    {
      slug: 'hero-banner',
      overrides: {
        colors: {
          accent: { hex: '#10B981', gradient: null },
        },
      },
    },
  ],
};

assertEqual(samplePage.slug, 'index', 'PageConfig slug');
assertEqual(samplePage.components[0].slug, 'hero-banner', 'PageComponentRef slug');
assertEqual(samplePage.overrides.colors?.primary?.hex, '#1E3A8A', 'PageConfig color override');
console.log('✔ PageConfig model tests passed');

// Test 3: ComponentConfig & ComponentCategory
const sampleComponent: ComponentConfig = {
  slug: 'hero-banner',
  name: 'Hero Banner Section',
  category: ComponentCategory.HERO,
  description: 'Main hero banner container with glowing ambient orbs',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  tokens: {
    motion: {
      enableAnimations: true,
      transitionDuration: '0.3s',
      transitionEasing: 'ease-in-out',
      enableGlowOrbs: true,
      enableBadgePulse: true,
      enableHoverLift: true,
    },
  },
  transitions: [
    {
      trigger: 'hover',
      property: 'transform',
      duration: '0.3s',
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  ],
};

assertEqual(sampleComponent.category, ComponentCategory.HERO, 'ComponentConfig category enum');
assertEqual(sampleComponent.transitions[0].trigger, 'hover', 'ComponentTransition trigger');
console.log('✔ ComponentConfig model tests passed');

console.log('\nAll Task 2.1 Data Model unit tests passed successfully!');

import { ComponentCategory } from '../types/component.js';
import type { ComponentConfig } from '../types/component.js';

export interface DefaultComponentTemplate {
  config: ComponentConfig;
  html: string;
}

/**
 * Returns the array of 8 default component templates for new projects:
 * 1. hero-section
 * 2. feature-card
 * 3. action-button
 * 4. status-badge
 * 5. navbar
 * 6. data-table
 * 7. input-field
 * 8. dialog-modal
 */
export function getDefaultComponentTemplates(timestamp: string = new Date().toISOString()): DefaultComponentTemplate[] {
  return [
    {
      config: {
        slug: 'hero-section',
        name: 'Hero Section',
        category: ComponentCategory.HERO,
        description: 'High-impact hero section with title, subtitle, CTA button, and hero glow.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'hover',
            property: 'transform',
            duration: '0.3s',
            easing: 'ease',
          },
        ],
      },
      html: `<section class="hero-section" style="padding: 4rem 2rem; text-align: center; background: var(--theme-bg); position: relative; overflow: hidden; border-radius: 12px; transition: transform 0.3s ease;">
  <div style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 300px; height: 300px; background: var(--theme-hero-glow1); filter: blur(80px); opacity: 0.5; pointer-events: none;"></div>
  <span class="badge" style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--theme-badge-bg); color: var(--theme-badge-text); border: 1px solid var(--theme-badge-border); border-radius: 9999px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem;">New Generation Studio</span>
  <h1 style="font-size: 3rem; font-weight: 800; color: var(--theme-text-color); margin-bottom: 1rem; line-height: 1.2;">Design Next-Gen Digital Products</h1>
  <p style="font-size: 1.25rem; color: var(--theme-muted-text); max-width: 600px; margin: 0 auto 2rem;">Build scalable, accessible, and stunning user interfaces with explicit theme token inheritance.</p>
  <div style="display: flex; gap: 1rem; justify-content: center; align-items: center;">
    <a href="#cta" style="padding: 0.875rem 2rem; background: var(--theme-primary); color: #ffffff; font-weight: 600; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 14px rgba(0,0,0,0.25); transition: filter 0.2s;" aria-label="Get Started Free">Get Started Free</a>
    <a href="#demo" style="padding: 0.875rem 2rem; background: var(--theme-card-bg); color: var(--theme-text-color); border: 1px solid var(--theme-card-border); font-weight: 600; border-radius: 8px; text-decoration: none; transition: background 0.2s;" aria-label="View Live Demo">View Live Demo</a>
  </div>
</section>`,
    },
    {
      config: {
        slug: 'feature-card',
        name: 'Feature Card',
        category: ComponentCategory.CARD,
        description: 'Interactive feature card with card background, border, title, and body text.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'hover',
            property: 'transform, box-shadow',
            duration: '0.2s',
            easing: 'ease-in-out',
          },
        ],
      },
      html: `<article class="feature-card" style="padding: 1.5rem; background: var(--theme-card-bg); border: 1px solid var(--theme-card-border); border-radius: 12px; transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;" tabindex="0">
  <div style="width: 44px; height: 44px; border-radius: 8px; background: var(--theme-primary); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; margin-bottom: 1rem;" aria-hidden="true">✦</div>
  <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--theme-text-color); margin-bottom: 0.5rem;">Atomic Design Tokens</h3>
  <p style="font-size: 0.95rem; color: var(--theme-muted-text); line-height: 1.5;">Define, inherit, and override design tokens across global, page, and component scopes seamlessly.</p>
</article>`,
    },
    {
      config: {
        slug: 'action-button',
        name: 'Action Button',
        category: ComponentCategory.BUTTON,
        description: 'Primary CTA button with hover effects and optional gradient support.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'hover',
            property: 'filter, transform',
            duration: '0.2s',
            easing: 'ease',
          },
          {
            trigger: 'focus',
            property: 'outline',
            duration: '0.1s',
            easing: 'ease',
          },
        ],
      },
      html: `<button class="action-button" style="padding: 0.75rem 1.5rem; background: var(--theme-primary); color: #ffffff; font-size: 1rem; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: filter 0.2s ease, transform 0.1s ease; outline-offset: 2px;" aria-label="Perform Action">
  Click Here
</button>`,
    },
    {
      config: {
        slug: 'status-badge',
        name: 'Status Badge',
        category: ComponentCategory.BADGE,
        description: 'Compact pill badge for statuses and categories.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'hover',
            property: 'opacity',
            duration: '0.2s',
            easing: 'ease',
          },
        ],
      },
      html: `<span class="status-badge" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; background: var(--theme-badge-bg); color: var(--theme-badge-text); border: 1px solid var(--theme-badge-border); border-radius: 9999px; font-size: 0.85rem; font-weight: 600; transition: opacity 0.2s ease;">
  <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--theme-success);" aria-hidden="true"></span> Active System
</span>`,
    },
    {
      config: {
        slug: 'navbar',
        name: 'Navigation Bar',
        category: ComponentCategory.NAV,
        description: 'Responsive top navigation bar with brand logo and link items.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'hover',
            property: 'color',
            duration: '0.2s',
            easing: 'ease',
          },
        ],
      },
      html: `<nav aria-label="Main Navigation" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: var(--theme-card-bg); border-bottom: 1px solid var(--theme-card-border); border-radius: 8px;">
  <div style="font-size: 1.25rem; font-weight: 800; color: var(--theme-text-color); display: flex; align-items: center; gap: 0.5rem;">
    <span style="color: var(--theme-primary);" aria-hidden="true">⚡</span> X Design
  </div>
  <div style="display: flex; gap: 1.5rem; font-size: 0.95rem; font-weight: 500;">
    <a href="#features" style="color: var(--theme-text-color); text-decoration: none; transition: color 0.2s ease;">Features</a>
    <a href="#pages" style="color: var(--theme-muted-text); text-decoration: none; transition: color 0.2s ease;">Pages</a>
    <a href="#docs" style="color: var(--theme-muted-text); text-decoration: none; transition: color 0.2s ease;">Docs</a>
  </div>
  <button style="padding: 0.5rem 1rem; background: var(--theme-primary); color: #ffffff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: filter 0.2s ease;" aria-label="Launch Application">Launch App</button>
</nav>`,
    },
    {
      config: {
        slug: 'data-table',
        name: 'Data Table',
        category: ComponentCategory.TABLE,
        description: 'Clean data table with styled headers and borders.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'hover',
            property: 'background-color',
            duration: '0.15s',
            easing: 'ease',
          },
        ],
      },
      html: `<div style="overflow-x: auto; border: 1px solid var(--theme-card-border); border-radius: 8px;">
  <table style="width: 100%; border-collapse: collapse; text-align: left; background: var(--theme-card-bg); font-size: 0.9rem;" aria-label="Design System Tokens Table">
    <thead>
      <tr style="border-bottom: 1px solid var(--theme-card-border); background: var(--theme-bg);">
        <th scope="col" style="padding: 0.75rem 1rem; color: var(--theme-text-color); font-weight: 600;">Token</th>
        <th scope="col" style="padding: 0.75rem 1rem; color: var(--theme-text-color); font-weight: 600;">Scope</th>
        <th scope="col" style="padding: 0.75rem 1rem; color: var(--theme-text-color); font-weight: 600;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--theme-card-border); transition: background-color 0.15s ease;">
        <td style="padding: 0.75rem 1rem; color: var(--theme-text-color);">colors.primary</td>
        <td style="padding: 0.75rem 1rem; color: var(--theme-muted-text);">Global</td>
        <td style="padding: 0.75rem 1rem; color: var(--theme-success);">Inherited</td>
      </tr>
      <tr style="transition: background-color 0.15s ease;">
        <td style="padding: 0.75rem 1rem; color: var(--theme-text-color);">typography.fontName</td>
        <td style="padding: 0.75rem 1rem; color: var(--theme-muted-text);">Page</td>
        <td style="padding: 0.75rem 1rem; color: var(--theme-warning);">Overridden</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      config: {
        slug: 'input-field',
        name: 'Input Field',
        category: ComponentCategory.FORM,
        description: 'Styled text input field with label and helper text.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'focus',
            property: 'border-color, box-shadow',
            duration: '0.2s',
            easing: 'ease',
          },
        ],
      },
      html: `<div class="input-field-group" style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%; max-width: 400px;">
  <label for="sample-email-input" style="font-size: 0.875rem; font-weight: 600; color: var(--theme-text-color);">Email Address</label>
  <input type="email" id="sample-email-input" placeholder="name@domain.com" style="padding: 0.75rem 1rem; background: var(--theme-card-bg); color: var(--theme-text-color); border: 1px solid var(--theme-card-border); border-radius: 8px; font-size: 0.95rem; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease;" aria-required="true" />
  <span style="font-size: 0.8rem; color: var(--theme-muted-text);">We will never share your email with third parties.</span>
</div>`,
    },
    {
      config: {
        slug: 'dialog-modal',
        name: 'Dialog Modal',
        category: ComponentCategory.MODAL,
        description: 'Accessible modal dialog with header, body text, and action buttons.',
        createdAt: timestamp,
        updatedAt: timestamp,
        tokens: {},
        transitions: [
          {
            trigger: 'enter',
            property: 'transform, opacity',
            duration: '0.3s',
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          },
        ],
      },
      html: `<div role="dialog" aria-modal="true" aria-labelledby="modal-title-heading" style="max-width: 480px; width: 100%; background: var(--theme-card-bg); border: 1px solid var(--theme-card-border); border-radius: 12px; padding: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <h2 id="modal-title-heading" style="font-size: 1.25rem; font-weight: 700; color: var(--theme-text-color);">Confirm Changes</h2>
    <button type="button" aria-label="Close dialog" style="background: transparent; border: none; color: var(--theme-muted-text); font-size: 1.25rem; cursor: pointer;">✕</button>
  </div>
  <p style="font-size: 0.95rem; color: var(--theme-muted-text); line-height: 1.5; margin-bottom: 1.5rem;">Are you sure you want to apply these design token overrides to all child pages and components?</p>
  <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
    <button type="button" style="padding: 0.6rem 1.25rem; background: transparent; color: var(--theme-text-color); border: 1px solid var(--theme-card-border); border-radius: 6px; font-weight: 600; cursor: pointer;">Cancel</button>
    <button type="button" style="padding: 0.6rem 1.25rem; background: var(--theme-primary); color: #ffffff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Confirm</button>
  </div>
</div>`,
    },
  ];
}

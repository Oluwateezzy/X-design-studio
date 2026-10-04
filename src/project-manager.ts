import * as vscode from 'vscode';
import { FileSystemStorage } from './storage/file-system-storage.js';
import { toSlug } from './utils/slug.js';
import { PRESET_THEMES } from './themes-dataset.js';
import { ThemeGenerator } from './generators/theme-generator.js';
import type {
  ProjectManifest,
  ProjectCreationSource,
  PageConfig,
  ComponentConfig,
  ComponentCategory,
  ThemeConfigV2,
} from './types/index.js';

export interface CreateProjectOptions {
  name: string;
  description: string;
  source?: ProjectCreationSource;
  baseTheme?: ThemeConfigV2;
}

export interface LoadedProject {
  manifest: ProjectManifest;
  globalTheme: ThemeConfigV2;
  pages: PageConfig[];
  components: ComponentConfig[];
  projectDir: vscode.Uri;
}

export interface ProjectSummary {
  manifest: ProjectManifest;
  projectDir: vscode.Uri;
}

export const ACTIVE_PROJECT_STATE_KEY = 'xdesign.activeProjectUri';

export class ProjectManager {
  constructor(
    private storage: FileSystemStorage,
    private globalState: vscode.Memento,
    private workspaceRoot?: vscode.Uri
  ) {}

  /**
   * Creates a new project with complete directory structure, default components, and initial theme.
   */
  async createProject(opts: CreateProjectOptions, targetDir?: vscode.Uri): Promise<ProjectManifest> {
    const name = opts.name?.trim() || 'New Project';
    const slug = toSlug(name) || 'new-project';
    const description = opts.description || '';
    const source: ProjectCreationSource = opts.source || { type: 'scratch' };

    // Resolve directory
    const baseDir = targetDir || this.workspaceRoot;
    if (!baseDir) {
      throw new Error('Cannot create project: No target directory or workspace root provided.');
    }

    const projectDir = this.storage.getProjectUri(baseDir);
    const now = new Date().toISOString();

    // Determine theme
    const theme = opts.baseTheme || PRESET_THEMES[0];

    // 1. Generate Default Components
    const defaultComponents = this.getDefaultComponents(now);

    // 2. Write Project Manifest
    const manifest: ProjectManifest = {
      version: '2.0.0',
      name,
      slug,
      description,
      createdAt: now,
      updatedAt: now,
      creationSource: source,
      globalThemeId: theme.id,
      pages: ['landing'],
      components: defaultComponents.map((c) => c.config.slug),
    };
    await this.storage.writeProjectManifest(projectDir, manifest);

    // 3. Write Global Theme
    await this.storage.writeGlobalTheme(projectDir, theme);

    // 4. Create Default Components (hero, card, button, badge, table, nav)
    for (const comp of defaultComponents) {
      await this.storage.writeComponentConfig(projectDir, comp.config.slug, comp.config);
      await this.storage.writeComponentHtml(projectDir, comp.config.slug, comp.html);
    }


    // 4. Create Default Page (Landing Page referencing components)
    const landingPage: PageConfig = {
      slug: 'landing',
      name: 'Landing Page',
      description: 'Default landing page introducing the design system components.',
      createdAt: now,
      updatedAt: now,
      overrides: {},
      components: defaultComponents.map((c) => ({ slug: c.config.slug })),
    };
    await this.storage.writePageConfig(projectDir, landingPage.slug, landingPage);

    // 5. Generate global.design.md and global.preview.html
    const globalDir = vscode.Uri.joinPath(projectDir, 'global');
    const designMd = ThemeGenerator.generateGlobalDesignMd(manifest, theme);
    const previewHtml = ThemeGenerator.generateGlobalPreviewHtml(manifest, theme);
    await this.storage.writeDesignMd(globalDir, 'global.design.md', designMd);
    await this.storage.writePreviewHtml(globalDir, 'global.preview.html', previewHtml);

    // 6. Track active project in globalState
    await this.setActiveProject(projectDir);

    return manifest;
  }

  /**
   * Opens an existing project from a directory and loads its manifest, theme, pages, and components.
   */
  async openProject(projectDir: vscode.Uri): Promise<LoadedProject> {
    const normDir = this.storage.getProjectUri(projectDir);
    const manifest = await this.storage.readProjectManifest(normDir);
    if (!manifest) {
      throw new Error(`Project manifest not found at ${normDir.toString()}`);
    }

    const globalTheme = (await this.storage.readGlobalTheme(normDir)) || PRESET_THEMES[0];

    // Load pages
    const pageSlugs = await this.storage.listPages(normDir);
    const pages: PageConfig[] = [];
    for (const pSlug of pageSlugs) {
      const pageCfg = await this.storage.readPageConfig(normDir, pSlug);
      if (pageCfg) {
        pages.push(pageCfg);
      }
    }

    // Load components
    const compSlugs = await this.storage.listComponents(normDir);
    const components: ComponentConfig[] = [];
    for (const cSlug of compSlugs) {
      const compCfg = await this.storage.readComponentConfig(normDir, cSlug);
      if (compCfg) {
        components.push(compCfg);
      }
    }

    // Update active project
    await this.setActiveProject(normDir);

    return {
      manifest,
      globalTheme,
      pages,
      components,
      projectDir: normDir,
    };
  }

  /**
   * Discovers all project directories in the workspace and returns their summaries.
   */
  async listProjects(): Promise<ProjectSummary[]> {
    const projectDirs = await this.storage.findProjects();
    const summaries: ProjectSummary[] = [];

    for (const dir of projectDirs) {
      const manifest = await this.storage.readProjectManifest(dir);
      if (manifest) {
        summaries.push({ manifest, projectDir: dir });
      }
    }

    return summaries;
  }

  /**
   * Retrieves the currently active project if set in globalState, otherwise returns null.
   */
  async getActiveProject(): Promise<LoadedProject | null> {
    const activeUriStr = this.globalState.get<string>(ACTIVE_PROJECT_STATE_KEY);
    if (activeUriStr) {
      try {
        const activeUri = vscode.Uri.parse(activeUriStr);
        if (await this.storage.projectExists(activeUri)) {
          return await this.openProject(activeUri);
        }
      } catch (err) {
        console.warn('[ProjectManager] Failed to load active project from state:', err);
      }
    }

    // Fallback: check workspace for projects
    const projects = await this.listProjects();
    if (projects.length > 0) {
      return await this.openProject(projects[0].projectDir);
    }

    return null;
  }

  /**
   * Sets the active project URI in globalState.
   */
  async setActiveProject(projectDir: vscode.Uri): Promise<void> {
    const normDir = this.storage.getProjectUri(projectDir);
    await this.globalState.update(ACTIVE_PROJECT_STATE_KEY, normDir.toString());
  }

  /**
   * Deletes a project folder and updates active project state if necessary.
   */
  async deleteProject(projectDir: vscode.Uri): Promise<void> {
    const normDir = this.storage.getProjectUri(projectDir);
    try {
      await vscode.workspace.fs.delete(normDir, { recursive: true, useTrash: false });
    } catch (err) {
      console.warn(`[ProjectManager] Failed to delete project at ${normDir.toString()}:`, err);
    }

    const activeUriStr = this.globalState.get<string>(ACTIVE_PROJECT_STATE_KEY);
    if (activeUriStr === normDir.toString()) {
      await this.globalState.update(ACTIVE_PROJECT_STATE_KEY, undefined);
    }
  }

  /**
   * Helper method to generate default component configs and HTML templates.
   */
  private getDefaultComponents(timestamp: string): Array<{ config: ComponentConfig; html: string }> {
    return [
      {
        config: {
          slug: 'hero-section',
          name: 'Hero Section',
          category: 'hero' as ComponentCategory,
          description: 'High-impact hero section with title, subtitle, CTA button, and hero glow.',
          createdAt: timestamp,
          updatedAt: timestamp,
          tokens: {},
          transitions: [],
        },
        html: `<section class="hero-section" style="padding: 4rem 2rem; text-align: center; background: var(--theme-bg); position: relative; overflow: hidden; border-radius: 12px;">
  <div style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 300px; height: 300px; background: var(--theme-hero-glow1); filter: blur(80px); opacity: 0.5; pointer-events: none;"></div>
  <span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--theme-badge-bg); color: var(--theme-badge-text); border: 1px solid var(--theme-badge-border); border-radius: 9999px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem;">New Generation Studio</span>
  <h1 style="font-size: 3rem; font-weight: 800; color: var(--theme-text-color); margin-bottom: 1rem; line-height: 1.2;">Design Next-Gen Digital Products</h1>
  <p style="font-size: 1.25rem; color: var(--theme-muted-text); max-width: 600px; margin: 0 auto 2rem;">Build scalable, accessible, and stunning user interfaces with explicit theme token inheritance.</p>
  <div style="display: flex; gap: 1rem; justify-content: center; align-items: center;">
    <a href="#cta" style="padding: 0.875rem 2rem; background: var(--theme-primary); color: #ffffff; font-weight: 600; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 14px rgba(0,0,0,0.25);">Get Started Free</a>
    <a href="#demo" style="padding: 0.875rem 2rem; background: var(--theme-card-bg); color: var(--theme-text-color); border: 1px solid var(--theme-card-border); font-weight: 600; border-radius: 8px; text-decoration: none;">View Live Demo</a>
  </div>
</section>`,
      },
      {
        config: {
          slug: 'feature-card',
          name: 'Feature Card',
          category: 'cards' as ComponentCategory,
          description: 'Interactive feature card with card background, border, title, and body text.',
          createdAt: timestamp,
          updatedAt: timestamp,
          tokens: {},
          transitions: [],
        },
        html: `<div class="feature-card" style="padding: 1.5rem; background: var(--theme-card-bg); border: 1px solid var(--theme-card-border); border-radius: 12px; transition: transform 0.2s, box-shadow 0.2s;">
  <div style="width: 44px; height: 44px; border-radius: 8px; background: var(--theme-primary); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; margin-bottom: 1rem;">✦</div>
  <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--theme-text-color); margin-bottom: 0.5rem;">Atomic Design Tokens</h3>
  <p style="font-size: 0.95rem; color: var(--theme-muted-text); line-height: 1.5;">Define, inherit, and override design tokens across global, page, and component scopes seamlessly.</p>
</div>`,
      },
      {
        config: {
          slug: 'action-button',
          name: 'Action Button',
          category: 'buttons' as ComponentCategory,
          description: 'Primary CTA button with hover effects and optional gradient support.',
          createdAt: timestamp,
          updatedAt: timestamp,
          tokens: {},
          transitions: [],
        },
        html: `<button class="action-button" style="padding: 0.75rem 1.5rem; background: var(--theme-primary); color: #ffffff; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: filter 0.2s;">
  Click Here
</button>`,
      },
      {
        config: {
          slug: 'status-badge',
          name: 'Status Badge',
          category: 'badges' as ComponentCategory,
          description: 'Compact pill badge for statuses and categories.',
          createdAt: timestamp,
          updatedAt: timestamp,
          tokens: {},
          transitions: [],
        },
        html: `<span class="status-badge" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; background: var(--theme-badge-bg); color: var(--theme-badge-text); border: 1px solid var(--theme-badge-border); border-radius: 9999px; font-size: 0.85rem; font-weight: 600;">
  <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--theme-success);"></span> Active System
</span>`,
      },
      {
        config: {
          slug: 'data-table',
          name: 'Data Table',
          category: 'tables' as ComponentCategory,
          description: 'Clean data table with styled headers and borders.',
          createdAt: timestamp,
          updatedAt: timestamp,
          tokens: {},
          transitions: [],
        },
        html: `<div style="overflow-x: auto; border: 1px solid var(--theme-card-border); border-radius: 8px;">
  <table style="width: 100%; border-collapse: collapse; text-align: left; background: var(--theme-card-bg); font-size: 0.9rem;">
    <thead>
      <tr style="border-bottom: 1px solid var(--theme-card-border); background: rgba(255,255,255,0.03);">
        <th style="padding: 0.75rem 1rem; color: var(--theme-text-color); font-weight: 600;">Token</th>
        <th style="padding: 0.75rem 1rem; color: var(--theme-text-color); font-weight: 600;">Scope</th>
        <th style="padding: 0.75rem 1rem; color: var(--theme-text-color); font-weight: 600;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--theme-card-border);">
        <td style="padding: 0.75rem 1rem; color: var(--theme-text-color);">colors.primary</td>
        <td style="padding: 0.75rem 1rem; color: var(--theme-muted-text);">Global</td>
        <td style="padding: 0.75rem 1rem; color: var(--theme-success);">Inherited</td>
      </tr>
      <tr>
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
          slug: 'navbar',
          name: 'Navigation Bar',
          category: 'nav' as ComponentCategory,
          description: 'Responsive top navigation bar with brand logo and link items.',
          createdAt: timestamp,
          updatedAt: timestamp,
          tokens: {},
          transitions: [],
        },
        html: `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: var(--theme-card-bg); border-bottom: 1px solid var(--theme-card-border);">
  <div style="font-size: 1.25rem; font-weight: 800; color: var(--theme-text-color); display: flex; align-items: center; gap: 0.5rem;">
    <span style="color: var(--theme-primary);">⚡</span> X Design
  </div>
  <div style="display: flex; gap: 1.5rem; font-size: 0.95rem; font-weight: 500;">
    <a href="#features" style="color: var(--theme-text-color); text-decoration: none;">Features</a>
    <a href="#pages" style="color: var(--theme-muted-text); text-decoration: none;">Pages</a>
    <a href="#docs" style="color: var(--theme-muted-text); text-decoration: none;">Docs</a>
  </div>
  <button style="padding: 0.5rem 1rem; background: var(--theme-primary); color: #ffffff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Launch App</button>
</nav>`,
      },
    ];
  }

}

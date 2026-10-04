import * as vscode from 'vscode';
import { FileSystemStorage } from './storage/file-system-storage.js';
import { toSlug } from './utils/slug.js';
import { PRESET_THEMES } from './themes-dataset.js';
import { ThemeGenerator } from './generators/theme-generator.js';
import { getDefaultComponentTemplates } from './templates/default-components.js';
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

    // Resolve directory for the specific project slug
    const projectDir = targetDir || (this.workspaceRoot
      ? vscode.Uri.joinPath(this.workspaceRoot, '.x-design-system', 'projects', slug)
      : undefined);

    if (!projectDir) {
      throw new Error('Cannot create project: No target directory or workspace root provided.');
    }

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
    return getDefaultComponentTemplates(timestamp);
  }
}


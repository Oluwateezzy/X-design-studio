import * as vscode from 'vscode';
import type {
  ProjectManifest,
  PageConfig,
  ComponentConfig,
  ThemeConfigV2,
} from '../types/index.js';

export class FileSystemStorage {
  constructor(private workspaceRoot?: vscode.Uri) {}

  /**
   * Resolves the target URI to a normalized .x-design-system project directory.
   */
  public getProjectUri(targetUri: vscode.Uri): vscode.Uri {
    const pathStr = targetUri.path;
    if (pathStr.includes('.x-design-system')) {
      return targetUri;
    }
    return vscode.Uri.joinPath(targetUri, '.x-design-system');
  }

  /**
   * Ensures parent directories exist for a file URI.
   */
  private async ensureParentDir(fileUri: vscode.Uri): Promise<void> {
    const parentDir = vscode.Uri.joinPath(fileUri, '..');
    try {
      await vscode.workspace.fs.createDirectory(parentDir);
    } catch {
      // Ignore if directory creation fails or already exists
    }
  }

  /**
   * Reads and parses a JSON file. Returns null if missing or malformed.
   */
  private async readJsonFile<T>(fileUri: vscode.Uri): Promise<T | null> {
    try {
      const data = await vscode.workspace.fs.readFile(fileUri);
      const text = Buffer.from(data).toString('utf8');
      return JSON.parse(text) as T;
    } catch (err: any) {
      if (err && (err.code === 'FileNotFound' || String(err).includes('FileNotFound'))) {
        return null;
      }
      // Malformed JSON or permission/read failure
      console.warn(`[FileSystemStorage] Could not read JSON from ${fileUri.toString()}:`, err);
      return null;
    }
  }

  /**
   * Safely writes a JSON object to a file.
   */
  private async writeJsonFile<T>(fileUri: vscode.Uri, content: T): Promise<void> {
    await this.ensureParentDir(fileUri);
    const text = JSON.stringify(content, null, 2);
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(text, 'utf8'));
  }

  // ─── Project Operations ───────────────────────────────────────────────────

  async readProjectManifest(projectDir: vscode.Uri): Promise<ProjectManifest | null> {
    const baseUri = this.getProjectUri(projectDir);
    const manifestUri = vscode.Uri.joinPath(baseUri, 'project.json');
    return this.readJsonFile<ProjectManifest>(manifestUri);
  }

  async writeProjectManifest(projectDir: vscode.Uri, manifest: ProjectManifest): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const manifestUri = vscode.Uri.joinPath(baseUri, 'project.json');
    await this.writeJsonFile(manifestUri, manifest);
  }

  // ─── Theme Operations ─────────────────────────────────────────────────────

  async readGlobalTheme(projectDir: vscode.Uri): Promise<ThemeConfigV2 | null> {
    const baseUri = this.getProjectUri(projectDir);
    const themeUri = vscode.Uri.joinPath(baseUri, 'global', 'theme.json');
    return this.readJsonFile<ThemeConfigV2>(themeUri);
  }

  async writeGlobalTheme(projectDir: vscode.Uri, theme: ThemeConfigV2): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const themeUri = vscode.Uri.joinPath(baseUri, 'global', 'theme.json');
    await this.writeJsonFile(themeUri, theme);
  }

  // ─── Page Operations ──────────────────────────────────────────────────────

  async readPageConfig(projectDir: vscode.Uri, slug: string): Promise<PageConfig | null> {
    const baseUri = this.getProjectUri(projectDir);
    const pageJsonUri = vscode.Uri.joinPath(baseUri, 'pages', slug, 'page.json');
    return this.readJsonFile<PageConfig>(pageJsonUri);
  }

  async writePageConfig(projectDir: vscode.Uri, slug: string, config: PageConfig): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const pageJsonUri = vscode.Uri.joinPath(baseUri, 'pages', slug, 'page.json');
    await this.writeJsonFile(pageJsonUri, config);
  }

  async deletePageDir(projectDir: vscode.Uri, slug: string): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const pageDirUri = vscode.Uri.joinPath(baseUri, 'pages', slug);
    try {
      await vscode.workspace.fs.delete(pageDirUri, { recursive: true, useTrash: false });
    } catch (err) {
      if (!(err instanceof vscode.FileSystemError && err.code === 'FileNotFound')) {
        console.warn(`[FileSystemStorage] Failed to delete page ${slug}:`, err);
      }
    }
  }

  async listPages(projectDir: vscode.Uri): Promise<string[]> {
    const baseUri = this.getProjectUri(projectDir);
    const pagesDirUri = vscode.Uri.joinPath(baseUri, 'pages');
    try {
      const entries = await vscode.workspace.fs.readDirectory(pagesDirUri);
      const pageSlugs: string[] = [];
      for (const [name, type] of entries) {
        if (type === vscode.FileType.Directory) {
          pageSlugs.push(name);
        }
      }
      return pageSlugs;
    } catch {
      return [];
    }
  }

  // ─── Component Operations ─────────────────────────────────────────────────

  async readComponentConfig(projectDir: vscode.Uri, slug: string): Promise<ComponentConfig | null> {
    const baseUri = this.getProjectUri(projectDir);
    const compJsonUri = vscode.Uri.joinPath(baseUri, 'components', slug, 'component.json');
    return this.readJsonFile<ComponentConfig>(compJsonUri);
  }

  async writeComponentConfig(projectDir: vscode.Uri, slug: string, config: ComponentConfig): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const compJsonUri = vscode.Uri.joinPath(baseUri, 'components', slug, 'component.json');
    await this.writeJsonFile(compJsonUri, config);
  }

  async readComponentHtml(projectDir: vscode.Uri, slug: string): Promise<string | null> {
    const baseUri = this.getProjectUri(projectDir);
    const htmlUri = vscode.Uri.joinPath(baseUri, 'components', slug, 'component.html');
    try {
      const data = await vscode.workspace.fs.readFile(htmlUri);
      return Buffer.from(data).toString('utf8');
    } catch {
      return null;
    }
  }

  async writeComponentHtml(projectDir: vscode.Uri, slug: string, html: string): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const htmlUri = vscode.Uri.joinPath(baseUri, 'components', slug, 'component.html');
    await this.ensureParentDir(htmlUri);
    await vscode.workspace.fs.writeFile(htmlUri, Buffer.from(html, 'utf8'));
  }

  async deleteComponentDir(projectDir: vscode.Uri, slug: string): Promise<void> {
    const baseUri = this.getProjectUri(projectDir);
    const compDirUri = vscode.Uri.joinPath(baseUri, 'components', slug);
    try {
      await vscode.workspace.fs.delete(compDirUri, { recursive: true, useTrash: false });
    } catch (err) {
      if (!(err instanceof vscode.FileSystemError && err.code === 'FileNotFound')) {
        console.warn(`[FileSystemStorage] Failed to delete component ${slug}:`, err);
      }
    }
  }

  async listComponents(projectDir: vscode.Uri): Promise<string[]> {
    const baseUri = this.getProjectUri(projectDir);
    const compDirUri = vscode.Uri.joinPath(baseUri, 'components');
    try {
      const entries = await vscode.workspace.fs.readDirectory(compDirUri);
      const compSlugs: string[] = [];
      for (const [name, type] of entries) {
        if (type === vscode.FileType.Directory) {
          compSlugs.push(name);
        }
      }
      return compSlugs;
    } catch {
      return [];
    }
  }

  // ─── Generated File Operations ────────────────────────────────────────────

  async writeDesignMd(dir: vscode.Uri, filename: string, content: string): Promise<void> {
    const fileUri = vscode.Uri.joinPath(dir, filename);
    await this.ensureParentDir(fileUri);
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
  }

  async writePreviewHtml(dir: vscode.Uri, filename: string, content: string): Promise<void> {
    const fileUri = vscode.Uri.joinPath(dir, filename);
    await this.ensureParentDir(fileUri);
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
  }

  // ─── Discovery Operations ─────────────────────────────────────────────────

  async findProjects(): Promise<vscode.Uri[]> {
    try {
      const manifests = await vscode.workspace.findFiles(
        '**/.x-design-system/project.json',
        '**/node_modules/**'
      );
      return manifests.map((manifestUri) => vscode.Uri.joinPath(manifestUri, '..'));
    } catch (err) {
      console.warn('[FileSystemStorage] Error finding projects:', err);
      return [];
    }
  }

  async projectExists(projectDir: vscode.Uri): Promise<boolean> {
    const baseUri = this.getProjectUri(projectDir);
    const manifestUri = vscode.Uri.joinPath(baseUri, 'project.json');
    try {
      await vscode.workspace.fs.stat(manifestUri);
      return true;
    } catch {
      return false;
    }
  }
}

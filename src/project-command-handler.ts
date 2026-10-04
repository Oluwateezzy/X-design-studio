import * as vscode from 'vscode';
import { FileSystemStorage } from './storage/file-system-storage.js';
import { ProjectManager } from './project-manager.js';
import { ImportService } from './import-service.js';
import { PRESET_THEMES } from './themes-dataset.js';
import type {
  WebviewToExtensionMessage,
  ExtensionToWebviewMessage,
  ThemeConfigV2,
} from './messages.js';

export class ProjectCommandHandler {
  private storage: FileSystemStorage;
  private projectManager: ProjectManager;
  private importService: ImportService;

  constructor(
    private extensionUri: vscode.Uri,
    private globalState: vscode.Memento
  ) {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri || extensionUri;
    this.storage = new FileSystemStorage(workspaceRoot);
    this.projectManager = new ProjectManager(this.storage, globalState, workspaceRoot);
    this.importService = new ImportService();
  }

  /**
   * Main message router for V2 Project Management messages.
   * Returns true if message was handled, false if unhandled.
   */
  async handleMessage(
    message: WebviewToExtensionMessage,
    postMessage: (msg: ExtensionToWebviewMessage) => void
  ): Promise<boolean> {
    switch (message.type) {
      case 'listProjects': {
        await this.sendProjectList(postMessage);
        return true;
      }

      case 'createProject': {
        try {
          const presetId = message.presetThemeId || 'theme-1';
          const baseTheme = PRESET_THEMES.find((t) => t.id === presetId) || PRESET_THEMES[0];

          const manifest = await this.projectManager.createProject({
            name: message.name,
            description: message.description,
            source: message.source || { type: 'scratch' },
            baseTheme,
          });

          // Open newly created project
          const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri || this.extensionUri;
          const projectUri = vscode.Uri.joinPath(workspaceRoot, '.x-design-system', 'projects', manifest.slug);
          const loaded = await this.projectManager.openProject(projectUri);

          postMessage({
            type: 'projectLoaded',
            manifest: loaded.manifest,
            theme: loaded.globalTheme,
            pages: loaded.pages,
            components: loaded.components,
          });

          await this.sendProjectList(postMessage);
          vscode.window.showInformationMessage(`Project '${manifest.name}' created successfully!`);
        } catch (err: any) {
          console.error('[ProjectCommandHandler] Create project error:', err);
          vscode.window.showErrorMessage(`Failed to create project: ${err?.message || String(err)}`);
        }
        return true;
      }

      case 'openProject': {
        try {
          const projectUri = await this.resolveProjectUri(message.projectPath);
          if (!projectUri) {
            throw new Error(`Project folder '${message.projectPath}' not found.`);
          }

          const loaded = await this.projectManager.openProject(projectUri);
          postMessage({
            type: 'projectLoaded',
            manifest: loaded.manifest,
            theme: loaded.globalTheme,
            pages: loaded.pages,
            components: loaded.components,
          });

          await this.sendProjectList(postMessage);
          vscode.window.showInformationMessage(`Opened project '${loaded.manifest.name}'`);
        } catch (err: any) {
          console.error('[ProjectCommandHandler] Open project error:', err);
          vscode.window.showErrorMessage(`Failed to open project: ${err?.message || String(err)}`);
        }
        return true;
      }

      case 'deleteProject': {
        try {
          const projectUri = await this.resolveProjectUri(message.projectPath);
          if (projectUri) {
            await this.projectManager.deleteProject(projectUri);
            vscode.window.showInformationMessage(`Project deleted.`);
          }
          await this.sendProjectList(postMessage);
        } catch (err: any) {
          console.error('[ProjectCommandHandler] Delete project error:', err);
          vscode.window.showErrorMessage(`Failed to delete project: ${err?.message || String(err)}`);
        }
        return true;
      }

      case 'importFromSource': {
        try {
          let importRes;
          const { sourceType, source, name, description, presetThemeId } = message;

          if (sourceType === 'codebase') {
            const folderUri = source ? vscode.Uri.file(source) : (vscode.workspace.workspaceFolders?.[0]?.uri || this.extensionUri);
            importRes = await this.importService.importFromCodebase(folderUri);
          } else if (sourceType === 'url') {
            importRes = await this.importService.importFromUrl(source);
          } else if (sourceType === 'designMd') {
            const fileUri = vscode.Uri.file(source);
            importRes = await this.importService.importFromDesignMd(fileUri);
          } else {
            throw new Error(`Unsupported import source type: ${sourceType}`);
          }

          if (importRes.success && importRes.theme) {
            const importedTheme: ThemeConfigV2 = importRes.theme;

            // Create a new project for this imported theme
            const projectName = name || importedTheme.name || 'Imported Theme Project';
            const manifest = await this.projectManager.createProject({
              name: projectName,
              description: description || `Imported from ${sourceType}`,
              source: { type: sourceType, source },
              baseTheme: importedTheme,
            });

            postMessage({
              type: 'importResult',
              success: true,
              theme: importedTheme,
              warnings: importRes.warnings,
            });

            const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri || this.extensionUri;
            const projectUri = vscode.Uri.joinPath(workspaceRoot, '.x-design-system', 'projects', manifest.slug);
            const loaded = await this.projectManager.openProject(projectUri);

            postMessage({
              type: 'projectLoaded',
              manifest: loaded.manifest,
              theme: loaded.globalTheme,
              pages: loaded.pages,
              components: loaded.components,
            });

            await this.sendProjectList(postMessage);
            vscode.window.showInformationMessage(`Imported design system theme '${projectName}' successfully!`);
          } else {
            postMessage({
              type: 'importResult',
              success: false,
              errors: importRes.errors || ['Import failed.'],
              warnings: importRes.warnings,
            });
          }
        } catch (err: any) {
          console.error('[ProjectCommandHandler] Import error:', err);
          postMessage({
            type: 'importResult',
            success: false,
            errors: [err?.message || String(err)],
          });
        }
        return true;
      }

      case 'browseFolder': {
        const selected = await vscode.window.showOpenDialog({
          canSelectFiles: false,
          canSelectFolders: true,
          canSelectMany: false,
          title: 'Select Folder for Codebase Import',
        });
        if (selected && selected[0]) {
          postMessage({
            type: 'folderSelected',
            path: selected[0].fsPath,
          });
        }
        return true;
      }

      case 'browseFile': {
        const selected = await vscode.window.showOpenDialog({
          canSelectFiles: true,
          canSelectFolders: false,
          canSelectMany: false,
          title: 'Select Design MD File',
          filters: {
            'Design Spec Markdown': ['md', 'markdown'],
            'All Files': ['*'],
          },
        });
        if (selected && selected[0]) {
          postMessage({
            type: 'fileSelected',
            path: selected[0].fsPath,
          });
        }
        return true;
      }

      default:
        return false;
    }
  }

  public async sendProjectList(postMessage: (msg: ExtensionToWebviewMessage) => void): Promise<void> {
    try {
      const summaries = await this.projectManager.listProjects();
      const activeProject = await this.projectManager.getActiveProject();

      postMessage({
        type: 'projectList',
        projects: summaries.map((s) => s.manifest),
        activeProjectSlug: activeProject?.manifest.slug,
      });
    } catch (err) {
      console.error('[ProjectCommandHandler] Failed to list projects:', err);
      postMessage({
        type: 'projectList',
        projects: [],
      });
    }
  }

  private async resolveProjectUri(slugOrPath: string): Promise<vscode.Uri | null> {
    const summaries = await this.projectManager.listProjects();
    const match = summaries.find(
      (s) => s.manifest.slug === slugOrPath || s.projectDir.fsPath === slugOrPath || s.projectDir.path.endsWith(slugOrPath)
    );

    if (match) {
      return match.projectDir;
    }

    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri || this.extensionUri;
    const directUri = vscode.Uri.joinPath(workspaceRoot, '.x-design-system', 'projects', slugOrPath);
    if (await this.storage.projectExists(directUri)) {
      return directUri;
    }

    return null;
  }
}

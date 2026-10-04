import React, { useState, useEffect } from "react";
import {
  FolderPlus,
  Plus,
  Download,
  Globe,
  FileText,
  Code,
  Trash2,
  FolderOpen,
  Check,
  X,
  Search,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Layers,
  FileCode,
} from "lucide-react";
import type { ProjectManifest, ProjectCreationType } from "../../src/types/project";
import { PRESET_THEMES } from "../lib/themes-dataset";
import { postMessage, onMessage } from "../vscode-bridge";

export interface ProjectPanelProps {
  activeProjectSlug?: string | null;
  onProjectOpened?: (slug: string) => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
  activeProjectSlug: propActiveSlug,
  onProjectOpened,
}) => {
  const [projects, setProjects] = useState<ProjectManifest[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(propActiveSlug || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isImportOpen, setIsImportOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<ProjectManifest | null>(null);

  // Status banner state
  const [statusAlert, setStatusAlert] = useState<{
    text: string;
    type: "info" | "error" | "success";
  } | null>(null);

  // Create Modal Form state
  const [createName, setCreateName] = useState<string>("");
  const [createDesc, setCreateDesc] = useState<string>("");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("theme-1");

  // Import Modal Form state
  const [importTab, setImportTab] = useState<"codebase" | "url" | "designMd">("codebase");
  const [importPath, setImportPath] = useState<string>("");
  const [importUrl, setImportUrl] = useState<string>("");
  const [importName, setImportName] = useState<string>("");
  const [importDesc, setImportDesc] = useState<string>("");
  const [isImporting, setIsImporting] = useState<boolean>(false);

  // Sync propActiveSlug if updated externally
  useEffect(() => {
    if (propActiveSlug !== undefined) {
      setActiveSlug(propActiveSlug);
    }
  }, [propActiveSlug]);

  // Request project list & handle host message responses
  const fetchProjects = () => {
    setLoading(true);
    postMessage({ type: "listProjects" });
  };

  useEffect(() => {
    fetchProjects();

    const cleanup = onMessage((msg) => {
      if (msg.type === "projectList") {
        setProjects(msg.projects || []);
        if (msg.activeProjectSlug) {
          setActiveSlug(msg.activeProjectSlug);
        }
        setLoading(false);
      } else if (msg.type === "projectLoaded") {
        setActiveSlug(msg.manifest.slug);
        if (onProjectOpened) {
          onProjectOpened(msg.manifest.slug);
        }
        setStatusAlert({
          text: `Project '${msg.manifest.name}' loaded successfully.`,
          type: "success",
        });
        setLoading(false);
      } else if (msg.type === "importResult") {
        setIsImporting(false);
        if (msg.success) {
          setStatusAlert({
            text: "Theme tokens imported successfully!",
            type: "success",
          });
          setIsImportOpen(false);
          resetImportForm();
          fetchProjects();
        } else {
          const errText = msg.errors && msg.errors.length > 0
            ? msg.errors.join("; ")
            : "Failed to import project tokens.";
          setStatusAlert({ text: errText, type: "error" });
        }
      } else if (msg.type === "folderSelected") {
        setImportPath(msg.path);
      } else if (msg.type === "fileSelected") {
        setImportPath(msg.path);
      }
    });

    return cleanup;
  }, []);

  const resetCreateForm = () => {
    setCreateName("");
    setCreateDesc("");
    setSelectedPresetId("theme-1");
  };

  const resetImportForm = () => {
    setImportPath("");
    setImportUrl("");
    setImportName("");
    setImportDesc("");
    setIsImporting(false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;

    postMessage({
      type: "createProject",
      name: createName.trim(),
      description: createDesc.trim(),
      source: { type: "scratch" },
      presetThemeId: selectedPresetId,
    });

    setIsCreateOpen(false);
    resetCreateForm();
    setStatusAlert({
      text: `Creating project '${createName}'...`,
      type: "info",
    });
    fetchProjects();
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSource = importTab === "url" ? importUrl.trim() : importPath.trim();

    if (!targetSource) {
      setStatusAlert({
        text: importTab === "url"
          ? "Please enter a valid website URL."
          : "Please select a valid folder or file path.",
        type: "error",
      });
      return;
    }

    setIsImporting(true);
    setStatusAlert({
      text: `Importing design system tokens from ${importTab}...`,
      type: "info",
    });

    postMessage({
      type: "importFromSource",
      sourceType: importTab,
      source: targetSource,
      name: importName.trim() || undefined,
      description: importDesc.trim() || undefined,
      presetThemeId: selectedPresetId,
    });
  };

  const handleOpenProject = (slug: string) => {
    postMessage({ type: "openProject", projectPath: slug });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    postMessage({ type: "deleteProject", projectPath: deleteTarget.slug });
    setStatusAlert({
      text: `Deleted project '${deleteTarget.name}'.`,
      type: "info",
    });
    setDeleteTarget(null);
    fetchProjects();
  };

  const handleBrowseFolder = () => {
    postMessage({ type: "browseFolder" });
  };

  const handleBrowseFile = () => {
    postMessage({
      type: "browseFile",
      filterName: "Design Spec Markdown",
      extensions: ["md", "markdown"],
    });
  };

  const filteredProjects = projects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  });

  const getSourceBadge = (sourceType: ProjectCreationType) => {
    switch (sourceType) {
      case "codebase":
        return {
          label: "Codebase",
          icon: <Code className="w-3 h-3" />,
          color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        };
      case "url":
        return {
          label: "Web URL",
          icon: <Globe className="w-3 h-3" />,
          color: "bg-purple-500/15 text-purple-400 border-purple-500/30",
        };
      case "designMd":
        return {
          label: "Design MD",
          icon: <FileText className="w-3 h-3" />,
          color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        };
      case "scratch":
      default:
        return {
          label: "Scratch",
          icon: <Sparkles className="w-3 h-3" />,
          color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
        };
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--vscode-sidebar-bg)] text-[var(--vscode-fg)] overflow-y-auto p-3 space-y-3">
      {/* Banner / Toast Messages */}
      {statusAlert && (
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-lg border text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200 ${
            statusAlert.type === "error"
              ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
              : statusAlert.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusAlert.type === "error" ? (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            ) : statusAlert.type === "success" ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0" />
            )}
            <span>{statusAlert.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusAlert(null)}
            className="p-1 hover:opacity-80 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--vscode-border)] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[var(--vscode-fg)]">
                Project Workspace
              </h2>
              <p className="text-xs opacity-75">
                Manage, create, and import your design system projects ({projects.length} total)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchProjects}
            className="p-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] hover:bg-[var(--vscode-border)] text-[var(--vscode-fg)] transition cursor-pointer"
            title="Refresh Projects"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-indigo-400" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              resetImportForm();
              setIsImportOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] hover:border-indigo-500/50 text-[var(--vscode-fg)] text-xs font-semibold transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetCreateForm();
              setIsCreateOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Control */}
      {projects.length > 0 && (
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, description, or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] placeholder:opacity-50 text-xs focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      )}

      {/* Loading State */}
      {loading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 space-y-3 opacity-75">
          <RefreshCw className="w-7 h-7 animate-spin text-indigo-400" />
          <p className="text-xs font-medium">Scanning workspace for projects...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-[var(--vscode-border)] rounded-2xl bg-[var(--vscode-input-bg)]/30 text-center max-w-xl mx-auto my-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
            <FolderPlus className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[var(--vscode-fg)] mb-1">
            No Projects in Workspace
          </h3>
          <p className="text-xs opacity-75 mb-6 max-w-md leading-relaxed">
            You don't have any design system projects stored in your workspace yet. Create a new project from scratch with a preset theme or import an existing codebase or design spec.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                resetCreateForm();
                setIsCreateOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
            <button
              type="button"
              onClick={() => {
                resetImportForm();
                setIsImportOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] hover:border-purple-500/50 text-[var(--vscode-fg)] text-xs font-semibold transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Import Existing Theme</span>
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const isActive = project.slug === activeSlug;
            const sourceBadge = getSourceBadge(project.creationSource?.type || "scratch");

            return (
              <div
                key={project.slug}
                className={`group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-950/20 border-indigo-500/60 shadow-lg shadow-indigo-900/20 ring-1 ring-indigo-500/40"
                    : "bg-[var(--vscode-input-bg)]/40 border-[var(--vscode-border)] hover:border-indigo-500/40 hover:bg-[var(--vscode-input-bg)]"
                }`}
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[var(--vscode-fg)] group-hover:text-indigo-300 transition">
                        {project.name}
                      </h4>
                      {isActive && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm animate-pulse">
                          <Check className="w-3 h-3" /> ACTIVE
                        </span>
                      )}
                    </div>

                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${sourceBadge.color}`}
                    >
                      {sourceBadge.icon}
                      <span>{sourceBadge.label}</span>
                    </span>
                  </div>

                  {/* Project Description */}
                  <p className="text-xs opacity-75 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {project.description || "No description provided."}
                  </p>

                  {/* Stats Badges */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] opacity-80 mb-4 pt-2 border-t border-[var(--vscode-border)]/50">
                    <div className="flex items-center gap-1 text-indigo-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{project.pages?.length || 0} Pages</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-400">
                      <FileCode className="w-3.5 h-3.5" />
                      <span>{project.components?.length || 0} Components</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--vscode-border)]">
                  <span className="text-[10px] opacity-50">
                    Updated: {new Date(project.updatedAt || Date.now()).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(project)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenProject(project.slug)}
                      disabled={isActive}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                      }`}
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>{isActive ? "Active" : "Open Project"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-[var(--vscode-app-bg)] border border-[var(--vscode-border)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--vscode-border)] bg-[var(--vscode-input-bg)]/40">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-[var(--vscode-fg)]">Create New Project</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--vscode-border)] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-1">
                  Project Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="e.g. Acme Dashboard System"
                  className="w-full px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={createDesc}
                  onChange={(e) => setCreateDesc(e.target.value)}
                  placeholder="Brief overview of the project and target design goals..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] text-xs focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-2">
                  Select Preset Initial Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                  {PRESET_THEMES.slice(0, 10).map((t) => {
                    const isSelected = t.id === selectedPresetId;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedPresetId(t.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? "bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500"
                            : "bg-[var(--vscode-input-bg)]/50 border-[var(--vscode-border)] hover:border-indigo-500/50"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[var(--vscode-fg)]">{t.name}</span>
                            <span className="text-[10px] opacity-60">({t.category})</span>
                          </div>
                          <p className="text-[10px] opacity-70 line-clamp-1">{t.personality}</p>
                          <div className="flex items-center gap-1 pt-1">
                            <span
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: t.colors.bg.hex }}
                              title={`Background: ${t.colors.bg.hex}`}
                            />
                            <span
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: t.colors.primary.hex }}
                              title={`Primary: ${t.colors.primary.hex}`}
                            />
                            <span
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: t.colors.accent.hex }}
                              title={`Accent: ${t.colors.accent.hex}`}
                            />
                          </div>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--vscode-border)]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--vscode-border)] text-xs font-semibold hover:bg-[var(--vscode-border)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!createName.trim()}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMPORT PROJECT MODAL */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-[var(--vscode-app-bg)] border border-[var(--vscode-border)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--vscode-border)] bg-[var(--vscode-input-bg)]/40">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-[var(--vscode-fg)]">Import Design Theme</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsImportOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--vscode-border)] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Source Selection Tabs */}
            <div className="flex items-center border-b border-[var(--vscode-border)] px-6 bg-[var(--vscode-input-bg)]/20">
              <button
                type="button"
                onClick={() => setImportTab("codebase")}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition cursor-pointer ${
                  importTab === "codebase"
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Codebase</span>
              </button>
              <button
                type="button"
                onClick={() => setImportTab("url")}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition cursor-pointer ${
                  importTab === "url"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Web URL</span>
              </button>
              <button
                type="button"
                onClick={() => setImportTab("designMd")}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition cursor-pointer ${
                  importTab === "designMd"
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Design MD</span>
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* CODEBASE TAB */}
              {importTab === "codebase" && (
                <div className="space-y-4">
                  <p className="text-xs opacity-75 leading-relaxed">
                    Select a folder in your workspace containing CSS, SCSS, or Tailwind configurations to extract colors and Google Fonts.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-1">
                      Folder Path
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={importPath}
                        onChange={(e) => setImportPath(e.target.value)}
                        placeholder="Click 'Browse Folder' or enter folder path..."
                        className="flex-1 px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] text-xs focus:outline-none focus:border-indigo-500 transition"
                      />
                      <button
                        type="button"
                        onClick={handleBrowseFolder}
                        className="px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] hover:border-indigo-500 text-[var(--vscode-fg)] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                      >
                        <FolderOpen className="w-4 h-4 text-indigo-400" />
                        <span>Select Folder</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* WEB URL TAB */}
              {importTab === "url" && (
                <div className="space-y-4">
                  <p className="text-xs opacity-75 leading-relaxed">
                    Enter a website URL to automatically fetch HTML style blocks, Google Fonts, and extract dominant color palettes.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-1">
                      Website URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      placeholder="e.g. https://example.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] text-xs focus:outline-none focus:border-purple-500 transition"
                    />
                  </div>
                </div>
              )}

              {/* DESIGN MD TAB */}
              {importTab === "designMd" && (
                <div className="space-y-4">
                  <p className="text-xs opacity-75 leading-relaxed">
                    Select a <code className="text-amber-400 font-mono">.design.md</code> or Markdown specification file containing design tokens and custom properties.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-1">
                      Markdown File Path
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={importPath}
                        onChange={(e) => setImportPath(e.target.value)}
                        placeholder="Click 'Select File' or enter .md path..."
                        className="flex-1 px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] text-xs focus:outline-none focus:border-amber-500 transition"
                      />
                      <button
                        type="button"
                        onClick={handleBrowseFile}
                        className="px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] hover:border-amber-500 text-[var(--vscode-fg)] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span>Select File</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Name Override */}
              <div className="pt-2 border-t border-[var(--vscode-border)]">
                <label className="block text-xs font-bold text-[var(--vscode-fg)] mb-1">
                  Imported Project Name (Optional)
                </label>
                <input
                  type="text"
                  value={importName}
                  onChange={(e) => setImportName(e.target.value)}
                  placeholder="Auto-generated if left blank"
                  className="w-full px-3.5 py-2 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--vscode-border)]">
                <button
                  type="button"
                  onClick={() => setIsImportOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--vscode-border)] text-xs font-semibold hover:bg-[var(--vscode-border)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isImporting || (importTab === "url" ? !importUrl.trim() : !importPath.trim())}
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  {isImporting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isImporting ? "Importing..." : "Start Import"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[var(--vscode-app-bg)] border border-rose-500/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--vscode-fg)]">
                  Delete Project '{deleteTarget.name}'?
                </h3>
                <p className="text-xs opacity-75 mt-1 leading-relaxed">
                  This will permanently delete the project folder <code className="text-rose-300 bg-rose-950/40 px-1 py-0.5 rounded">.x-design-system/projects/{deleteTarget.slug}</code> from disk. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--vscode-border)]">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-[var(--vscode-border)] text-xs font-semibold hover:bg-[var(--vscode-border)] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPanel;

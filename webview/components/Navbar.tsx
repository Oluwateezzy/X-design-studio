import React from "react";
import { Sparkles, Code, Download, Shuffle, PanelRight, Monitor, Palette, FolderPlus } from "lucide-react";
import type { ThemeConfigV2 } from "../lib/types/theme-config-v2";

export type StudioTab = "canvas" | "theme" | "projects";

interface NavbarProps {
  activeTheme: ThemeConfigV2;
  activeProjectName?: string;
  activeTab: StudioTab;
  onSelectTab: (tab: StudioTab) => void;
  showRightPanel: boolean;
  onToggleRightPanel: () => void;
  onOpenExport: (tab: "html" | "markdown") => void;
  onRandomTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTheme,
  activeProjectName,
  activeTab,
  onSelectTab,
  showRightPanel,
  onToggleRightPanel,
  onOpenExport,
  onRandomTheme,
}) => {
  const themeNum = parseInt(activeTheme.id.replace(/\D/g, ""), 10) || 1;

  return (
    <header className="sticky top-0 z-40 bg-[var(--vscode-app-bg)] border-b border-[var(--vscode-border)] px-4 py-2.5">
      <div className="w-full flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Active Theme Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-[var(--vscode-fg)] tracking-tight">
                  X Design System
                </h1>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-semibold">
                  100 Themes V2
                </span>
              </div>
              <p className="text-[11px] opacity-75">
                Active: <span className="font-semibold text-[var(--vscode-fg)]">#{themeNum} {activeTheme.name}</span>
                {activeProjectName && (
                  <span className="ml-2 text-indigo-400 font-semibold">| Project: {activeProjectName}</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* View Tabs Switcher: Live Canvas | Global Theme | Projects */}
        <div className="flex items-center p-0.5 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-xs font-medium">
          <button
            type="button"
            onClick={() => onSelectTab("canvas")}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "canvas"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-[var(--vscode-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Live Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("theme")}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "theme"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-[var(--vscode-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Global Theme</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("projects")}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "projects"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-[var(--vscode-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Projects</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRandomTheme}
            aria-label="Randomize Theme"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] text-[var(--vscode-fg)] hover:opacity-90 text-xs font-semibold transition cursor-pointer"
            title="Randomize Theme"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Random</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenExport("html")}
            aria-label="Export HTML Page"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export HTML</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenExport("markdown")}
            aria-label="Export AI Prompt Markdown"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Prompt (.md)</span>
          </button>

          <button
            type="button"
            onClick={onToggleRightPanel}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              showRightPanel
                ? "bg-[var(--vscode-button-bg)] text-[var(--vscode-button-fg)] border-transparent"
                : "bg-[var(--vscode-input-bg)] text-[var(--vscode-border)] hover:bg-[var(--vscode-border)]"
            }`}
            title={showRightPanel ? "Hide Color Tuner" : "Show Color Tuner"}
          >
            <PanelRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useMemo } from "react";
import { Search, Check, Shuffle, ExternalLink, Sparkles } from "lucide-react";
import { PRESET_THEMES, THEME_CATEGORIES, type ThemeConfigV2 } from "../lib/themes-dataset";
import { colorTokenToCss } from "../lib/types/color-token";
import { ProjectPanel } from "./ProjectPanel";

interface SidebarViewProps {
  activeTheme: ThemeConfigV2;
  activeProjectSlug?: string | null;
  onSelectTheme: (theme: ThemeConfigV2) => void;
  onRandomTheme: () => void;
  onOpenFullStudio: () => void;
}

export const SidebarView: React.FC<SidebarViewProps> = ({
  activeTheme,
  activeProjectSlug,
  onSelectTheme,
  onRandomTheme,
  onOpenFullStudio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"presets" | "projects">("presets");

  const filteredThemes = useMemo(() => {
    return PRESET_THEMES.filter((theme) => {
      const matchesCategory =
        selectedCategory === "All" || theme.category === selectedCategory;
      const numStr = `#${theme.id.replace(/\D/g, "")}`;
      const matchesSearch =
        searchQuery.trim() === "" ||
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.personality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        numStr.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--vscode-sidebar-bg)] text-[var(--vscode-fg)] overflow-hidden font-sans border-r border-[var(--vscode-border)]">
      {/* Sidebar Header */}
      <div className="p-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-bg)]/50 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xs shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold tracking-tight">X Design System</span>
          </div>

          <button
            type="button"
            onClick={onOpenFullStudio}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-[var(--vscode-button-bg)] text-[var(--vscode-button-fg)] hover:opacity-90 transition font-semibold cursor-pointer shadow-xs"
            title="Open Full Canvas Editor (Cmd+Shift+T)"
          >
            <span>Canvas</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* View Mode Tabs (100 Themes | Projects) */}
        <div className="flex rounded-md bg-[var(--vscode-input-bg)] p-0.5 text-[11px] font-medium border border-[var(--vscode-border)]">
          <button
            type="button"
            onClick={() => setActiveTab("presets")}
            className={`flex-1 py-1 text-center rounded transition cursor-pointer ${
              activeTab === "presets"
                ? "bg-[var(--vscode-bg)] text-[var(--vscode-fg)] font-semibold shadow-xs"
                : "text-[var(--vscode-sidebar-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            100 Themes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-1 text-center rounded transition cursor-pointer ${
              activeTab === "projects"
                ? "bg-[var(--vscode-bg)] text-[var(--vscode-fg)] font-semibold shadow-xs"
                : "text-[var(--vscode-sidebar-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            Projects
          </button>
        </div>
      </div>

      {activeTab === "presets" ? (
        <>
          {/* Search & Category Filter */}
          <div className="p-2.5 border-b border-[var(--vscode-border)] space-y-2 bg-[var(--vscode-sidebar-bg)] shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[var(--vscode-sidebar-fg)] opacity-60" />
              <input
                type="text"
                placeholder="Search themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] rounded text-[var(--vscode-input-fg)] placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-[var(--vscode-button-bg)]"
              />
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
              {THEME_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-medium transition cursor-pointer ${
                      isActive
                        ? "bg-[var(--vscode-button-bg)] text-[var(--vscode-button-fg)]"
                        : "bg-[var(--vscode-input-bg)] text-[var(--vscode-sidebar-fg)] hover:bg-[var(--vscode-bg)] border border-[var(--vscode-border)]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-[var(--vscode-sidebar-fg)] opacity-80 font-medium">
              <span>Active: {activeTheme.name}</span>
              <button
                type="button"
                onClick={onRandomTheme}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                title="Randomize Theme"
              >
                <Shuffle className="w-3 h-3" />
                <span>Random</span>
              </button>
            </div>
          </div>

          {/* Theme Palette List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredThemes.length === 0 ? (
              <div className="text-center py-6 text-xs opacity-60">
                No themes found matching "{searchQuery}"
              </div>
            ) : (
              filteredThemes.map((theme, idx) => {
                const isActive = theme.id === activeTheme.id;
                const themeNum = parseInt(theme.id.replace(/\D/g, ""), 10) || idx + 1;
                const bgCss = colorTokenToCss(theme.colors.bg);
                const primaryCss = colorTokenToCss(theme.colors.primary);
                const secondaryCss = colorTokenToCss(theme.colors.secondary);
                const accentCss = colorTokenToCss(theme.colors.accent);
                const ctaCss = colorTokenToCss(theme.colors.cta);

                return (
                  <button
                    type="button"
                    key={theme.id}
                    onClick={() => onSelectTheme(theme)}
                    className={`w-full text-left p-2.5 rounded-lg border transition cursor-pointer ${
                      isActive
                        ? "bg-[var(--vscode-input-bg)] border-[var(--vscode-button-bg)] ring-1 ring-[var(--vscode-button-bg)]/40 shadow-xs"
                        : "bg-[var(--vscode-bg)]/40 border-[var(--vscode-border)] hover:border-[var(--vscode-button-bg)]/50 hover:bg-[var(--vscode-input-bg)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[var(--vscode-input-bg)] text-indigo-400 font-bold border border-[var(--vscode-border)]">
                          #{themeNum}
                        </span>
                        <span className="text-[11px] font-semibold truncate text-[var(--vscode-fg)]">
                          {theme.name}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-3.5 h-3.5 rounded-full bg-[var(--vscode-button-bg)] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1">
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ background: bgCss }}
                        title={`BG: ${bgCss}`}
                      />
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ background: primaryCss }}
                        title={`Primary: ${primaryCss}`}
                      />
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ background: secondaryCss }}
                        title={`Secondary: ${secondaryCss}`}
                      />
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ background: accentCss }}
                        title={`Accent: ${accentCss}`}
                      />
                      <div
                        className="flex-1 h-4 rounded border border-white/20"
                        style={{ background: ctaCss }}
                        title={`CTA: ${ctaCss}`}
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ProjectPanel
            activeProjectSlug={activeProjectSlug}
            onProjectOpened={() => onOpenFullStudio()}
          />
        </div>
      )}
    </div>
  );
};

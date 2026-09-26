import React, { useState, useMemo } from "react";
import { Search, Check, Shuffle, ExternalLink, Sparkles, RefreshCw, SlidersHorizontal, Code, Download, Type } from "lucide-react";
import { PRESET_THEMES, THEME_CATEGORIES, type ThemeConfig } from "../lib/themes-dataset";
import { FALLBACK_GOOGLE_FONTS, loadGoogleFont, getFontFamilyCss, getFontGoogleUrlParam } from "../lib/google-fonts-api";

interface SidebarViewProps {
  activeTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  onRandomTheme: () => void;
  onColorChange: (key: keyof ThemeConfig["colors"], value: string) => void;
  onFontChange: (fontName: string, fontFamily: string, fontGoogleUrl: string) => void;
  onResetTheme: () => void;
  onOpenExport: (tab: "html" | "markdown") => void;
  onOpenFullStudio: () => void;
}

export const SidebarView: React.FC<SidebarViewProps> = ({
  activeTheme,
  onSelectTheme,
  onRandomTheme,
  onColorChange,
  onFontChange,
  onResetTheme,
  onOpenExport,
  onOpenFullStudio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"presets" | "customizer">("presets");

  const filteredThemes = useMemo(() => {
    return PRESET_THEMES.filter((theme) => {
      const matchesCategory =
        selectedCategory === "All" || theme.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.personality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `#${theme.number}`.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleFontSelect = (fontFamilyName: string) => {
    const fontObj = FALLBACK_GOOGLE_FONTS.find((f) => f.family === fontFamilyName);
    const category = fontObj ? fontObj.category : "sans-serif";
    loadGoogleFont(fontFamilyName);
    const cssVal = getFontFamilyCss(fontFamilyName, category);
    const urlParam = getFontGoogleUrlParam(fontFamilyName);
    onFontChange(fontFamilyName, cssVal, urlParam);
  };

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
            onClick={onOpenFullStudio}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-[var(--vscode-button-bg)] text-[var(--vscode-button-fg)] hover:opacity-90 transition font-semibold cursor-pointer shadow-xs"
            title="Open Full Canvas Editor (Cmd+Shift+T)"
          >
            <span>Canvas</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Export Actions Bar in Sidebar */}
        <div className="grid grid-cols-2 gap-1.5 mb-2.5">
          <button
            onClick={() => onOpenExport("html")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition cursor-pointer shadow-xs"
            title="Export full single-file HTML landing page"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export HTML</span>
          </button>
          <button
            onClick={() => onOpenExport("markdown")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition cursor-pointer shadow-xs"
            title="Export AI Prompt spec (.md)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Prompt (.md)</span>
          </button>
        </div>

        {/* View Mode Tabs (100 Themes vs Quick Customize) */}
        <div className="flex rounded-md bg-[var(--vscode-input-bg)] p-0.5 text-[11px] font-medium border border-[var(--vscode-border)]">
          <button
            onClick={() => setActiveTab("presets")}
            className={`flex-1 py-1 text-center rounded transition cursor-pointer ${
              activeTab === "presets"
                ? "bg-[var(--vscode-bg)] text-[var(--vscode-fg)] font-semibold shadow-xs"
                : "text-[var(--vscode-sidebar-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            100 Themes ({filteredThemes.length})
          </button>
          <button
            onClick={() => setActiveTab("customizer")}
            className={`flex-1 py-1 text-center rounded transition cursor-pointer ${
              activeTab === "customizer"
                ? "bg-[var(--vscode-bg)] text-[var(--vscode-fg)] font-semibold shadow-xs"
                : "text-[var(--vscode-sidebar-fg)] opacity-70 hover:opacity-100"
            }`}
          >
            Tuner
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
              <span>Active: #{activeTheme.number} {activeTheme.name}</span>
              <button
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
              filteredThemes.map((theme) => {
                const isActive = theme.id === activeTheme.id;
                return (
                  <button
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
                          #{theme.number}
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
                        style={{ backgroundColor: theme.colors.bg }}
                        title={`BG: ${theme.colors.bg}`}
                      />
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ backgroundColor: theme.colors.primary }}
                        title={`Primary: ${theme.colors.primary}`}
                      />
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title={`Secondary: ${theme.colors.secondary}`}
                      />
                      <div
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ backgroundColor: theme.colors.accent }}
                        title={`Accent: ${theme.colors.accent}`}
                      />
                      <div
                        className="flex-1 h-4 rounded border border-white/20"
                        style={{ background: theme.colors.btnGradient }}
                        title={`Gradient: ${theme.colors.btnGradient}`}
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </>
      ) : (
        /* Tuner / Color Swatches & Dynamic Typography Controls */
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Dynamic Typography Section */}
          <div className="p-2.5 rounded-lg bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                <Type className="w-3.5 h-3.5" />
                <span>Dynamic Google Font</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--vscode-bg)] text-[var(--vscode-fg)] border border-[var(--vscode-border)]">
                {activeTheme.fontName}
              </span>
            </div>

            <select
              value={activeTheme.fontName}
              onChange={(e) => handleFontSelect(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded text-[var(--vscode-fg)] focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {FALLBACK_GOOGLE_FONTS.map((font) => (
                <option key={font.family} value={font.family}>
                  {font.family} ({font.category})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[var(--vscode-border)]">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold">Quick Color Tuner</span>
            </div>
            <button
              onClick={onResetTheme}
              className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              Reset
            </button>
          </div>

          <div className="space-y-3">
            {[
              { key: "bg" as const, label: "Background", val: activeTheme.colors.bg },
              { key: "cardBg" as const, label: "Card / Panel BG", val: activeTheme.colors.cardBg },
              { key: "primary" as const, label: "Primary Accent", val: activeTheme.colors.primary },
              { key: "secondary" as const, label: "Secondary Accent", val: activeTheme.colors.secondary },
              { key: "textColor" as const, label: "Text Color", val: activeTheme.colors.textColor },
              { key: "mutedText" as const, label: "Muted Text", val: activeTheme.colors.mutedText },
            ].map(({ key, label, val }) => (
              <div key={key} className="flex items-center justify-between gap-2 p-2 rounded bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)]">
                <span className="text-[11px] font-medium">{label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={val.startsWith("#") ? val.slice(0, 7) : "#ffffff"}
                    onChange={(e) => onColorChange(key, e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <span className="text-[10px] font-mono opacity-80 uppercase w-14 text-right">
                    {val.slice(0, 7)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenFullStudio}
            className="w-full py-2 px-3 rounded-md bg-[var(--vscode-button-bg)] text-[var(--vscode-button-fg)] text-xs font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer shadow mt-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Interactive Studio Canvas</span>
          </button>
        </div>
      )}
    </div>
  );
};

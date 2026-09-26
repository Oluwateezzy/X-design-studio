import React, { useState, useMemo } from "react";
import { Search, Palette, Check } from "lucide-react";
import { PRESET_THEMES, THEME_CATEGORIES, type ThemeConfig } from "../lib/themes-dataset";

interface ThemeSelectorPanelProps {
  activeThemeId: string;
  onSelectTheme: (theme: ThemeConfig) => void;
}

export const ThemeSelectorPanel: React.FC<ThemeSelectorPanelProps> = ({
  activeThemeId,
  onSelectTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border-r border-slate-800/80 w-full lg:w-80 shrink-0">
      {/* Search Header */}
      <div className="p-3.5 border-b border-slate-800/80 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search 100 themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {THEME_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
          <span>Showing {filteredThemes.length} of {PRESET_THEMES.length} Themes</span>
          <span className="flex items-center gap-1">
            <Palette className="w-3 h-3 text-indigo-400" /> Categorized
          </span>
        </div>

        {filteredThemes.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No themes found matching "{searchQuery}"
          </div>
        ) : (
          filteredThemes.map((theme) => {
            const isActive = theme.id === activeThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className={`w-full text-left p-3 rounded-xl border transition group relative cursor-pointer ${
                  isActive
                    ? "bg-slate-800/90 border-indigo-500 shadow-md shadow-indigo-500/10"
                    : "bg-slate-950/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300">
                        #{theme.number}
                      </span>
                      <span className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300 transition">
                        {theme.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {theme.category}
                    </span>
                  </div>

                  {isActive && (
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Color Swatch Strip */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.colors.bg }}
                    title={`BG: ${theme.colors.bg}`}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.colors.primary }}
                    title={`Primary: ${theme.colors.primary}`}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.colors.accent }}
                    title={`Accent: ${theme.colors.accent}`}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.colors.textColor }}
                    title={`Text: ${theme.colors.textColor}`}
                  />
                  <div
                    className="flex-1 h-5 rounded-md border border-white/20 shadow-sm"
                    style={{ background: theme.colors.btnGradient }}
                    title={`Gradient: ${theme.colors.btnGradient}`}
                  />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

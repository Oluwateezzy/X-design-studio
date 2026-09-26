import React from "react";
import { Sparkles, Code, Download, Shuffle } from "lucide-react";
import type { ThemeConfig } from "../lib/themes-dataset";

interface NavbarProps {
  activeTheme: ThemeConfig;
  onOpenExport: (tab: "html" | "markdown") => void;
  onRandomTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTheme,
  onOpenExport,
  onRandomTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                Strata Studio
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-medium">
                100 Themes
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Active: <span className="font-semibold text-slate-200">#{activeTheme.number} {activeTheme.name}</span> ({activeTheme.category})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onRandomTheme}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold transition cursor-pointer"
            title="Randomize Theme"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Random</span>
          </button>

          <button
            onClick={() => onOpenExport("html")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export HTML Page</span>
          </button>

          <button
            onClick={() => onOpenExport("markdown")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export AI Prompt (.md)</span>
          </button>
        </div>
      </div>
    </header>
  );
};

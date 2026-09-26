import React, { useState, useEffect, useMemo } from "react";
import { X, Search, Key, Check, Type, RefreshCw } from "lucide-react";
import {
  type GoogleFontItem,
  fetchGoogleFontsCatalog,
  getSavedApiKey,
  saveApiKey,
  loadGoogleFont,
  getFontFamilyCss,
  getFontGoogleUrlParam,
} from "../lib/google-fonts-api";

interface FontSelectorModalProps {
  isOpen: boolean;
  activeFontName: string;
  onClose: () => void;
  onSelectFont: (fontName: string, fontFamily: string, fontGoogleUrl: string) => void;
}

export const FontSelectorModal: React.FC<FontSelectorModalProps> = ({
  isOpen,
  activeFontName,
  onClose,
  onSelectFont,
}) => {
  const [apiKey, setApiKeyInput] = useState<string>("");
  const [isApiKeyOpen, setIsApiKeyOpen] = useState<boolean>(false);
  const [fonts, setFonts] = useState<GoogleFontItem[]>([]);
  const [isFromApi, setIsFromApi] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewText, setPreviewText] = useState<string>("Vescrow Multi-Sig Vaults 2026");

  useEffect(() => {
    if (isOpen) {
      const savedKey = getSavedApiKey();
      setApiKeyInput(savedKey);
      loadCatalog(savedKey);
    }
  }, [isOpen]);

  const loadCatalog = async (key?: string) => {
    setIsLoading(true);
    const { items, fromApi } = await fetchGoogleFontsCatalog(key);
    setFonts(items);
    setIsFromApi(fromApi);
    setIsLoading(false);
  };

  const handleSaveApiKey = () => {
    saveApiKey(apiKey);
    loadCatalog(apiKey);
    setIsApiKeyOpen(false);
  };

  const filteredFonts = useMemo(() => {
    return fonts.filter((font) => {
      const matchesCategory =
        selectedCategory === "all" ||
        font.category.toLowerCase().replace(/[^a-z]/g, "") ===
          selectedCategory.toLowerCase().replace(/[^a-z]/g, "");
      const matchesSearch =
        searchQuery.trim() === "" ||
        font.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [fonts, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">
                  Google Fonts Catalog
                </h2>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isFromApi ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                }`}>
                  {isFromApi ? `Live API (${fonts.length} Fonts)` : `Catalog (${fonts.length} Fonts)`}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore typography for Strata Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiKeyOpen(!isApiKeyOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{getSavedApiKey() ? "API Key Configured" : "Add Google API Key"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Configuration Drawer */}
        {isApiKeyOpen && (
          <div className="p-4 bg-slate-950 border-b border-slate-800 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span>Google Webfonts Developer API Key</span>
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline text-[11px]"
              >
                Get Free Key from Google Console →
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Paste AI key or Google Webfonts API Key..."
                value={apiKey}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                Save Key & Reload
              </button>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search fonts by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {["all", "sans-serif", "serif", "monospace", "display", "handwriting"].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {cat === "all" ? "All Fonts" : cat}
                </button>
              );
            })}
          </div>

          {/* Sample text editor */}
          <input
            type="text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            className="w-full sm:w-56 px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            placeholder="Sample preview text..."
            title="Custom preview text"
          />
        </div>

        {/* Font List Cards */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-950">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
              <span className="text-xs">Fetching Google Fonts Catalog...</span>
            </div>
          ) : filteredFonts.length === 0 ? (
            <div className="col-span-full text-center py-16 text-xs text-slate-500">
              No Google Fonts found matching "{searchQuery}"
            </div>
          ) : (
            filteredFonts.map((font) => {
              const isSelected = font.family === activeFontName;
              const familyCss = getFontFamilyCss(font.family, font.category);
              const googleUrl = getFontGoogleUrlParam(font.family);

              return (
                <button
                  key={font.family}
                  onClick={() => {
                    loadGoogleFont(font.family);
                    onSelectFont(font.family, familyCss, googleUrl);
                    onClose();
                  }}
                  onMouseEnter={() => loadGoogleFont(font.family)}
                  className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between gap-3 group relative cursor-pointer ${
                    isSelected
                      ? "bg-slate-800/90 border-indigo-500 shadow-lg shadow-indigo-500/10"
                      : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition">
                        {font.family}
                      </h3>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {font.category}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Sample Preview Text */}
                  <div
                    className="text-base text-slate-200 truncate py-1 border-t border-slate-800/50"
                    style={{ fontFamily: familyCss }}
                  >
                    {previewText || font.family}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { X, Copy, Download, Check, Code, FileText } from "lucide-react";
import type { ThemeConfig } from "../lib/themes-dataset";
import { generateThemeHtml } from "../lib/html-generator";
import { generateThemeMarkdown } from "../lib/markdown-generator";
import { postMessage, onMessage } from "../vscode-bridge";

interface ExportModalProps {
  isOpen: boolean;
  initialTab?: "html" | "markdown";
  activeTheme: ThemeConfig;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  initialTab = "html",
  activeTheme,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"html" | "markdown">(initialTab);
  const [copied, setCopied] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const cleanup = onMessage((msg) => {
      if (msg.type === "fileSaved") {
        setExporting(false);
        if (msg.success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    });
    return cleanup;
  }, []);

  if (!isOpen) return null;

  const htmlContent = generateThemeHtml(activeTheme);
  const markdownContent = generateThemeMarkdown(activeTheme);

  const currentContent = activeTab === "html" ? htmlContent : markdownContent;
  const fileName =
    activeTab === "html"
      ? `strata-theme-${activeTheme.number}-${activeTheme.name.toLowerCase().replace(/\s+/g, "-")}.html`
      : `THEME_SPEC_${activeTheme.number}.md`;

  const handleCopy = () => {
    postMessage({ type: "copyToClipboard", text: currentContent });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setExporting(true);
    postMessage({
      type: "exportFile",
      fileName,
      content: currentContent,
      format: activeTab === "html" ? "html" : "md",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h2 id="export-modal-title" className="text-base font-bold text-slate-100 flex items-center gap-2">
              Export Theme Output
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Theme #{activeTheme.number}: {activeTheme.name}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy or save single-file HTML preview or AI System Prompt Markdown via VS Code
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "html"}
              onClick={() => {
                setActiveTab("html");
                setCopied(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeTab === "html"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Standalone HTML Page (.html)</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "markdown"}
              onClick={() => {
                setActiveTab("markdown");
                setCopied(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeTab === "markdown"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>AI System Prompt MD (THEME_SPEC.md)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              aria-label="Copy output to clipboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={exporting}
              aria-label="Save exported theme file"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-sm cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{exporting ? "Saving..." : "Save File..."}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre-wrap break-all leading-relaxed">
            {currentContent}
          </pre>
        </div>
      </div>
    </div>
  );
};

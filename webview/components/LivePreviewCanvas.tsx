import React, { useState } from "react";
import type { ThemeConfigV2 } from "../lib/types/theme-config-v2";
import { colorTokenToCss } from "../lib/types/color-token";
import { Monitor, Smartphone, ShieldCheck, Lock, ArrowUpRight, CheckCircle2, Clock, DollarSign, Sparkles, Layers } from "lucide-react";

interface LivePreviewCanvasProps {
  theme: ThemeConfigV2;
}

export const LivePreviewCanvas: React.FC<LivePreviewCanvasProps> = ({ theme }) => {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const { colors, typography } = theme;
  const themeNum = parseInt(theme.id.replace(/\D/g, ""), 10) || 1;

  const bgCss = colorTokenToCss(colors.bg);
  const primaryCss = colorTokenToCss(colors.primary);
  const secondaryCss = colorTokenToCss(colors.secondary);
  const accentCss = colorTokenToCss(colors.accent);
  const surfaceCss = colorTokenToCss(colors.surface);
  const surfaceBorderCss = colorTokenToCss(colors.surfaceBorder);
  const textCss = colorTokenToCss(colors.text);
  const textMutedCss = colorTokenToCss(colors.textMuted);
  const ctaCss = colorTokenToCss(colors.cta);
  const badgeBgCss = colorTokenToCss(colors.badge.bg);
  const badgeBorderCss = colorTokenToCss(colors.badge.border);
  const badgeTextCss = colorTokenToCss(colors.badge.text);
  const glow1Css = colorTokenToCss(colors.glow.primary);
  const glow2Css = colorTokenToCss(colors.glow.secondary);
  const successCss = colorTokenToCss(colors.semantic.success);

  const isCtaGradient = Boolean(colors.cta.gradient);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative">
      {/* Device Toolbar */}
      <div className="h-10 bg-slate-900/60 border-b border-slate-800/80 px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Canvas Preview</span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-slate-300">Theme #{themeNum}</span>
          <span className="text-slate-600">•</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> {typography.fontName}
          </span>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`p-1 rounded text-xs flex items-center gap-1.5 transition cursor-pointer ${
              deviceMode === "desktop"
                ? "bg-slate-800 text-slate-100 font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`p-1 rounded text-xs flex items-center gap-1.5 transition cursor-pointer ${
              deviceMode === "mobile"
                ? "bg-slate-800 text-slate-100 font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile View</span>
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          className={`transition-all duration-300 w-full rounded-2xl shadow-2xl border p-6 sm:p-8 relative overflow-hidden animate-slide-up ${
            deviceMode === "mobile" ? "max-w-md" : "max-w-5xl"
          }`}
          style={{
            background: bgCss,
            color: textCss,
            borderColor: surfaceBorderCss,
            fontFamily: typography.fontFamily,
          }}
        >
          {/* Ambient Glowing Floating Orbs */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-60 animate-float-1"
            style={{ background: glow1Css }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-50 animate-float-2"
            style={{ background: glow2Css }}
          />

          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transition hover:scale-110 hover:-rotate-3"
                style={{ background: ctaCss }}
              >
                X
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">X Vault</h2>
                <p className="text-xs opacity-75" style={{ color: textMutedCss }}>
                  Multi-Sig Financial Escrow • Google Font: {typography.fontName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm"
                style={{ background: primaryCss }}
              >
                Primary Fill
              </span>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 animate-soft-pulse"
                style={{
                  background: badgeBgCss,
                  border: `1px solid ${badgeBorderCss}`,
                  color: badgeTextCss,
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{theme.name} Theme</span>
              </div>
            </div>
          </div>

          {/* Hero Banner */}
          <div
            className="rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden backdrop-blur-md border transition"
            style={{
              background: surfaceCss,
              borderColor: surfaceBorderCss,
            }}
          >
            <div className="max-w-xl relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold uppercase tracking-wider block"
                  style={{ color: accentCss }}
                >
                  {theme.category} • Brand Identity
                </span>
                <span
                  className="text-[10px] px-2.5 py-0.5 rounded font-mono text-white font-semibold shadow-sm"
                  style={{ background: secondaryCss }}
                >
                  Secondary Accent
                </span>
              </div>

              {isCtaGradient ? (
                <h1
                  className="text-2xl sm:text-4xl font-black tracking-tight mb-3 leading-tight block"
                  style={{
                    backgroundImage: ctaCss,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {theme.name}
                </h1>
              ) : (
                <h1
                  className="text-2xl sm:text-4xl font-black tracking-tight mb-3 leading-tight block"
                  style={{ color: primaryCss }}
                >
                  {theme.name}
                </h1>
              )}

              <p className="text-sm mb-6 leading-relaxed" style={{ color: textMutedCss }}>
                {theme.personality}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg transition hover:opacity-90 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                  style={{ background: ctaCss }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isCtaGradient ? "Primary CTA (Gradient)" : "Primary CTA (Flat)"}</span>
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white border transition hover:opacity-90 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  style={{
                    background: secondaryCss,
                    borderColor: secondaryCss,
                  }}
                >
                  Secondary Action
                </button>
              </div>
            </div>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
            {/* Balance Card */}
            <div
              className="rounded-xl p-5 border backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: surfaceCss,
                borderColor: surfaceBorderCss,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium" style={{ color: textMutedCss }}>
                  Escrow Vault Balance
                </span>
                <span
                  className="p-1.5 rounded-lg"
                  style={{ background: badgeBgCss, color: badgeTextCss }}
                >
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-extrabold mb-1 tracking-tight">$1,485,200.00</div>
              <p className="text-xs mb-5" style={{ color: textMutedCss }}>
                Instant multi-signature release ready
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white shadow transition hover:opacity-95 text-center cursor-pointer hover:scale-102"
                  style={{ background: primaryCss }}
                >
                  Primary Deposit
                </button>
                <button
                  type="button"
                  className="py-2 px-3 rounded-lg text-xs font-semibold text-white transition hover:opacity-95 cursor-pointer"
                  style={{ background: secondaryCss }}
                >
                  Secondary Rules
                </button>
              </div>
            </div>

            {/* Status Badges & Directives Card */}
            <div
              className="rounded-xl p-5 border backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: surfaceCss,
                borderColor: surfaceBorderCss,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium block" style={{ color: textMutedCss }}>
                  Active Palette Tokens (V2)
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono" style={{ color: accentCss }}>
                  <Layers className="w-3 h-3" /> Live Mapped
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-black/20">
                  <span style={{ color: textMutedCss }}>Primary Token:</span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: primaryCss }}>
                    {colors.primary.hex}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-black/20">
                  <span style={{ color: textMutedCss }}>Secondary Token:</span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: secondaryCss }}>
                    {colors.secondary.hex}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-black/20">
                  <span style={{ color: textMutedCss }}>Accent Glow:</span>
                  <span className="font-mono text-xs font-bold" style={{ color: accentCss }}>
                    {colors.accent.hex}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div
            className="rounded-xl p-5 border backdrop-blur-md relative z-10 transition hover:border-slate-700"
            style={{
              background: surfaceCss,
              borderColor: surfaceBorderCss,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">Recent Escrow Ledger</h3>
              <span className="text-xs flex items-center gap-1 cursor-pointer hover:underline" style={{ color: accentCss }}>
                View All <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b" style={{ borderColor: surfaceBorderCss }}>
                    <th className="py-2.5 font-medium" style={{ color: textMutedCss }}>Escrow ID</th>
                    <th className="py-2.5 font-medium" style={{ color: textMutedCss }}>Counterparty</th>
                    <th className="py-2.5 font-medium" style={{ color: textMutedCss }}>Amount</th>
                    <th className="py-2.5 font-medium" style={{ color: textMutedCss }}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="transition hover:bg-white/5">
                    <td className="py-3 font-mono font-semibold">ESC-9042-881</td>
                    <td className="py-3 font-medium">Apex Global Capital</td>
                    <td className="py-3 font-bold">$450,000.00</td>
                    <td className="py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1"
                        style={{
                          background: badgeBgCss,
                          border: `1px solid ${badgeBorderCss}`,
                          color: badgeTextCss,
                        }}
                      >
                        <Clock className="w-3 h-3" /> In Escrow
                      </span>
                    </td>
                  </tr>
                  <tr className="transition hover:bg-white/5">
                    <td className="py-3 font-mono font-semibold">ESC-8821-104</td>
                    <td className="py-3 font-medium">Aether Robotics Labs</td>
                    <td className="py-3 font-bold">$125,000.00</td>
                    <td className="py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1"
                        style={{
                          background: `${successCss}20`,
                          border: `1px solid ${successCss}40`,
                          color: successCss,
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Released
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


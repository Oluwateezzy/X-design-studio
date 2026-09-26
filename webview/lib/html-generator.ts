import type { ThemeConfig } from "./themes-dataset";

export function generateThemeHtml(theme: ThemeConfig): string {
  const { colors, name, category, personality, number, fontFamily, fontName, fontGoogleUrl } = theme;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strata Studio Theme Showcase - ${name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${fontGoogleUrl}&display=swap" rel="stylesheet">
  <style>
    :root {
      --theme-font: ${fontFamily};
      --theme-bg: ${colors.bg};
      --theme-primary: ${colors.primary};
      --theme-secondary: ${colors.secondary};
      --theme-accent: ${colors.accent};
      --theme-card-bg: ${colors.cardBg};
      --theme-card-border: ${colors.cardBorder};
      --theme-text-color: ${colors.textColor};
      --theme-muted-text: ${colors.mutedText};
      --theme-btn-gradient: ${colors.btnGradient};
      --theme-badge-bg: ${colors.badgeBg};
      --theme-badge-border: ${colors.badgeBorder};
      --theme-badge-text: ${colors.badgeText};
      --theme-hero-glow1: ${colors.heroGlow1};
      --theme-hero-glow2: ${colors.heroGlow2};
      --theme-success: ${colors.success};
      --theme-warning: ${colors.warning};
      --theme-error: ${colors.error};
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Keyframe Animations for Fluid Web Motion */
    @keyframes floatOrb1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(40px, -30px) scale(1.15); }
    }

    @keyframes floatOrb2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(-35px, 25px) scale(1.2); }
    }

    @keyframes pulseBadge {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.04); opacity: 1; }
    }

    @keyframes fadeInSlide {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    body {
      font-family: var(--theme-font);
      background-color: var(--theme-bg);
      color: var(--theme-text-color);
      min-height: 100vh;
      padding: 2.5rem 1.5rem;
      line-height: 1.5;
      animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--theme-card-border);
      margin-bottom: 2.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .brand-logo {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: var(--theme-btn-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #ffffff;
      box-shadow: 0 4px 18px var(--theme-hero-glow1);
      transition: transform 0.3s ease;
    }

    .brand-logo:hover {
      transform: scale(1.08) rotate(-4deg);
    }

    .brand-title {
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.8125rem;
      font-weight: 600;
      background-color: var(--theme-badge-bg);
      border: 1px solid var(--theme-badge-border);
      color: var(--theme-badge-text);
      animation: pulseBadge 3s infinite ease-in-out;
    }

    .hero-section {
      position: relative;
      background: var(--theme-card-bg);
      border: 1px solid var(--theme-card-border);
      border-radius: 24px;
      padding: 3.5rem 2.5rem;
      margin-bottom: 2.5rem;
      overflow: hidden;
      backdrop-filter: blur(16px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }

    .hero-glow {
      position: absolute;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: var(--theme-hero-glow1);
      filter: blur(90px);
      top: -120px;
      right: -80px;
      pointer-events: none;
      animation: floatOrb1 15s infinite ease-in-out;
    }

    .hero-glow-2 {
      position: absolute;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background: var(--theme-hero-glow2);
      filter: blur(80px);
      bottom: -100px;
      left: 10%;
      pointer-events: none;
      animation: floatOrb2 20s infinite ease-in-out;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 720px;
    }

    .hero-tag {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--theme-accent);
      margin-bottom: 0.85rem;
    }

    .hero-title {
      font-size: 2.75rem;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1rem;
      letter-spacing: -0.03em;
    }

    .hero-subtitle {
      font-size: 1.125rem;
      color: var(--theme-muted-text);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .btn-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 1.75rem;
      border-radius: 14px;
      font-weight: 700;
      font-size: 0.9375rem;
      cursor: pointer;
      border: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
    }

    .btn-primary {
      background: var(--theme-btn-gradient);
      color: #ffffff;
      box-shadow: 0 6px 20px var(--theme-hero-glow1);
    }

    .btn-primary:hover {
      opacity: 0.92;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 28px var(--theme-hero-glow1);
    }

    .btn-secondary {
      background: transparent;
      border: 1px solid var(--theme-card-border);
      color: var(--theme-text-color);
    }

    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    .card {
      background: var(--theme-card-bg);
      border: 1px solid var(--theme-card-border);
      border-radius: 18px;
      padding: 1.75rem;
      backdrop-filter: blur(12px);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .card:hover {
      transform: translateY(-3px);
      border-color: var(--theme-accent);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    .card-title {
      font-size: 1.125rem;
      font-weight: 700;
    }

    .wallet-amount {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--theme-text-color);
      margin-bottom: 0.25rem;
      letter-spacing: -0.02em;
    }

    .wallet-label {
      font-size: 0.8125rem;
      color: var(--theme-muted-text);
      margin-bottom: 1.5rem;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--theme-muted-text);
      padding: 0.85rem 0.5rem;
      border-bottom: 1px solid var(--theme-card-border);
    }

    td {
      padding: 1rem 0.5rem;
      font-size: 0.875rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }

    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .swatch-item {
      padding: 0.75rem;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .swatch-color {
      height: 32px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .swatch-name {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .swatch-val {
      font-size: 0.7rem;
      color: var(--theme-muted-text);
      font-family: monospace;
    }

    footer {
      text-align: center;
      padding-top: 2.5rem;
      border-top: 1px solid var(--theme-card-border);
      color: var(--theme-muted-text);
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">
        <div class="brand-logo">S</div>
        <div>
          <div class="brand-title">Strata Studio Showcase</div>
          <div style="font-size: 0.75rem; color: var(--theme-muted-text);">Theme #${number} • ${category} • Font: ${fontName}</div>
        </div>
      </div>
      <div class="badge">
        <span>✨ Active Theme: ${name}</span>
      </div>
    </header>

    <section class="hero-section">
      <div class="hero-glow"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-content">
        <div class="hero-tag">${category} Identity Spec</div>
        <h1 class="hero-title">${name}</h1>
        <p class="hero-subtitle">${personality}</p>
        <div class="btn-group">
          <button class="btn btn-primary">Create Vault</button>
          <button class="btn btn-secondary">Explore Typography & Motion</button>
        </div>
      </div>
    </section>

    <div class="grid-2">
      <!-- Wallet Card -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Vault Liquidity</span>
          <span class="badge">Multisig Secured</span>
        </div>
        <div class="wallet-amount">$1,485,200.00</div>
        <div class="wallet-label">Available for instant multi-sig release</div>
        <div class="btn-group">
          <button class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.8125rem;">Deposit Funds</button>
          <button class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.8125rem;">Withdrawal Rules</button>
        </div>
      </div>

      <!-- Theme Swatches Card -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Typography & Palette</span>
          <span style="font-size: 0.75rem; color: var(--theme-muted-text); font-family: monospace;">Font: ${fontName}</span>
        </div>
        <div class="swatch-grid">
          <div class="swatch-item">
            <div class="swatch-color" style="background: ${colors.bg};"></div>
            <div class="swatch-name">Background</div>
            <div class="swatch-val">${colors.bg}</div>
          </div>
          <div class="swatch-item">
            <div class="swatch-color" style="background: ${colors.primary};"></div>
            <div class="swatch-name">Primary</div>
            <div class="swatch-val">${colors.primary}</div>
          </div>
          <div class="swatch-item">
            <div class="swatch-color" style="background: ${colors.accent};"></div>
            <div class="swatch-name">Accent</div>
            <div class="swatch-val">${colors.accent}</div>
          </div>
          <div class="swatch-item">
            <div class="swatch-color" style="background: ${colors.cardBg};"></div>
            <div class="swatch-name">Surface</div>
            <div class="swatch-val">Translucent</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="card" style="margin-bottom: 2.5rem;">
      <div class="card-header">
        <span class="card-title">Recent Contract Ledger</span>
        <span class="badge">Live Contract Stream</span>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Counterparty</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Security Protocol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-family: monospace; font-weight: 600;">STR-9042-881</td>
              <td>Apex Global Capital</td>
              <td style="font-weight: 700;">$450,000.00</td>
              <td><span class="badge" style="background: ${colors.badgeBg}; border-color: ${colors.badgeBorder}; color: ${colors.badgeText};">In Escrow</span></td>
              <td><span style="color: ${colors.success}; font-weight: 600;">Hardware Multisig</span></td>
            </tr>
            <tr>
              <td style="font-family: monospace; font-weight: 600;">STR-8821-104</td>
              <td>Aether Robotics Labs</td>
              <td style="font-weight: 700;">$125,000.00</td>
              <td><span class="badge" style="background: ${colors.badgeBg}; border-color: ${colors.badgeBorder}; color: ${colors.badgeText};">Released</span></td>
              <td><span style="color: ${colors.success}; font-weight: 600;">Time-locked Vault</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer>
      Generated with Strata Studio • Theme #${number}: ${name} (${category}) • Google Font: ${fontName}
    </footer>
  </div>
</body>
</html>`;
}

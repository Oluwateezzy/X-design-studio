import type { ThemeConfigV2 } from './types/theme-config-v2';

export type { ThemeConfigV2 };

export interface FontOption {
  name: string;
  family: string;
  googleParam: string;
  category: "sans" | "serif" | "mono" | "display";
}

export const AVAILABLE_FONTS: FontOption[] = [
  {
    "name": "Plus Jakarta Sans",
    "family": "'Plus Jakarta Sans', sans-serif",
    "googleParam": "Plus+Jakarta+Sans:wght@400;600;700;800",
    "category": "sans"
  },
  {
    "name": "Outfit",
    "family": "'Outfit', sans-serif",
    "googleParam": "Outfit:wght@400;500;600;700;800",
    "category": "sans"
  },
  {
    "name": "Space Grotesk",
    "family": "'Space Grotesk', sans-serif",
    "googleParam": "Space+Grotesk:wght@400;500;600;700",
    "category": "sans"
  },
  {
    "name": "Syne",
    "family": "'Syne', sans-serif",
    "googleParam": "Syne:wght@500;700;800",
    "category": "display"
  },
  {
    "name": "Cinzel",
    "family": "'Cinzel', serif",
    "googleParam": "Cinzel:wght@500;700;900",
    "category": "serif"
  },
  {
    "name": "Playfair Display",
    "family": "'Playfair Display', serif",
    "googleParam": "Playfair+Display:ital,wght@0,600;0,800;1,400",
    "category": "serif"
  },
  {
    "name": "Instrument Serif",
    "family": "'Instrument Serif', serif",
    "googleParam": "Instrument+Serif:ital@0;1",
    "category": "serif"
  },
  {
    "name": "JetBrains Mono",
    "family": "'JetBrains Mono', monospace",
    "googleParam": "JetBrains+Mono:wght@400;500;700",
    "category": "mono"
  },
  {
    "name": "Inter",
    "family": "'Inter', sans-serif",
    "googleParam": "Inter:wght@400;500;600;700;800",
    "category": "sans"
  },
  {
    "name": "Press Start 2P",
    "family": "'Press Start 2P', cursive",
    "googleParam": "Press+Start+2P",
    "category": "display"
  }
];

export const THEME_CATEGORIES = [
  "All",
  "High-Trust Fintech",
  "Cyberpunk & Sci-Fi",
  "Dark Luxury & Obsidian",
  "Neon & Synthesizer",
  "Neo-Brutalist & Bold",
  "Warm Editorial & Paper",
  "Organic Earth & Biophilic",
  "Monochromatic Minimal",
  "Deep Space & Cosmic",
  "Retro & Vintage"
];

export const PRESET_THEMES: ThemeConfigV2[] = [
  {
    "id": "theme-1",
    "version": 2,
    "name": "Obsidian Vault",
    "category": "High-Trust Fintech",
    "personality": "Ultra-secure corporate escrow, bank-level encryption feel",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0F19",
        "gradient": null
      },
      "primary": {
        "hex": "#1E3A8A",
        "gradient": null
      },
      "secondary": {
        "hex": "#3B82F6",
        "gradient": null
      },
      "accent": {
        "hex": "#10B981",
        "gradient": null
      },
      "surface": {
        "hex": "#111827",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#1E3A8A",
        "gradient": null
      },
      "text": {
        "hex": "#F3F4F6",
        "gradient": null
      },
      "textMuted": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "cta": {
        "hex": "#1E3A8A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#10B981",
          "gradient": null
        },
        "border": {
          "hex": "#10B981",
          "gradient": null
        },
        "text": {
          "hex": "#34D399",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#3B82F6",
          "gradient": null
        },
        "secondary": {
          "hex": "#10B981",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1E3A8A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-2",
    "version": 2,
    "name": "Midnight Sapphire",
    "category": "High-Trust Fintech",
    "personality": "Deep ocean corporate trust with glowing cyan accents",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A1128",
        "gradient": null
      },
      "primary": {
        "hex": "#1C2541",
        "gradient": null
      },
      "secondary": {
        "hex": "#475569",
        "gradient": null
      },
      "accent": {
        "hex": "#00F5D4",
        "gradient": null
      },
      "surface": {
        "hex": "#0B132B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#00F5D4",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#8D99AE",
        "gradient": null
      },
      "cta": {
        "hex": "#1C2541",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#00F5D4",
          "gradient": null
        },
        "border": {
          "hex": "#00F5D4",
          "gradient": null
        },
        "text": {
          "hex": "#00F5D4",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#00B4D8",
          "gradient": null
        },
        "secondary": {
          "hex": "#00F5D4",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#00F5D4",
          "gradient": null
        },
        "warning": {
          "hex": "#FFB703",
          "gradient": null
        },
        "error": {
          "hex": "#FF0054",
          "gradient": null
        },
        "info": {
          "hex": "#1C2541",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-3",
    "version": 2,
    "name": "Sovereign Gold",
    "category": "High-Trust Fintech",
    "personality": "Institutional wealth management, premium bullion aesthetic",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0D0D0D",
        "gradient": null
      },
      "primary": {
        "hex": "#D4AF37",
        "gradient": null
      },
      "secondary": {
        "hex": "#AA7C11",
        "gradient": null
      },
      "accent": {
        "hex": "#F3E5AB",
        "gradient": null
      },
      "surface": {
        "hex": "#1A1A1A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D4AF37",
        "gradient": null
      },
      "text": {
        "hex": "#F9FAFB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A1A1AA",
        "gradient": null
      },
      "cta": {
        "hex": "#D4AF37",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D4AF37",
          "gradient": null
        },
        "border": {
          "hex": "#D4AF37",
          "gradient": null
        },
        "text": {
          "hex": "#F3E5AB",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D4AF37",
          "gradient": null
        },
        "secondary": {
          "hex": "#AA7C11",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#D4AF37",
          "gradient": null
        },
        "error": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "info": {
          "hex": "#D4AF37",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-4",
    "version": 2,
    "name": "Federal Mint",
    "category": "High-Trust Fintech",
    "personality": "Monetary policy authority with rich emerald and platinum",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#061A14",
        "gradient": null
      },
      "primary": {
        "hex": "#0D5C46",
        "gradient": null
      },
      "secondary": {
        "hex": "#14B8A6",
        "gradient": null
      },
      "accent": {
        "hex": "#34D399",
        "gradient": null
      },
      "surface": {
        "hex": "#0A261E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#14B8A6",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#6EE7B7",
        "gradient": null
      },
      "cta": {
        "hex": "#0D5C46",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#34D399",
          "gradient": null
        },
        "border": {
          "hex": "#34D399",
          "gradient": null
        },
        "text": {
          "hex": "#34D399",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#14B8A6",
          "gradient": null
        },
        "secondary": {
          "hex": "#34D399",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "error": {
          "hex": "#F87171",
          "gradient": null
        },
        "info": {
          "hex": "#0D5C46",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-5",
    "version": 2,
    "name": "Capital Platinum",
    "category": "High-Trust Fintech",
    "personality": "Cool silver slate with sharp ice blue precision highlights",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F172A",
        "gradient": null
      },
      "primary": {
        "hex": "#334155",
        "gradient": null
      },
      "secondary": {
        "hex": "#64748B",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#1E293B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "text": {
        "hex": "#F8FAFC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#94A3B8",
        "gradient": null
      },
      "cta": {
        "hex": "#334155",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#38BDF8",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "secondary": {
          "hex": "#0284C7",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#22C55E",
          "gradient": null
        },
        "warning": {
          "hex": "#EAB308",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#334155",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-6",
    "version": 2,
    "name": "Cobalt Citadel",
    "category": "High-Trust Fintech",
    "personality": "Ultra-solid deep navy fortress with vibrant cobalt blue core",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#090D16",
        "gradient": null
      },
      "primary": {
        "hex": "#1D4ED8",
        "gradient": null
      },
      "secondary": {
        "hex": "#3B82F6",
        "gradient": null
      },
      "accent": {
        "hex": "#60A5FA",
        "gradient": null
      },
      "surface": {
        "hex": "#111827",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#3B82F6",
        "gradient": null
      },
      "text": {
        "hex": "#F9FAFB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "cta": {
        "hex": "#1D4ED8",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#3B82F6",
          "gradient": null
        },
        "border": {
          "hex": "#3B82F6",
          "gradient": null
        },
        "text": {
          "hex": "#60A5FA",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#1D4ED8",
          "gradient": null
        },
        "secondary": {
          "hex": "#60A5FA",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1D4ED8",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-7",
    "version": 2,
    "name": "Titanium Escrow",
    "category": "High-Trust Fintech",
    "personality": "Industrial security, heavy metallic feel with cyan borders",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#111827",
        "gradient": null
      },
      "primary": {
        "hex": "#374151",
        "gradient": null
      },
      "secondary": {
        "hex": "#4B5563",
        "gradient": null
      },
      "accent": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "surface": {
        "hex": "#1F2937",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "text": {
        "hex": "#F9FAFB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "cta": {
        "hex": "#374151",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "border": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "text": {
          "hex": "#22D3EE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "secondary": {
          "hex": "#0EA5E9",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#374151",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-8",
    "version": 2,
    "name": "Prussian Reserve",
    "category": "High-Trust Fintech",
    "personality": "Classic European banking heritage combined with modern UI depth",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B132B",
        "gradient": null
      },
      "primary": {
        "hex": "#1C2541",
        "gradient": null
      },
      "secondary": {
        "hex": "#3A506B",
        "gradient": null
      },
      "accent": {
        "hex": "#5BC0BE",
        "gradient": null
      },
      "surface": {
        "hex": "#1C2541",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#5BC0BE",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A5B4FC",
        "gradient": null
      },
      "cta": {
        "hex": "#1C2541",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#5BC0BE",
          "gradient": null
        },
        "border": {
          "hex": "#5BC0BE",
          "gradient": null
        },
        "text": {
          "hex": "#5BC0BE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#5BC0BE",
          "gradient": null
        },
        "secondary": {
          "hex": "#3A506B",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1C2541",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-9",
    "version": 2,
    "name": "Emerald Sovereign",
    "category": "High-Trust Fintech",
    "personality": "Deep rich emerald luxury with gold badge highlights",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#022C22",
        "gradient": null
      },
      "primary": {
        "hex": "#064E3B",
        "gradient": null
      },
      "secondary": {
        "hex": "#047857",
        "gradient": null
      },
      "accent": {
        "hex": "#F59E0B",
        "gradient": null
      },
      "surface": {
        "hex": "#064E3B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F59E0B",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A7F3D0",
        "gradient": null
      },
      "cta": {
        "hex": "#064E3B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "border": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "text": {
          "hex": "#FBBF24",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#10B981",
          "gradient": null
        },
        "secondary": {
          "hex": "#F59E0B",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#064E3B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-10",
    "version": 2,
    "name": "Alpine Trust",
    "category": "High-Trust Fintech",
    "personality": "Swiss banking crispness with ice turquoise clarity",
    "typography": {
      "fontFamily": "'Plus Jakarta Sans', sans-serif",
      "fontName": "Plus Jakarta Sans",
      "fontGoogleUrl": "Plus+Jakarta+Sans:wght@400;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#081C24",
        "gradient": null
      },
      "primary": {
        "hex": "#0E3A47",
        "gradient": null
      },
      "secondary": {
        "hex": "#155E75",
        "gradient": null
      },
      "accent": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "surface": {
        "hex": "#0E3A47",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "text": {
        "hex": "#F0FDFA",
        "gradient": null
      },
      "textMuted": {
        "hex": "#99F6E4",
        "gradient": null
      },
      "cta": {
        "hex": "#0E3A47",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "border": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "text": {
          "hex": "#22D3EE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "secondary": {
          "hex": "#22D3EE",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#0E3A47",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-11",
    "version": 2,
    "name": "Neon Gridlock",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "High-contrast cyberpunk grid with magenta and cyan neon luminescence",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#080312",
        "gradient": null
      },
      "primary": {
        "hex": "#7C3AED",
        "gradient": null
      },
      "secondary": {
        "hex": "#DB2777",
        "gradient": null
      },
      "accent": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "surface": {
        "hex": "#130924",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#DB2777",
        "gradient": null
      },
      "text": {
        "hex": "#FDF2F8",
        "gradient": null
      },
      "textMuted": {
        "hex": "#F472B6",
        "gradient": null
      },
      "cta": {
        "hex": "#7C3AED",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "border": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "text": {
          "hex": "#22D3EE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#DB2777",
          "gradient": null
        },
        "secondary": {
          "hex": "#06B6D4",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "info": {
          "hex": "#7C3AED",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-12",
    "version": 2,
    "name": "Matrix Override",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Phosphor green terminal matrix vibe on pitch void background",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#030A05",
        "gradient": null
      },
      "primary": {
        "hex": "#052E16",
        "gradient": null
      },
      "secondary": {
        "hex": "#14532D",
        "gradient": null
      },
      "accent": {
        "hex": "#22C55E",
        "gradient": null
      },
      "surface": {
        "hex": "#061A0E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#22C55E",
        "gradient": null
      },
      "text": {
        "hex": "#DCFCE7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#4ADE80",
        "gradient": null
      },
      "cta": {
        "hex": "#052E16",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#22C55E",
          "gradient": null
        },
        "border": {
          "hex": "#22C55E",
          "gradient": null
        },
        "text": {
          "hex": "#4ADE80",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#22C55E",
          "gradient": null
        },
        "secondary": {
          "hex": "#4ADE80",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#22C55E",
          "gradient": null
        },
        "warning": {
          "hex": "#EAB308",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#052E16",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-13",
    "version": 2,
    "name": "Cyber Crimson",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Tactical red alert sci-fi interface for high-frequency transactions",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F0507",
        "gradient": null
      },
      "primary": {
        "hex": "#881337",
        "gradient": null
      },
      "secondary": {
        "hex": "#E11D48",
        "gradient": null
      },
      "accent": {
        "hex": "#FB7185",
        "gradient": null
      },
      "surface": {
        "hex": "#1C090F",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E11D48",
        "gradient": null
      },
      "text": {
        "hex": "#FFF1F2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDA4AF",
        "gradient": null
      },
      "cta": {
        "hex": "#881337",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "border": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "text": {
          "hex": "#FB7185",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E11D48",
          "gradient": null
        },
        "secondary": {
          "hex": "#FB7185",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "info": {
          "hex": "#881337",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-14",
    "version": 2,
    "name": "Synthwave Sunset",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "80s retrofuturistic sunset grid with warm magenta to violet fades",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#18062B",
        "gradient": null
      },
      "primary": {
        "hex": "#581C87",
        "gradient": null
      },
      "secondary": {
        "hex": "#C084FC",
        "gradient": null
      },
      "accent": {
        "hex": "#F43F5E",
        "gradient": null
      },
      "surface": {
        "hex": "#260C40",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#C084FC",
        "gradient": null
      },
      "text": {
        "hex": "#FAF5FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#E9D5FF",
        "gradient": null
      },
      "cta": {
        "hex": "#581C87",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "border": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "text": {
          "hex": "#FB7185",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#A855F7",
          "gradient": null
        },
        "secondary": {
          "hex": "#EC4899",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#581C87",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-15",
    "version": 2,
    "name": "Sub-Zero Cryo",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Cryogenic sci-fi module with frosted glass ice cyan reflections",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#03141D",
        "gradient": null
      },
      "primary": {
        "hex": "#0C4A6E",
        "gradient": null
      },
      "secondary": {
        "hex": "#0284C7",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#0C4A6E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "text": {
        "hex": "#F0F9FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#BAE6FD",
        "gradient": null
      },
      "cta": {
        "hex": "#0C4A6E",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#7DD3FC",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "secondary": {
          "hex": "#0EA5E9",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "error": {
          "hex": "#F87171",
          "gradient": null
        },
        "info": {
          "hex": "#0C4A6E",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-16",
    "version": 2,
    "name": "Akira Neo-Tokyo",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Hyper-urban Japanese cyberpunk aesthetic with neon orange pop",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0914",
        "gradient": null
      },
      "primary": {
        "hex": "#311B92",
        "gradient": null
      },
      "secondary": {
        "hex": "#FF6D00",
        "gradient": null
      },
      "accent": {
        "hex": "#FFD600",
        "gradient": null
      },
      "surface": {
        "hex": "#141026",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FF6D00",
        "gradient": null
      },
      "text": {
        "hex": "#FFF8E1",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FFB74D",
        "gradient": null
      },
      "cta": {
        "hex": "#311B92",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FFD600",
          "gradient": null
        },
        "border": {
          "hex": "#FFD600",
          "gradient": null
        },
        "text": {
          "hex": "#FFD600",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FF6D00",
          "gradient": null
        },
        "secondary": {
          "hex": "#FFD600",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#00E676",
          "gradient": null
        },
        "warning": {
          "hex": "#FF9100",
          "gradient": null
        },
        "error": {
          "hex": "#FF1744",
          "gradient": null
        },
        "info": {
          "hex": "#311B92",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-17",
    "version": 2,
    "name": "Quantum Void",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Deep space particle physics chamber with electric ultraviolet beams",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#050014",
        "gradient": null
      },
      "primary": {
        "hex": "#2E0854",
        "gradient": null
      },
      "secondary": {
        "hex": "#8B5CF6",
        "gradient": null
      },
      "accent": {
        "hex": "#C084FC",
        "gradient": null
      },
      "surface": {
        "hex": "#14052D",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#8B5CF6",
        "gradient": null
      },
      "text": {
        "hex": "#F5F3FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#DDD6FE",
        "gradient": null
      },
      "cta": {
        "hex": "#2E0854",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#C084FC",
          "gradient": null
        },
        "border": {
          "hex": "#C084FC",
          "gradient": null
        },
        "text": {
          "hex": "#E9D5FF",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#8B5CF6",
          "gradient": null
        },
        "secondary": {
          "hex": "#C084FC",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2E0854",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-18",
    "version": 2,
    "name": "Solar Flare",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Intense coronal mass ejection theme with blinding amber plasma glow",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#140700",
        "gradient": null
      },
      "primary": {
        "hex": "#7C2D12",
        "gradient": null
      },
      "secondary": {
        "hex": "#EA580C",
        "gradient": null
      },
      "accent": {
        "hex": "#F97316",
        "gradient": null
      },
      "surface": {
        "hex": "#240E03",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#EA580C",
        "gradient": null
      },
      "text": {
        "hex": "#FFF7ED",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDBA74",
        "gradient": null
      },
      "cta": {
        "hex": "#7C2D12",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F97316",
          "gradient": null
        },
        "border": {
          "hex": "#F97316",
          "gradient": null
        },
        "text": {
          "hex": "#FFEDD5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#EA580C",
          "gradient": null
        },
        "secondary": {
          "hex": "#F97316",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#7C2D12",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-19",
    "version": 2,
    "name": "Holographic Prism",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Multi-spectrum holographic glass interface with iridescent edge shifts",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A0D1B",
        "gradient": null
      },
      "primary": {
        "hex": "#1E1B4B",
        "gradient": null
      },
      "secondary": {
        "hex": "#6366F1",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#191C37",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#6366F1",
        "gradient": null
      },
      "text": {
        "hex": "#EEF2FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#C7D2FE",
        "gradient": null
      },
      "cta": {
        "hex": "#1E1B4B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#38BDF8",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#6366F1",
          "gradient": null
        },
        "secondary": {
          "hex": "#06B6D4",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1E1B4B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-20",
    "version": 2,
    "name": "Bio-Luminescent Deep",
    "category": "Cyberpunk & Sci-Fi",
    "personality": "Abyssal trench marine organism teal-emerald pulsing radiance",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#01161B",
        "gradient": null
      },
      "primary": {
        "hex": "#042F2E",
        "gradient": null
      },
      "secondary": {
        "hex": "#0D9488",
        "gradient": null
      },
      "accent": {
        "hex": "#2DD4BF",
        "gradient": null
      },
      "surface": {
        "hex": "#052E2C",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#2DD4BF",
        "gradient": null
      },
      "text": {
        "hex": "#F0FDFA",
        "gradient": null
      },
      "textMuted": {
        "hex": "#99F6E4",
        "gradient": null
      },
      "cta": {
        "hex": "#042F2E",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#2DD4BF",
          "gradient": null
        },
        "border": {
          "hex": "#2DD4BF",
          "gradient": null
        },
        "text": {
          "hex": "#5EEAD4",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#0D9488",
          "gradient": null
        },
        "secondary": {
          "hex": "#2DD4BF",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#2DD4BF",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#042F2E",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-21",
    "version": 2,
    "name": "Champagne Velvet",
    "category": "Dark Luxury & Obsidian",
    "personality": "Ultra-luxury VIP private banking with soft champagne silk highlights",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0E0C0A",
        "gradient": null
      },
      "primary": {
        "hex": "#26201A",
        "gradient": null
      },
      "secondary": {
        "hex": "#8C7355",
        "gradient": null
      },
      "accent": {
        "hex": "#E6C594",
        "gradient": null
      },
      "surface": {
        "hex": "#1C1814",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E6C594",
        "gradient": null
      },
      "text": {
        "hex": "#FDFBF7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#C5B8A5",
        "gradient": null
      },
      "cta": {
        "hex": "#26201A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E6C594",
          "gradient": null
        },
        "border": {
          "hex": "#E6C594",
          "gradient": null
        },
        "text": {
          "hex": "#E6C594",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E6C594",
          "gradient": null
        },
        "secondary": {
          "hex": "#8C7355",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#E6C594",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#26201A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-22",
    "version": 2,
    "name": "Rose Quartz Gold",
    "category": "Dark Luxury & Obsidian",
    "personality": "Sophisticated blush bronze and rose gold accents over ebony base",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#120B0E",
        "gradient": null
      },
      "primary": {
        "hex": "#2D1B22",
        "gradient": null
      },
      "secondary": {
        "hex": "#9E5A73",
        "gradient": null
      },
      "accent": {
        "hex": "#F4B8C7",
        "gradient": null
      },
      "surface": {
        "hex": "#21141A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F4B8C7",
        "gradient": null
      },
      "text": {
        "hex": "#FFF5F7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D8A3B2",
        "gradient": null
      },
      "cta": {
        "hex": "#2D1B22",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F4B8C7",
          "gradient": null
        },
        "border": {
          "hex": "#F4B8C7",
          "gradient": null
        },
        "text": {
          "hex": "#F4B8C7",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F4B8C7",
          "gradient": null
        },
        "secondary": {
          "hex": "#9E5A73",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2D1B22",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-23",
    "version": 2,
    "name": "Black Card Onyx",
    "category": "Dark Luxury & Obsidian",
    "personality": "Exclusive invite-only credit card aesthetic, matte black with silver trim",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#050505",
        "gradient": null
      },
      "primary": {
        "hex": "#171717",
        "gradient": null
      },
      "secondary": {
        "hex": "#404040",
        "gradient": null
      },
      "accent": {
        "hex": "#E5E5E5",
        "gradient": null
      },
      "surface": {
        "hex": "#171717",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E5E5E5",
        "gradient": null
      },
      "text": {
        "hex": "#FAFAFA",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A3A3A3",
        "gradient": null
      },
      "cta": {
        "hex": "#171717",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E5E5E5",
          "gradient": null
        },
        "border": {
          "hex": "#E5E5E5",
          "gradient": null
        },
        "text": {
          "hex": "#FAFAFA",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#737373",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#171717",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-24",
    "version": 2,
    "name": "Imperial Amethyst",
    "category": "Dark Luxury & Obsidian",
    "personality": "Royal deep purple and gold trim, aristocratic high-end finance",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0D0814",
        "gradient": null
      },
      "primary": {
        "hex": "#261438",
        "gradient": null
      },
      "secondary": {
        "hex": "#6B21A8",
        "gradient": null
      },
      "accent": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "surface": {
        "hex": "#1E102C",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "text": {
        "hex": "#FAF5FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D8B4FE",
        "gradient": null
      },
      "cta": {
        "hex": "#261438",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "border": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "text": {
          "hex": "#FCD34D",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#6B21A8",
          "gradient": null
        },
        "secondary": {
          "hex": "#FBBF24",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#261438",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-25",
    "version": 2,
    "name": "Mayfair Midnight",
    "category": "Dark Luxury & Obsidian",
    "personality": "London private club vibe with rich mahogany undertones and warm amber",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F0B09",
        "gradient": null
      },
      "primary": {
        "hex": "#2B1A12",
        "gradient": null
      },
      "secondary": {
        "hex": "#78350F",
        "gradient": null
      },
      "accent": {
        "hex": "#F59E0B",
        "gradient": null
      },
      "surface": {
        "hex": "#21140E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F59E0B",
        "gradient": null
      },
      "text": {
        "hex": "#FFFBEB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDE68A",
        "gradient": null
      },
      "cta": {
        "hex": "#2B1A12",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "border": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "text": {
          "hex": "#FBBF24",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "secondary": {
          "hex": "#78350F",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2B1A12",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-26",
    "version": 2,
    "name": "Patek Platinum",
    "category": "Dark Luxury & Obsidian",
    "personality": "Horology craftsmanship luxury, polished slate with steel-blue hands",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0E14",
        "gradient": null
      },
      "primary": {
        "hex": "#1E293B",
        "gradient": null
      },
      "secondary": {
        "hex": "#475569",
        "gradient": null
      },
      "accent": {
        "hex": "#94A3B8",
        "gradient": null
      },
      "surface": {
        "hex": "#18212F",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#94A3B8",
        "gradient": null
      },
      "text": {
        "hex": "#F8FAFC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#CBD5E1",
        "gradient": null
      },
      "cta": {
        "hex": "#1E293B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#94A3B8",
          "gradient": null
        },
        "border": {
          "hex": "#94A3B8",
          "gradient": null
        },
        "text": {
          "hex": "#E2E8F0",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#94A3B8",
          "gradient": null
        },
        "secondary": {
          "hex": "#475569",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1E293B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-27",
    "version": 2,
    "name": "Bronze Sovereign",
    "category": "Dark Luxury & Obsidian",
    "personality": "Patinated architectural bronze with warm burnished highlights",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#100D0A",
        "gradient": null
      },
      "primary": {
        "hex": "#2A1F18",
        "gradient": null
      },
      "secondary": {
        "hex": "#6E472D",
        "gradient": null
      },
      "accent": {
        "hex": "#D48B54",
        "gradient": null
      },
      "surface": {
        "hex": "#201812",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D48B54",
        "gradient": null
      },
      "text": {
        "hex": "#FDF8F5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D1BCAE",
        "gradient": null
      },
      "cta": {
        "hex": "#2A1F18",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D48B54",
          "gradient": null
        },
        "border": {
          "hex": "#D48B54",
          "gradient": null
        },
        "text": {
          "hex": "#E5AA7E",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D48B54",
          "gradient": null
        },
        "secondary": {
          "hex": "#6E472D",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2A1F18",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-28",
    "version": 2,
    "name": "Obsidian Pearl",
    "category": "Dark Luxury & Obsidian",
    "personality": "Glossy black pearl iridescence with subtle mauve reflections",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0A0F",
        "gradient": null
      },
      "primary": {
        "hex": "#1B1724",
        "gradient": null
      },
      "secondary": {
        "hex": "#4C3B5C",
        "gradient": null
      },
      "accent": {
        "hex": "#C3B1E1",
        "gradient": null
      },
      "surface": {
        "hex": "#18141F",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#C3B1E1",
        "gradient": null
      },
      "text": {
        "hex": "#FAF8FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#B6A7CA",
        "gradient": null
      },
      "cta": {
        "hex": "#1B1724",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#C3B1E1",
          "gradient": null
        },
        "border": {
          "hex": "#C3B1E1",
          "gradient": null
        },
        "text": {
          "hex": "#D8CCEE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#C3B1E1",
          "gradient": null
        },
        "secondary": {
          "hex": "#4C3B5C",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1B1724",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-29",
    "version": 2,
    "name": "Tuscan Walnut",
    "category": "Dark Luxury & Obsidian",
    "personality": "Italian leather goods aesthetic, espresso base with terracotta accents",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0D0907",
        "gradient": null
      },
      "primary": {
        "hex": "#281B14",
        "gradient": null
      },
      "secondary": {
        "hex": "#7C3F26",
        "gradient": null
      },
      "accent": {
        "hex": "#E07A5F",
        "gradient": null
      },
      "surface": {
        "hex": "#1E140F",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E07A5F",
        "gradient": null
      },
      "text": {
        "hex": "#FAF0EC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D3B2A5",
        "gradient": null
      },
      "cta": {
        "hex": "#281B14",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E07A5F",
          "gradient": null
        },
        "border": {
          "hex": "#E07A5F",
          "gradient": null
        },
        "text": {
          "hex": "#F4A261",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E07A5F",
          "gradient": null
        },
        "secondary": {
          "hex": "#7C3F26",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#281B14",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-30",
    "version": 2,
    "name": "Venetian Velvet",
    "category": "Dark Luxury & Obsidian",
    "personality": "Deep burgundy luxury with warm copper wire frame details",
    "typography": {
      "fontFamily": "'Cinzel', serif",
      "fontName": "Cinzel",
      "fontGoogleUrl": "Cinzel:wght@500;700;900",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#100508",
        "gradient": null
      },
      "primary": {
        "hex": "#310A14",
        "gradient": null
      },
      "secondary": {
        "hex": "#80132A",
        "gradient": null
      },
      "accent": {
        "hex": "#E85D75",
        "gradient": null
      },
      "surface": {
        "hex": "#240911",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E85D75",
        "gradient": null
      },
      "text": {
        "hex": "#FFF0F3",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D69AA6",
        "gradient": null
      },
      "cta": {
        "hex": "#310A14",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E85D75",
          "gradient": null
        },
        "border": {
          "hex": "#E85D75",
          "gradient": null
        },
        "text": {
          "hex": "#FF758F",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E85D75",
          "gradient": null
        },
        "secondary": {
          "hex": "#80132A",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#310A14",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-31",
    "version": 2,
    "name": "Electric Violet",
    "category": "Neon & Synthesizer",
    "personality": "Vibrant electro-pop theme with pulsing neon violet and electric pink",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A0118",
        "gradient": null
      },
      "primary": {
        "hex": "#4C1D95",
        "gradient": null
      },
      "secondary": {
        "hex": "#8B5CF6",
        "gradient": null
      },
      "accent": {
        "hex": "#F43F5E",
        "gradient": null
      },
      "surface": {
        "hex": "#1A0934",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#8B5CF6",
        "gradient": null
      },
      "text": {
        "hex": "#F5F3FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#C4B5FD",
        "gradient": null
      },
      "cta": {
        "hex": "#4C1D95",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "border": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "text": {
          "hex": "#FB7185",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#8B5CF6",
          "gradient": null
        },
        "secondary": {
          "hex": "#F43F5E",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#4C1D95",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-32",
    "version": 2,
    "name": "Acid Lime Pulse",
    "category": "Neon & Synthesizer",
    "personality": "Ultra-modern club synth aesthetic with blinding acid lime accents",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#070F03",
        "gradient": null
      },
      "primary": {
        "hex": "#1A3A07",
        "gradient": null
      },
      "secondary": {
        "hex": "#4D7C0F",
        "gradient": null
      },
      "accent": {
        "hex": "#84CC16",
        "gradient": null
      },
      "surface": {
        "hex": "#122608",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#84CC16",
        "gradient": null
      },
      "text": {
        "hex": "#F7FEE7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#BEF264",
        "gradient": null
      },
      "cta": {
        "hex": "#1A3A07",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#84CC16",
          "gradient": null
        },
        "border": {
          "hex": "#84CC16",
          "gradient": null
        },
        "text": {
          "hex": "#A3E635",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#84CC16",
          "gradient": null
        },
        "secondary": {
          "hex": "#4D7C0F",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#84CC16",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1A3A07",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-33",
    "version": 2,
    "name": "Cyber Coral Glow",
    "category": "Neon & Synthesizer",
    "personality": "Vibrant coral and turquoise neon pairing, tropical synthesizer feel",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0813",
        "gradient": null
      },
      "primary": {
        "hex": "#3B0764",
        "gradient": null
      },
      "secondary": {
        "hex": "#F43F5E",
        "gradient": null
      },
      "accent": {
        "hex": "#2DD4BF",
        "gradient": null
      },
      "surface": {
        "hex": "#180A26",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F43F5E",
        "gradient": null
      },
      "text": {
        "hex": "#FFF1F2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDA4AF",
        "gradient": null
      },
      "cta": {
        "hex": "#3B0764",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#2DD4BF",
          "gradient": null
        },
        "border": {
          "hex": "#2DD4BF",
          "gradient": null
        },
        "text": {
          "hex": "#5EEAD4",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "secondary": {
          "hex": "#2DD4BF",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#2DD4BF",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#3B0764",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-34",
    "version": 2,
    "name": "Laser Amber",
    "category": "Neon & Synthesizer",
    "personality": "Laser tag arena amber beam with deep charcoal contrast",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0D0900",
        "gradient": null
      },
      "primary": {
        "hex": "#451A03",
        "gradient": null
      },
      "secondary": {
        "hex": "#D97706",
        "gradient": null
      },
      "accent": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "surface": {
        "hex": "#1E1202",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "text": {
        "hex": "#FEF3C7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FCD34D",
        "gradient": null
      },
      "cta": {
        "hex": "#451A03",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "border": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "text": {
          "hex": "#FDE68A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "secondary": {
          "hex": "#D97706",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#451A03",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-35",
    "version": 2,
    "name": "Vaporwave Dream",
    "category": "Neon & Synthesizer",
    "personality": "Pastel synth aesthetic with lavender clouds and soft cyan neon glow",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#100926",
        "gradient": null
      },
      "primary": {
        "hex": "#3B1578",
        "gradient": null
      },
      "secondary": {
        "hex": "#A855F7",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#1D113D",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#A855F7",
        "gradient": null
      },
      "text": {
        "hex": "#FAF5FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#E9D5FF",
        "gradient": null
      },
      "cta": {
        "hex": "#3B1578",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#7DD3FC",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#A855F7",
          "gradient": null
        },
        "secondary": {
          "hex": "#38BDF8",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "error": {
          "hex": "#F87171",
          "gradient": null
        },
        "info": {
          "hex": "#3B1578",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-36",
    "version": 2,
    "name": "Hyperdrive Cyan",
    "category": "Neon & Synthesizer",
    "personality": "Warp speed star trail cyan streaks over pitch black space",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#020B14",
        "gradient": null
      },
      "primary": {
        "hex": "#075985",
        "gradient": null
      },
      "secondary": {
        "hex": "#0284C7",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#072B44",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "text": {
        "hex": "#F0F9FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#7DD3FC",
        "gradient": null
      },
      "cta": {
        "hex": "#075985",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#BAE6FD",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "secondary": {
          "hex": "#0284C7",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#075985",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-37",
    "version": 2,
    "name": "Tokyo Hotline",
    "category": "Neon & Synthesizer",
    "personality": "Late night arcade glow with magenta hotline pink borders",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#12030E",
        "gradient": null
      },
      "primary": {
        "hex": "#701A75",
        "gradient": null
      },
      "secondary": {
        "hex": "#C026D3",
        "gradient": null
      },
      "accent": {
        "hex": "#F472B6",
        "gradient": null
      },
      "surface": {
        "hex": "#26092C",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#C026D3",
        "gradient": null
      },
      "text": {
        "hex": "#FDF4FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#F5D0FE",
        "gradient": null
      },
      "cta": {
        "hex": "#701A75",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F472B6",
          "gradient": null
        },
        "border": {
          "hex": "#F472B6",
          "gradient": null
        },
        "text": {
          "hex": "#FBCFE8",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#C026D3",
          "gradient": null
        },
        "secondary": {
          "hex": "#F472B6",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#701A75",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-38",
    "version": 2,
    "name": "Plasma Surge",
    "category": "Neon & Synthesizer",
    "personality": "Ionized gas plasma glow with vivid electric blue-green discharge",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#02120D",
        "gradient": null
      },
      "primary": {
        "hex": "#064E3B",
        "gradient": null
      },
      "secondary": {
        "hex": "#059669",
        "gradient": null
      },
      "accent": {
        "hex": "#34D399",
        "gradient": null
      },
      "surface": {
        "hex": "#073024",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#34D399",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#6EE7B7",
        "gradient": null
      },
      "cta": {
        "hex": "#064E3B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#34D399",
          "gradient": null
        },
        "border": {
          "hex": "#34D399",
          "gradient": null
        },
        "text": {
          "hex": "#A7F3D0",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#34D399",
          "gradient": null
        },
        "secondary": {
          "hex": "#059669",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#064E3B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-39",
    "version": 2,
    "name": "Inferno Synth",
    "category": "Neon & Synthesizer",
    "personality": "Searing lava synth atmosphere with bright blood orange sparks",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#170303",
        "gradient": null
      },
      "primary": {
        "hex": "#7F1D1D",
        "gradient": null
      },
      "secondary": {
        "hex": "#DC2626",
        "gradient": null
      },
      "accent": {
        "hex": "#F97316",
        "gradient": null
      },
      "surface": {
        "hex": "#2B0909",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#DC2626",
        "gradient": null
      },
      "text": {
        "hex": "#FEF2F2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FCA5A5",
        "gradient": null
      },
      "cta": {
        "hex": "#7F1D1D",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F97316",
          "gradient": null
        },
        "border": {
          "hex": "#F97316",
          "gradient": null
        },
        "text": {
          "hex": "#FDBA74",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#DC2626",
          "gradient": null
        },
        "secondary": {
          "hex": "#F97316",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#7F1D1D",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-40",
    "version": 2,
    "name": "Ultraviolet Ray",
    "category": "Neon & Synthesizer",
    "personality": "Blacklight glow with fluorescing violet and neon teal contrasts",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#07021A",
        "gradient": null
      },
      "primary": {
        "hex": "#3B0764",
        "gradient": null
      },
      "secondary": {
        "hex": "#7E22CE",
        "gradient": null
      },
      "accent": {
        "hex": "#22D3EE",
        "gradient": null
      },
      "surface": {
        "hex": "#180732",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#7E22CE",
        "gradient": null
      },
      "text": {
        "hex": "#FAF5FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#DDD6FE",
        "gradient": null
      },
      "cta": {
        "hex": "#3B0764",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#22D3EE",
          "gradient": null
        },
        "border": {
          "hex": "#22D3EE",
          "gradient": null
        },
        "text": {
          "hex": "#A5F3FC",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#7E22CE",
          "gradient": null
        },
        "secondary": {
          "hex": "#22D3EE",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#3B0764",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-41",
    "version": 2,
    "name": "High Voltage Industrial",
    "category": "Neo-Brutalist & Bold",
    "personality": "Heavy industrial contrast, hazard yellow accents on dark cast iron",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#121212",
        "gradient": null
      },
      "primary": {
        "hex": "#262626",
        "gradient": null
      },
      "secondary": {
        "hex": "#EAB308",
        "gradient": null
      },
      "accent": {
        "hex": "#FACC15",
        "gradient": null
      },
      "surface": {
        "hex": "#262626",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FACC15",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D4D4D4",
        "gradient": null
      },
      "cta": {
        "hex": "#262626",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FACC15",
          "gradient": null
        },
        "border": {
          "hex": "#FACC15",
          "gradient": null
        },
        "text": {
          "hex": "#FEF08A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FACC15",
          "gradient": null
        },
        "secondary": {
          "hex": "#EAB308",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#22C55E",
          "gradient": null
        },
        "warning": {
          "hex": "#FACC15",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#262626",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-42",
    "version": 2,
    "name": "Tactical Concrete",
    "category": "Neo-Brutalist & Bold",
    "personality": "Raw concrete grey foundation with high-visibility safety orange",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#1C1917",
        "gradient": null
      },
      "primary": {
        "hex": "#292524",
        "gradient": null
      },
      "secondary": {
        "hex": "#F97316",
        "gradient": null
      },
      "accent": {
        "hex": "#FB923C",
        "gradient": null
      },
      "surface": {
        "hex": "#292524",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F97316",
        "gradient": null
      },
      "text": {
        "hex": "#FAFAF9",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D6D3D1",
        "gradient": null
      },
      "cta": {
        "hex": "#292524",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F97316",
          "gradient": null
        },
        "border": {
          "hex": "#F97316",
          "gradient": null
        },
        "text": {
          "hex": "#FFEDD5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F97316",
          "gradient": null
        },
        "secondary": {
          "hex": "#EA580C",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#292524",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-43",
    "version": 2,
    "name": "Architectural Slate",
    "category": "Neo-Brutalist & Bold",
    "personality": "Monolithic architectural blueprint with crisp electric blue trim",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F172A",
        "gradient": null
      },
      "primary": {
        "hex": "#1E293B",
        "gradient": null
      },
      "secondary": {
        "hex": "#2563EB",
        "gradient": null
      },
      "accent": {
        "hex": "#60A5FA",
        "gradient": null
      },
      "surface": {
        "hex": "#1E293B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#2563EB",
        "gradient": null
      },
      "text": {
        "hex": "#F8FAFC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#CBD5E1",
        "gradient": null
      },
      "cta": {
        "hex": "#1E293B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#60A5FA",
          "gradient": null
        },
        "border": {
          "hex": "#60A5FA",
          "gradient": null
        },
        "text": {
          "hex": "#BFDBFE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#2563EB",
          "gradient": null
        },
        "secondary": {
          "hex": "#60A5FA",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1E293B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-44",
    "version": 2,
    "name": "Monochrome Impact",
    "category": "Neo-Brutalist & Bold",
    "personality": "Stark black-and-white editorial contrast with sharp structural lines",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A0A0A",
        "gradient": null
      },
      "primary": {
        "hex": "#262626",
        "gradient": null
      },
      "secondary": {
        "hex": "#525252",
        "gradient": null
      },
      "accent": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "surface": {
        "hex": "#171717",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A3A3A3",
        "gradient": null
      },
      "cta": {
        "hex": "#262626",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "border": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "text": {
          "hex": "#FFFFFF",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#A3A3A3",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#22C55E",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#262626",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-45",
    "version": 2,
    "name": "Signal Red Command",
    "category": "Neo-Brutalist & Bold",
    "personality": "Command center aesthetic with heavy signal red accents",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#140A0C",
        "gradient": null
      },
      "primary": {
        "hex": "#2C1217",
        "gradient": null
      },
      "secondary": {
        "hex": "#DC2626",
        "gradient": null
      },
      "accent": {
        "hex": "#EF4444",
        "gradient": null
      },
      "surface": {
        "hex": "#261015",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#DC2626",
        "gradient": null
      },
      "text": {
        "hex": "#FEF2F2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FCA5A5",
        "gradient": null
      },
      "cta": {
        "hex": "#2C1217",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#EF4444",
          "gradient": null
        },
        "border": {
          "hex": "#EF4444",
          "gradient": null
        },
        "text": {
          "hex": "#FEE2E2",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#DC2626",
          "gradient": null
        },
        "secondary": {
          "hex": "#EF4444",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2C1217",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-46",
    "version": 2,
    "name": "Radar Emerald",
    "category": "Neo-Brutalist & Bold",
    "personality": "Military sonar screen contrast with thick emerald borders",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#051610",
        "gradient": null
      },
      "primary": {
        "hex": "#0B2E22",
        "gradient": null
      },
      "secondary": {
        "hex": "#059669",
        "gradient": null
      },
      "accent": {
        "hex": "#10B981",
        "gradient": null
      },
      "surface": {
        "hex": "#0B2E22",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#10B981",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#6EE7B7",
        "gradient": null
      },
      "cta": {
        "hex": "#0B2E22",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#10B981",
          "gradient": null
        },
        "border": {
          "hex": "#10B981",
          "gradient": null
        },
        "text": {
          "hex": "#D1FAE5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#10B981",
          "gradient": null
        },
        "secondary": {
          "hex": "#059669",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#0B2E22",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-47",
    "version": 2,
    "name": "Bauhaus Primary",
    "category": "Neo-Brutalist & Bold",
    "personality": "Constructivist design movement with primary blue, yellow, and black",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F141C",
        "gradient": null
      },
      "primary": {
        "hex": "#1D2636",
        "gradient": null
      },
      "secondary": {
        "hex": "#2563EB",
        "gradient": null
      },
      "accent": {
        "hex": "#FACC15",
        "gradient": null
      },
      "surface": {
        "hex": "#1D2636",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FACC15",
        "gradient": null
      },
      "text": {
        "hex": "#F8FAFC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#94A3B8",
        "gradient": null
      },
      "cta": {
        "hex": "#1D2636",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FACC15",
          "gradient": null
        },
        "border": {
          "hex": "#FACC15",
          "gradient": null
        },
        "text": {
          "hex": "#FEF08A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#2563EB",
          "gradient": null
        },
        "secondary": {
          "hex": "#FACC15",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#FACC15",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1D2636",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-48",
    "version": 2,
    "name": "Bunker Steel",
    "category": "Neo-Brutalist & Bold",
    "personality": "Subterranean vault aesthetic, cold steel plates with iron rivets",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#11161B",
        "gradient": null
      },
      "primary": {
        "hex": "#1F2937",
        "gradient": null
      },
      "secondary": {
        "hex": "#4B5563",
        "gradient": null
      },
      "accent": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "surface": {
        "hex": "#1F2937",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "text": {
        "hex": "#F9FAFB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D1D5DB",
        "gradient": null
      },
      "cta": {
        "hex": "#1F2937",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#9CA3AF",
          "gradient": null
        },
        "border": {
          "hex": "#9CA3AF",
          "gradient": null
        },
        "text": {
          "hex": "#F3F4F6",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#9CA3AF",
          "gradient": null
        },
        "secondary": {
          "hex": "#4B5563",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1F2937",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-49",
    "version": 2,
    "name": "Hyper-Block Magenta",
    "category": "Neo-Brutalist & Bold",
    "personality": "Blocky poster graphic design feel with high-saturation magenta frames",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#160613",
        "gradient": null
      },
      "primary": {
        "hex": "#330C2D",
        "gradient": null
      },
      "secondary": {
        "hex": "#C026D3",
        "gradient": null
      },
      "accent": {
        "hex": "#E879F9",
        "gradient": null
      },
      "surface": {
        "hex": "#330C2D",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#C026D3",
        "gradient": null
      },
      "text": {
        "hex": "#FDF4FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#F5D0FE",
        "gradient": null
      },
      "cta": {
        "hex": "#330C2D",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E879F9",
          "gradient": null
        },
        "border": {
          "hex": "#E879F9",
          "gradient": null
        },
        "text": {
          "hex": "#FAE8FF",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#C026D3",
          "gradient": null
        },
        "secondary": {
          "hex": "#E879F9",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#330C2D",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-50",
    "version": 2,
    "name": "Hazard Cyber Yellow",
    "category": "Neo-Brutalist & Bold",
    "personality": "Safety-critical infrastructure control board with vivid electric warning gold",
    "typography": {
      "fontFamily": "'Syne', sans-serif",
      "fontName": "Syne",
      "fontGoogleUrl": "Syne:wght@500;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#141103",
        "gradient": null
      },
      "primary": {
        "hex": "#2E2707",
        "gradient": null
      },
      "secondary": {
        "hex": "#D97706",
        "gradient": null
      },
      "accent": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "surface": {
        "hex": "#2E2707",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "text": {
        "hex": "#FEF3C7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FCD34D",
        "gradient": null
      },
      "cta": {
        "hex": "#2E2707",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "border": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "text": {
          "hex": "#FEF08A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "secondary": {
          "hex": "#D97706",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2E2707",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-51",
    "version": 2,
    "name": "Nordic Parchment",
    "category": "Warm Editorial & Paper",
    "personality": "High-end Scandinavian publishing feel with warm parchment and dark ink",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#161412",
        "gradient": null
      },
      "primary": {
        "hex": "#2A2622",
        "gradient": null
      },
      "secondary": {
        "hex": "#786C5E",
        "gradient": null
      },
      "accent": {
        "hex": "#D4C5B9",
        "gradient": null
      },
      "surface": {
        "hex": "#2A2622",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D4C5B9",
        "gradient": null
      },
      "text": {
        "hex": "#F7F4F0",
        "gradient": null
      },
      "textMuted": {
        "hex": "#C7BCAF",
        "gradient": null
      },
      "cta": {
        "hex": "#2A2622",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D4C5B9",
          "gradient": null
        },
        "border": {
          "hex": "#D4C5B9",
          "gradient": null
        },
        "text": {
          "hex": "#E8DFD5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D4C5B9",
          "gradient": null
        },
        "secondary": {
          "hex": "#786C5E",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2A2622",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-52",
    "version": 2,
    "name": "Espresso Library",
    "category": "Warm Editorial & Paper",
    "personality": "Deep roasted coffee bean with warm cream ink and bronze bookbinding",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#120D0A",
        "gradient": null
      },
      "primary": {
        "hex": "#2C1E18",
        "gradient": null
      },
      "secondary": {
        "hex": "#794A3A",
        "gradient": null
      },
      "accent": {
        "hex": "#DDA15E",
        "gradient": null
      },
      "surface": {
        "hex": "#2C1E18",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#DDA15E",
        "gradient": null
      },
      "text": {
        "hex": "#FEFAE0",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D4C3A3",
        "gradient": null
      },
      "cta": {
        "hex": "#2C1E18",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#DDA15E",
          "gradient": null
        },
        "border": {
          "hex": "#DDA15E",
          "gradient": null
        },
        "text": {
          "hex": "#F4A261",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#DDA15E",
          "gradient": null
        },
        "secondary": {
          "hex": "#794A3A",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#606C38",
          "gradient": null
        },
        "warning": {
          "hex": "#DDA15E",
          "gradient": null
        },
        "error": {
          "hex": "#BC6C25",
          "gradient": null
        },
        "info": {
          "hex": "#2C1E18",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-53",
    "version": 2,
    "name": "Terracotta Journal",
    "category": "Warm Editorial & Paper",
    "personality": "Warm Mediterranean clay pot tones with natural papyrus contrast",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#170F0D",
        "gradient": null
      },
      "primary": {
        "hex": "#38201A",
        "gradient": null
      },
      "secondary": {
        "hex": "#9A4832",
        "gradient": null
      },
      "accent": {
        "hex": "#E27D60",
        "gradient": null
      },
      "surface": {
        "hex": "#38201A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E27D60",
        "gradient": null
      },
      "text": {
        "hex": "#FFF8F6",
        "gradient": null
      },
      "textMuted": {
        "hex": "#E0B7AD",
        "gradient": null
      },
      "cta": {
        "hex": "#38201A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E27D60",
          "gradient": null
        },
        "border": {
          "hex": "#E27D60",
          "gradient": null
        },
        "text": {
          "hex": "#E89B85",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E27D60",
          "gradient": null
        },
        "secondary": {
          "hex": "#9A4832",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#38201A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-54",
    "version": 2,
    "name": "Sage & Linen",
    "category": "Warm Editorial & Paper",
    "personality": "Calming botanical herbarium aesthetic with muted sage green and warm linen",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0E1411",
        "gradient": null
      },
      "primary": {
        "hex": "#212F29",
        "gradient": null
      },
      "secondary": {
        "hex": "#52796F",
        "gradient": null
      },
      "accent": {
        "hex": "#84A98C",
        "gradient": null
      },
      "surface": {
        "hex": "#212F29",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#84A98C",
        "gradient": null
      },
      "text": {
        "hex": "#F4F7F5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#CAD2C5",
        "gradient": null
      },
      "cta": {
        "hex": "#212F29",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#84A98C",
          "gradient": null
        },
        "border": {
          "hex": "#84A98C",
          "gradient": null
        },
        "text": {
          "hex": "#A3B18A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#84A98C",
          "gradient": null
        },
        "secondary": {
          "hex": "#52796F",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#84A98C",
          "gradient": null
        },
        "warning": {
          "hex": "#E9C46A",
          "gradient": null
        },
        "error": {
          "hex": "#E76F51",
          "gradient": null
        },
        "info": {
          "hex": "#212F29",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-55",
    "version": 2,
    "name": "Sienna Gazette",
    "category": "Warm Editorial & Paper",
    "personality": "Classic broadsheet newspaper tone with burnt sienna headings",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#16110E",
        "gradient": null
      },
      "primary": {
        "hex": "#33251E",
        "gradient": null
      },
      "secondary": {
        "hex": "#8B4513",
        "gradient": null
      },
      "accent": {
        "hex": "#D2691E",
        "gradient": null
      },
      "surface": {
        "hex": "#33251E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D2691E",
        "gradient": null
      },
      "text": {
        "hex": "#FFFBF7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D9C3B0",
        "gradient": null
      },
      "cta": {
        "hex": "#33251E",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D2691E",
          "gradient": null
        },
        "border": {
          "hex": "#D2691E",
          "gradient": null
        },
        "text": {
          "hex": "#E08B47",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D2691E",
          "gradient": null
        },
        "secondary": {
          "hex": "#8B4513",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#33251E",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-56",
    "version": 2,
    "name": "Charcoal Monograph",
    "category": "Warm Editorial & Paper",
    "personality": "Literary journal aesthetic with soft charcoal ink and bone white text",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#141414",
        "gradient": null
      },
      "primary": {
        "hex": "#282828",
        "gradient": null
      },
      "secondary": {
        "hex": "#5C5C5C",
        "gradient": null
      },
      "accent": {
        "hex": "#B8B8B8",
        "gradient": null
      },
      "surface": {
        "hex": "#282828",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#B8B8B8",
        "gradient": null
      },
      "text": {
        "hex": "#F5F5F7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#CCCCCC",
        "gradient": null
      },
      "cta": {
        "hex": "#282828",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#B8B8B8",
          "gradient": null
        },
        "border": {
          "hex": "#B8B8B8",
          "gradient": null
        },
        "text": {
          "hex": "#E0E0E0",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#B8B8B8",
          "gradient": null
        },
        "secondary": {
          "hex": "#5C5C5C",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#282828",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-57",
    "version": 2,
    "name": "Sepia Archive",
    "category": "Warm Editorial & Paper",
    "personality": "Archival document preservation feel with warm sepia ink accents",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#14100C",
        "gradient": null
      },
      "primary": {
        "hex": "#2D221A",
        "gradient": null
      },
      "secondary": {
        "hex": "#735741",
        "gradient": null
      },
      "accent": {
        "hex": "#C2A68C",
        "gradient": null
      },
      "surface": {
        "hex": "#2D221A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#C2A68C",
        "gradient": null
      },
      "text": {
        "hex": "#FDFBF7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#CFC0B2",
        "gradient": null
      },
      "cta": {
        "hex": "#2D221A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#C2A68C",
          "gradient": null
        },
        "border": {
          "hex": "#C2A68C",
          "gradient": null
        },
        "text": {
          "hex": "#DBC7B5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#C2A68C",
          "gradient": null
        },
        "secondary": {
          "hex": "#735741",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2D221A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-58",
    "version": 2,
    "name": "Oatmeal & Copper",
    "category": "Warm Editorial & Paper",
    "personality": "Artisanal studio aesthetic with textured oatmeal backdrop and raw copper",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#151210",
        "gradient": null
      },
      "primary": {
        "hex": "#2E2622",
        "gradient": null
      },
      "secondary": {
        "hex": "#8C5E47",
        "gradient": null
      },
      "accent": {
        "hex": "#D98A6C",
        "gradient": null
      },
      "surface": {
        "hex": "#2E2622",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D98A6C",
        "gradient": null
      },
      "text": {
        "hex": "#FAF6F3",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D4C2B8",
        "gradient": null
      },
      "cta": {
        "hex": "#2E2622",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D98A6C",
          "gradient": null
        },
        "border": {
          "hex": "#D98A6C",
          "gradient": null
        },
        "text": {
          "hex": "#E5A992",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D98A6C",
          "gradient": null
        },
        "secondary": {
          "hex": "#8C5E47",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2E2622",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-59",
    "version": 2,
    "name": "Olive Manuscript",
    "category": "Warm Editorial & Paper",
    "personality": "Old-world botanical manuscript with deep Mediterranean olive green",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#11140E",
        "gradient": null
      },
      "primary": {
        "hex": "#262E1F",
        "gradient": null
      },
      "secondary": {
        "hex": "#5B6B46",
        "gradient": null
      },
      "accent": {
        "hex": "#9BB07B",
        "gradient": null
      },
      "surface": {
        "hex": "#262E1F",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#9BB07B",
        "gradient": null
      },
      "text": {
        "hex": "#F6FAF2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#C8D6B5",
        "gradient": null
      },
      "cta": {
        "hex": "#262E1F",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#9BB07B",
          "gradient": null
        },
        "border": {
          "hex": "#9BB07B",
          "gradient": null
        },
        "text": {
          "hex": "#B7C99C",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#9BB07B",
          "gradient": null
        },
        "secondary": {
          "hex": "#5B6B46",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#9BB07B",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#262E1F",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-60",
    "version": 2,
    "name": "Crimson Edition",
    "category": "Warm Editorial & Paper",
    "personality": "Collector's hardcover edition with deep crimson cloth binding and gold foil stamp",
    "typography": {
      "fontFamily": "'Instrument Serif', serif",
      "fontName": "Instrument Serif",
      "fontGoogleUrl": "Instrument+Serif:ital@0;1",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#140A0C",
        "gradient": null
      },
      "primary": {
        "hex": "#331219",
        "gradient": null
      },
      "secondary": {
        "hex": "#851D31",
        "gradient": null
      },
      "accent": {
        "hex": "#D97706",
        "gradient": null
      },
      "surface": {
        "hex": "#331219",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D97706",
        "gradient": null
      },
      "text": {
        "hex": "#FFF5F7",
        "gradient": null
      },
      "textMuted": {
        "hex": "#E5B3BC",
        "gradient": null
      },
      "cta": {
        "hex": "#331219",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D97706",
          "gradient": null
        },
        "border": {
          "hex": "#D97706",
          "gradient": null
        },
        "text": {
          "hex": "#FBBF24",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#851D31",
          "gradient": null
        },
        "secondary": {
          "hex": "#D97706",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#331219",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-61",
    "version": 2,
    "name": "Amazon Canopy",
    "category": "Organic Earth & Biophilic",
    "personality": "Lush tropical rainforest canopy with vibrant flora highlights",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#05160E",
        "gradient": null
      },
      "primary": {
        "hex": "#0D3825",
        "gradient": null
      },
      "secondary": {
        "hex": "#1B7B50",
        "gradient": null
      },
      "accent": {
        "hex": "#34D399",
        "gradient": null
      },
      "surface": {
        "hex": "#0D3825",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#34D399",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A7F3D0",
        "gradient": null
      },
      "cta": {
        "hex": "#0D3825",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#34D399",
          "gradient": null
        },
        "border": {
          "hex": "#34D399",
          "gradient": null
        },
        "text": {
          "hex": "#6EE7B7",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#34D399",
          "gradient": null
        },
        "secondary": {
          "hex": "#1B7B50",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#0D3825",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-62",
    "version": 2,
    "name": "Sahara Dune",
    "category": "Organic Earth & Biophilic",
    "personality": "Warm desert sandscape with glowing amber sunset sky reflections",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#16100A",
        "gradient": null
      },
      "primary": {
        "hex": "#332214",
        "gradient": null
      },
      "secondary": {
        "hex": "#A05E2B",
        "gradient": null
      },
      "accent": {
        "hex": "#F59E0B",
        "gradient": null
      },
      "surface": {
        "hex": "#332214",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F59E0B",
        "gradient": null
      },
      "text": {
        "hex": "#FFFBEB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDE68A",
        "gradient": null
      },
      "cta": {
        "hex": "#332214",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "border": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "text": {
          "hex": "#FBBF24",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "secondary": {
          "hex": "#A05E2B",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#332214",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-63",
    "version": 2,
    "name": "Redwood Forest",
    "category": "Organic Earth & Biophilic",
    "personality": "Ancient Californian redwood bark with mossy undergrowth green",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#120B09",
        "gradient": null
      },
      "primary": {
        "hex": "#2B1611",
        "gradient": null
      },
      "secondary": {
        "hex": "#6E2D1E",
        "gradient": null
      },
      "accent": {
        "hex": "#10B981",
        "gradient": null
      },
      "surface": {
        "hex": "#2B1611",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#10B981",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A7F3D0",
        "gradient": null
      },
      "cta": {
        "hex": "#2B1611",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#10B981",
          "gradient": null
        },
        "border": {
          "hex": "#10B981",
          "gradient": null
        },
        "text": {
          "hex": "#34D399",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#10B981",
          "gradient": null
        },
        "secondary": {
          "hex": "#6E2D1E",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2B1611",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-64",
    "version": 2,
    "name": "Pacific Fjord",
    "category": "Organic Earth & Biophilic",
    "personality": "Deep glacial ocean fjord water with misty pine green shoreline",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A1418",
        "gradient": null
      },
      "primary": {
        "hex": "#162B33",
        "gradient": null
      },
      "secondary": {
        "hex": "#2E5B6D",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#162B33",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "text": {
        "hex": "#F0F9FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#BAE6FD",
        "gradient": null
      },
      "cta": {
        "hex": "#162B33",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#7DD3FC",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "secondary": {
          "hex": "#2E5B6D",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#162B33",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-65",
    "version": 2,
    "name": "Volcanic Basalt",
    "category": "Organic Earth & Biophilic",
    "personality": "Cooling lava rock basalt with glowing magma fissures underneath",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F0B0A",
        "gradient": null
      },
      "primary": {
        "hex": "#261916",
        "gradient": null
      },
      "secondary": {
        "hex": "#7C2D12",
        "gradient": null
      },
      "accent": {
        "hex": "#F97316",
        "gradient": null
      },
      "surface": {
        "hex": "#261916",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F97316",
        "gradient": null
      },
      "text": {
        "hex": "#FFF7ED",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FFEDD5",
        "gradient": null
      },
      "cta": {
        "hex": "#261916",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F97316",
          "gradient": null
        },
        "border": {
          "hex": "#F97316",
          "gradient": null
        },
        "text": {
          "hex": "#FDBA74",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F97316",
          "gradient": null
        },
        "secondary": {
          "hex": "#7C2D12",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#261916",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-66",
    "version": 2,
    "name": "Celtic Moss",
    "category": "Organic Earth & Biophilic",
    "personality": "Misty Irish countryside rock face with velvety green moss carpet",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0C120C",
        "gradient": null
      },
      "primary": {
        "hex": "#1C2A1C",
        "gradient": null
      },
      "secondary": {
        "hex": "#3E5C3E",
        "gradient": null
      },
      "accent": {
        "hex": "#76A076",
        "gradient": null
      },
      "surface": {
        "hex": "#1C2A1C",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#76A076",
        "gradient": null
      },
      "text": {
        "hex": "#F4FAF4",
        "gradient": null
      },
      "textMuted": {
        "hex": "#B6D0B6",
        "gradient": null
      },
      "cta": {
        "hex": "#1C2A1C",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#76A076",
          "gradient": null
        },
        "border": {
          "hex": "#76A076",
          "gradient": null
        },
        "text": {
          "hex": "#A3C7A3",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#76A076",
          "gradient": null
        },
        "secondary": {
          "hex": "#3E5C3E",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#76A076",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1C2A1C",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-67",
    "version": 2,
    "name": "Amber Resin",
    "category": "Organic Earth & Biophilic",
    "personality": "Fossilized tree sap resin with translucent golden honey luminescence",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#140D04",
        "gradient": null
      },
      "primary": {
        "hex": "#33200A",
        "gradient": null
      },
      "secondary": {
        "hex": "#8C5411",
        "gradient": null
      },
      "accent": {
        "hex": "#E09F3E",
        "gradient": null
      },
      "surface": {
        "hex": "#33200A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E09F3E",
        "gradient": null
      },
      "text": {
        "hex": "#FFFBF2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#E5C89D",
        "gradient": null
      },
      "cta": {
        "hex": "#33200A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E09F3E",
          "gradient": null
        },
        "border": {
          "hex": "#E09F3E",
          "gradient": null
        },
        "text": {
          "hex": "#F3C57B",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E09F3E",
          "gradient": null
        },
        "secondary": {
          "hex": "#8C5411",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#E09F3E",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#33200A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-68",
    "version": 2,
    "name": "Savanna Twilight",
    "category": "Organic Earth & Biophilic",
    "personality": "African savanna horizon dusk with deep indigo sky and burnt ochre ground",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#100C16",
        "gradient": null
      },
      "primary": {
        "hex": "#261B36",
        "gradient": null
      },
      "secondary": {
        "hex": "#6B3A7D",
        "gradient": null
      },
      "accent": {
        "hex": "#E07A5F",
        "gradient": null
      },
      "surface": {
        "hex": "#261B36",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E07A5F",
        "gradient": null
      },
      "text": {
        "hex": "#FAF5FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#D8B4FE",
        "gradient": null
      },
      "cta": {
        "hex": "#261B36",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E07A5F",
          "gradient": null
        },
        "border": {
          "hex": "#E07A5F",
          "gradient": null
        },
        "text": {
          "hex": "#F4A261",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#6B3A7D",
          "gradient": null
        },
        "secondary": {
          "hex": "#E07A5F",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#261B36",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-69",
    "version": 2,
    "name": "Glacial Iceberg",
    "category": "Organic Earth & Biophilic",
    "personality": "Deep antarctic blue glacial ice shelf with translucent turquoise core",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#05131A",
        "gradient": null
      },
      "primary": {
        "hex": "#0B2A38",
        "gradient": null
      },
      "secondary": {
        "hex": "#175B7A",
        "gradient": null
      },
      "accent": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "surface": {
        "hex": "#0B2A38",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "text": {
        "hex": "#ECFEFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A5F3FC",
        "gradient": null
      },
      "cta": {
        "hex": "#0B2A38",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "border": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "text": {
          "hex": "#67E8F9",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "secondary": {
          "hex": "#175B7A",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#0B2A38",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-70",
    "version": 2,
    "name": "Clay Quarry",
    "category": "Organic Earth & Biophilic",
    "personality": "Open pit terracotta clay mine with warm rust red and sandstone earth",
    "typography": {
      "fontFamily": "'Outfit', sans-serif",
      "fontName": "Outfit",
      "fontGoogleUrl": "Outfit:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#160C0A",
        "gradient": null
      },
      "primary": {
        "hex": "#381B15",
        "gradient": null
      },
      "secondary": {
        "hex": "#8B3A2B",
        "gradient": null
      },
      "accent": {
        "hex": "#D96B43",
        "gradient": null
      },
      "surface": {
        "hex": "#381B15",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D96B43",
        "gradient": null
      },
      "text": {
        "hex": "#FFF8F6",
        "gradient": null
      },
      "textMuted": {
        "hex": "#E7BEB3",
        "gradient": null
      },
      "cta": {
        "hex": "#381B15",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D96B43",
          "gradient": null
        },
        "border": {
          "hex": "#D96B43",
          "gradient": null
        },
        "text": {
          "hex": "#E88D6A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D96B43",
          "gradient": null
        },
        "secondary": {
          "hex": "#8B3A2B",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#381B15",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-71",
    "version": 2,
    "name": "Pure Graphite",
    "category": "Monochromatic Minimal",
    "personality": "Ultra-clean pencil graphite gradient hierarchy with precise white text",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#121212",
        "gradient": null
      },
      "primary": {
        "hex": "#1E1E1E",
        "gradient": null
      },
      "secondary": {
        "hex": "#3A3A3A",
        "gradient": null
      },
      "accent": {
        "hex": "#707070",
        "gradient": null
      },
      "surface": {
        "hex": "#1E1E1E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#707070",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A0A0A0",
        "gradient": null
      },
      "cta": {
        "hex": "#1E1E1E",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#707070",
          "gradient": null
        },
        "border": {
          "hex": "#707070",
          "gradient": null
        },
        "text": {
          "hex": "#E0E0E0",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#707070",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1E1E1E",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-72",
    "version": 2,
    "name": "Slate Minimal",
    "category": "Monochromatic Minimal",
    "personality": "Cool slate stone monochrome simplicity with ice white UI badges",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F172A",
        "gradient": null
      },
      "primary": {
        "hex": "#1E293B",
        "gradient": null
      },
      "secondary": {
        "hex": "#334155",
        "gradient": null
      },
      "accent": {
        "hex": "#64748B",
        "gradient": null
      },
      "surface": {
        "hex": "#1E293B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#64748B",
        "gradient": null
      },
      "text": {
        "hex": "#F8FAFC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#94A3B8",
        "gradient": null
      },
      "cta": {
        "hex": "#1E293B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#64748B",
          "gradient": null
        },
        "border": {
          "hex": "#64748B",
          "gradient": null
        },
        "text": {
          "hex": "#CBD5E1",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#94A3B8",
          "gradient": null
        },
        "secondary": {
          "hex": "#64748B",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1E293B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-73",
    "version": 2,
    "name": "Zinc Precision",
    "category": "Monochromatic Minimal",
    "personality": "Cold zinc metal hardware feel with sharp high-contrast clarity",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#09090B",
        "gradient": null
      },
      "primary": {
        "hex": "#18181B",
        "gradient": null
      },
      "secondary": {
        "hex": "#27272A",
        "gradient": null
      },
      "accent": {
        "hex": "#71717A",
        "gradient": null
      },
      "surface": {
        "hex": "#18181B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#71717A",
        "gradient": null
      },
      "text": {
        "hex": "#FAFAFA",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A1A1AA",
        "gradient": null
      },
      "cta": {
        "hex": "#18181B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#71717A",
          "gradient": null
        },
        "border": {
          "hex": "#71717A",
          "gradient": null
        },
        "text": {
          "hex": "#E4E4E7",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#71717A",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#18181B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-74",
    "version": 2,
    "name": "Frostbyte Silver",
    "category": "Monochromatic Minimal",
    "personality": "Crisp sub-zero silver foil monochrome with mirror polished surfaces",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0F14",
        "gradient": null
      },
      "primary": {
        "hex": "#19222D",
        "gradient": null
      },
      "secondary": {
        "hex": "#2D3D50",
        "gradient": null
      },
      "accent": {
        "hex": "#8FA3BF",
        "gradient": null
      },
      "surface": {
        "hex": "#19222D",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#8FA3BF",
        "gradient": null
      },
      "text": {
        "hex": "#F4F7FA",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A6B7CC",
        "gradient": null
      },
      "cta": {
        "hex": "#19222D",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#8FA3BF",
          "gradient": null
        },
        "border": {
          "hex": "#8FA3BF",
          "gradient": null
        },
        "text": {
          "hex": "#D3DEEC",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#8FA3BF",
          "gradient": null
        },
        "secondary": {
          "hex": "#465A73",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#19222D",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-75",
    "version": 2,
    "name": "Neutral Warm Grey",
    "category": "Monochromatic Minimal",
    "personality": "Warm stone grey tone with friendly humanistic warmth",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#141312",
        "gradient": null
      },
      "primary": {
        "hex": "#262422",
        "gradient": null
      },
      "secondary": {
        "hex": "#44403C",
        "gradient": null
      },
      "accent": {
        "hex": "#78716C",
        "gradient": null
      },
      "surface": {
        "hex": "#262422",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#78716C",
        "gradient": null
      },
      "text": {
        "hex": "#FAFAF9",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A8A29E",
        "gradient": null
      },
      "cta": {
        "hex": "#262422",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#78716C",
          "gradient": null
        },
        "border": {
          "hex": "#78716C",
          "gradient": null
        },
        "text": {
          "hex": "#E7E5E4",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#A8A29E",
          "gradient": null
        },
        "secondary": {
          "hex": "#78716C",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#262422",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-76",
    "version": 2,
    "name": "Vantablack Silence",
    "category": "Monochromatic Minimal",
    "personality": "Light-absorbing void black background with ghost white text",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#000000",
        "gradient": null
      },
      "primary": {
        "hex": "#111111",
        "gradient": null
      },
      "secondary": {
        "hex": "#222222",
        "gradient": null
      },
      "accent": {
        "hex": "#666666",
        "gradient": null
      },
      "surface": {
        "hex": "#111111",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#666666",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#888888",
        "gradient": null
      },
      "cta": {
        "hex": "#111111",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#666666",
          "gradient": null
        },
        "border": {
          "hex": "#666666",
          "gradient": null
        },
        "text": {
          "hex": "#DDDDDD",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#666666",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#111111",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-77",
    "version": 2,
    "name": "Steel Blue Monolith",
    "category": "Monochromatic Minimal",
    "personality": "Subtle steel blue tinting over dark monolithic structure",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0D1117",
        "gradient": null
      },
      "primary": {
        "hex": "#161B22",
        "gradient": null
      },
      "secondary": {
        "hex": "#30363D",
        "gradient": null
      },
      "accent": {
        "hex": "#8B949E",
        "gradient": null
      },
      "surface": {
        "hex": "#161B22",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#8B949E",
        "gradient": null
      },
      "text": {
        "hex": "#F0F6FC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#8B949E",
        "gradient": null
      },
      "cta": {
        "hex": "#161B22",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#8B949E",
          "gradient": null
        },
        "border": {
          "hex": "#8B949E",
          "gradient": null
        },
        "text": {
          "hex": "#C9D1D9",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#8B949E",
          "gradient": null
        },
        "secondary": {
          "hex": "#30363D",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#238636",
          "gradient": null
        },
        "warning": {
          "hex": "#D29922",
          "gradient": null
        },
        "error": {
          "hex": "#DA3633",
          "gradient": null
        },
        "info": {
          "hex": "#161B22",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-78",
    "version": 2,
    "name": "Titanium Silver Minimal",
    "category": "Monochromatic Minimal",
    "personality": "Precision aircraft titanium minimal finish with satin shine",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#101214",
        "gradient": null
      },
      "primary": {
        "hex": "#1A1D20",
        "gradient": null
      },
      "secondary": {
        "hex": "#343A40",
        "gradient": null
      },
      "accent": {
        "hex": "#6C757D",
        "gradient": null
      },
      "surface": {
        "hex": "#1A1D20",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#6C757D",
        "gradient": null
      },
      "text": {
        "hex": "#F8F9FA",
        "gradient": null
      },
      "textMuted": {
        "hex": "#ADB5BD",
        "gradient": null
      },
      "cta": {
        "hex": "#1A1D20",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#6C757D",
          "gradient": null
        },
        "border": {
          "hex": "#6C757D",
          "gradient": null
        },
        "text": {
          "hex": "#DEE2E6",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#ADB5BD",
          "gradient": null
        },
        "secondary": {
          "hex": "#6C757D",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1A1D20",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-79",
    "version": 2,
    "name": "Smokey Quartz Minimal",
    "category": "Monochromatic Minimal",
    "personality": "Translucent smoked glass quartz overlay on dark velvet charcoal",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#111012",
        "gradient": null
      },
      "primary": {
        "hex": "#211F24",
        "gradient": null
      },
      "secondary": {
        "hex": "#423E47",
        "gradient": null
      },
      "accent": {
        "hex": "#8A8494",
        "gradient": null
      },
      "surface": {
        "hex": "#211F24",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#8A8494",
        "gradient": null
      },
      "text": {
        "hex": "#FAF9FC",
        "gradient": null
      },
      "textMuted": {
        "hex": "#B6B0C2",
        "gradient": null
      },
      "cta": {
        "hex": "#211F24",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#8A8494",
          "gradient": null
        },
        "border": {
          "hex": "#8A8494",
          "gradient": null
        },
        "text": {
          "hex": "#DDD9E6",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#8A8494",
          "gradient": null
        },
        "secondary": {
          "hex": "#423E47",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#211F24",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-80",
    "version": 2,
    "name": "Carbon Fiber Grid",
    "category": "Monochromatic Minimal",
    "personality": "Woven carbon fiber weave texture feel with high tensile silver wire",
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontName": "Inter",
      "fontGoogleUrl": "Inter:wght@400;500;600;700;800",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0B0C0E",
        "gradient": null
      },
      "primary": {
        "hex": "#16181C",
        "gradient": null
      },
      "secondary": {
        "hex": "#2C3038",
        "gradient": null
      },
      "accent": {
        "hex": "#5C6470",
        "gradient": null
      },
      "surface": {
        "hex": "#16181C",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#5C6470",
        "gradient": null
      },
      "text": {
        "hex": "#F0F2F5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "cta": {
        "hex": "#16181C",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#5C6470",
          "gradient": null
        },
        "border": {
          "hex": "#5C6470",
          "gradient": null
        },
        "text": {
          "hex": "#D1D5DB",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#9CA3AF",
          "gradient": null
        },
        "secondary": {
          "hex": "#5C6470",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#16181C",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-81",
    "version": 2,
    "name": "Orion Nebula",
    "category": "Deep Space & Cosmic",
    "personality": "Deep intergalactic nebula with swirling violet dust and magenta star clusters",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#08031A",
        "gradient": null
      },
      "primary": {
        "hex": "#2E0A4E",
        "gradient": null
      },
      "secondary": {
        "hex": "#7E22CE",
        "gradient": null
      },
      "accent": {
        "hex": "#EC4899",
        "gradient": null
      },
      "surface": {
        "hex": "#18072D",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#EC4899",
        "gradient": null
      },
      "text": {
        "hex": "#FDF2F8",
        "gradient": null
      },
      "textMuted": {
        "hex": "#F472B6",
        "gradient": null
      },
      "cta": {
        "hex": "#2E0A4E",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#EC4899",
          "gradient": null
        },
        "border": {
          "hex": "#EC4899",
          "gradient": null
        },
        "text": {
          "hex": "#FBCFE8",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#7E22CE",
          "gradient": null
        },
        "secondary": {
          "hex": "#EC4899",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2E0A4E",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-82",
    "version": 2,
    "name": "Supernova Explosion",
    "category": "Deep Space & Cosmic",
    "personality": "Dazzling stellar explosion with bright golden core and violet shockwaves",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#10061A",
        "gradient": null
      },
      "primary": {
        "hex": "#3B0764",
        "gradient": null
      },
      "secondary": {
        "hex": "#9333EA",
        "gradient": null
      },
      "accent": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "surface": {
        "hex": "#1E0837",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FBBF24",
        "gradient": null
      },
      "text": {
        "hex": "#FAF5FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#DDD6FE",
        "gradient": null
      },
      "cta": {
        "hex": "#3B0764",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "border": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "text": {
          "hex": "#FEF08A",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#9333EA",
          "gradient": null
        },
        "secondary": {
          "hex": "#FBBF24",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#FBBF24",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#3B0764",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-83",
    "version": 2,
    "name": "Event Horizon",
    "category": "Deep Space & Cosmic",
    "personality": "Black hole gravitational singularity with warping photon ring amber glow",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#050403",
        "gradient": null
      },
      "primary": {
        "hex": "#1C140A",
        "gradient": null
      },
      "secondary": {
        "hex": "#78350F",
        "gradient": null
      },
      "accent": {
        "hex": "#F97316",
        "gradient": null
      },
      "surface": {
        "hex": "#1C140A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F97316",
        "gradient": null
      },
      "text": {
        "hex": "#FFF7ED",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDBA74",
        "gradient": null
      },
      "cta": {
        "hex": "#1C140A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F97316",
          "gradient": null
        },
        "border": {
          "hex": "#F97316",
          "gradient": null
        },
        "text": {
          "hex": "#FFEDD5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#F97316",
          "gradient": null
        },
        "secondary": {
          "hex": "#78350F",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1C140A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-84",
    "version": 2,
    "name": "Andromeda Spiral",
    "category": "Deep Space & Cosmic",
    "personality": "Galactic spiral arm cyan haze over void blue expanse",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#030A16",
        "gradient": null
      },
      "primary": {
        "hex": "#0C2340",
        "gradient": null
      },
      "secondary": {
        "hex": "#1D4ED8",
        "gradient": null
      },
      "accent": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "surface": {
        "hex": "#0C2340",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#38BDF8",
        "gradient": null
      },
      "text": {
        "hex": "#F0F9FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#7DD3FC",
        "gradient": null
      },
      "cta": {
        "hex": "#0C2340",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "border": {
          "hex": "#38BDF8",
          "gradient": null
        },
        "text": {
          "hex": "#BAE6FD",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#1D4ED8",
          "gradient": null
        },
        "secondary": {
          "hex": "#38BDF8",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#0C2340",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-85",
    "version": 2,
    "name": "Pulsar Beam",
    "category": "Deep Space & Cosmic",
    "personality": "Rapidly rotating neutron star beam with flashing white-cyan energetic pulses",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#020813",
        "gradient": null
      },
      "primary": {
        "hex": "#0A2540",
        "gradient": null
      },
      "secondary": {
        "hex": "#00D4FF",
        "gradient": null
      },
      "accent": {
        "hex": "#E0F7FA",
        "gradient": null
      },
      "surface": {
        "hex": "#0A2540",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#00D4FF",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#80DEEA",
        "gradient": null
      },
      "cta": {
        "hex": "#0A2540",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#00D4FF",
          "gradient": null
        },
        "border": {
          "hex": "#00D4FF",
          "gradient": null
        },
        "text": {
          "hex": "#B2EBF2",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#00D4FF",
          "gradient": null
        },
        "secondary": {
          "hex": "#0091EA",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#00E676",
          "gradient": null
        },
        "warning": {
          "hex": "#FFB300",
          "gradient": null
        },
        "error": {
          "hex": "#FF1744",
          "gradient": null
        },
        "info": {
          "hex": "#0A2540",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-86",
    "version": 2,
    "name": "Starlight Void",
    "category": "Deep Space & Cosmic",
    "personality": "Pure vacuum space illuminated by distant silver star clusters",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#04060A",
        "gradient": null
      },
      "primary": {
        "hex": "#111827",
        "gradient": null
      },
      "secondary": {
        "hex": "#374151",
        "gradient": null
      },
      "accent": {
        "hex": "#E5E7EB",
        "gradient": null
      },
      "surface": {
        "hex": "#111827",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E5E7EB",
        "gradient": null
      },
      "text": {
        "hex": "#F9FAFB",
        "gradient": null
      },
      "textMuted": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "cta": {
        "hex": "#111827",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E5E7EB",
          "gradient": null
        },
        "border": {
          "hex": "#E5E7EB",
          "gradient": null
        },
        "text": {
          "hex": "#FFFFFF",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#9CA3AF",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#111827",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-87",
    "version": 2,
    "name": "Quasar Emerald Glow",
    "category": "Deep Space & Cosmic",
    "personality": "Active galactic nucleus with brilliant emerald jet discharge",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#02120C",
        "gradient": null
      },
      "primary": {
        "hex": "#064E3B",
        "gradient": null
      },
      "secondary": {
        "hex": "#047857",
        "gradient": null
      },
      "accent": {
        "hex": "#34D399",
        "gradient": null
      },
      "surface": {
        "hex": "#064E3B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#34D399",
        "gradient": null
      },
      "text": {
        "hex": "#ECFDF5",
        "gradient": null
      },
      "textMuted": {
        "hex": "#6EE7B7",
        "gradient": null
      },
      "cta": {
        "hex": "#064E3B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#34D399",
          "gradient": null
        },
        "border": {
          "hex": "#34D399",
          "gradient": null
        },
        "text": {
          "hex": "#A7F3D0",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#34D399",
          "gradient": null
        },
        "secondary": {
          "hex": "#047857",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#064E3B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-88",
    "version": 2,
    "name": "Solar Eclipse Corona",
    "category": "Deep Space & Cosmic",
    "personality": "Total solar eclipse with silver halo corona surrounding pitch black moon",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#080808",
        "gradient": null
      },
      "primary": {
        "hex": "#1A1A1A",
        "gradient": null
      },
      "secondary": {
        "hex": "#404040",
        "gradient": null
      },
      "accent": {
        "hex": "#F3F4F6",
        "gradient": null
      },
      "surface": {
        "hex": "#1A1A1A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F3F4F6",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#9CA3AF",
        "gradient": null
      },
      "cta": {
        "hex": "#1A1A1A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F3F4F6",
          "gradient": null
        },
        "border": {
          "hex": "#F3F4F6",
          "gradient": null
        },
        "text": {
          "hex": "#FFFFFF",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFFFFF",
          "gradient": null
        },
        "secondary": {
          "hex": "#9CA3AF",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1A1A1A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-89",
    "version": 2,
    "name": "Dark Matter Void",
    "category": "Deep Space & Cosmic",
    "personality": "Invisible cosmic mass with subtle indigo gravitational lensing effects",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#06040A",
        "gradient": null
      },
      "primary": {
        "hex": "#170E2B",
        "gradient": null
      },
      "secondary": {
        "hex": "#4C1D95",
        "gradient": null
      },
      "accent": {
        "hex": "#818CF8",
        "gradient": null
      },
      "surface": {
        "hex": "#170E2B",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#818CF8",
        "gradient": null
      },
      "text": {
        "hex": "#EEF2FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#C7D2FE",
        "gradient": null
      },
      "cta": {
        "hex": "#170E2B",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#818CF8",
          "gradient": null
        },
        "border": {
          "hex": "#818CF8",
          "gradient": null
        },
        "text": {
          "hex": "#A5B4FC",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#818CF8",
          "gradient": null
        },
        "secondary": {
          "hex": "#4C1D95",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#170E2B",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-90",
    "version": 2,
    "name": "Cosmic Ray Aurora",
    "category": "Deep Space & Cosmic",
    "personality": "Solar particle atmosphere collision with curtaining magenta and lime aurora",
    "typography": {
      "fontFamily": "'Space Grotesk', sans-serif",
      "fontName": "Space Grotesk",
      "fontGoogleUrl": "Space+Grotesk:wght@400;500;600;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#060A12",
        "gradient": null
      },
      "primary": {
        "hex": "#142238",
        "gradient": null
      },
      "secondary": {
        "hex": "#059669",
        "gradient": null
      },
      "accent": {
        "hex": "#E879F9",
        "gradient": null
      },
      "surface": {
        "hex": "#142238",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#E879F9",
        "gradient": null
      },
      "text": {
        "hex": "#FDF4FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#F5D0FE",
        "gradient": null
      },
      "cta": {
        "hex": "#142238",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#E879F9",
          "gradient": null
        },
        "border": {
          "hex": "#E879F9",
          "gradient": null
        },
        "text": {
          "hex": "#FBCFE8",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#059669",
          "gradient": null
        },
        "secondary": {
          "hex": "#E879F9",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#34D399",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#142238",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-91",
    "version": 2,
    "name": "Commodore Amber CRT",
    "category": "Retro & Vintage",
    "personality": "Warm monochrome amber phosphor monitor glow with scanline nostalgia",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0F0B00",
        "gradient": null
      },
      "primary": {
        "hex": "#2E1F00",
        "gradient": null
      },
      "secondary": {
        "hex": "#784A00",
        "gradient": null
      },
      "accent": {
        "hex": "#FFB703",
        "gradient": null
      },
      "surface": {
        "hex": "#2E1F00",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FFB703",
        "gradient": null
      },
      "text": {
        "hex": "#FFF3D1",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FFC857",
        "gradient": null
      },
      "cta": {
        "hex": "#2E1F00",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FFB703",
          "gradient": null
        },
        "border": {
          "hex": "#FFB703",
          "gradient": null
        },
        "text": {
          "hex": "#FFE082",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#FFB703",
          "gradient": null
        },
        "secondary": {
          "hex": "#784A00",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#FFB703",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2E1F00",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-92",
    "version": 2,
    "name": "VT100 Green Phosphor",
    "category": "Retro & Vintage",
    "personality": "Dec VT100 terminal nostalgia with glowing emerald monochrome text",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#020D05",
        "gradient": null
      },
      "primary": {
        "hex": "#062910",
        "gradient": null
      },
      "secondary": {
        "hex": "#0F5C24",
        "gradient": null
      },
      "accent": {
        "hex": "#39FF14",
        "gradient": null
      },
      "surface": {
        "hex": "#062910",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#39FF14",
        "gradient": null
      },
      "text": {
        "hex": "#E5FFE0",
        "gradient": null
      },
      "textMuted": {
        "hex": "#66FF47",
        "gradient": null
      },
      "cta": {
        "hex": "#062910",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#39FF14",
          "gradient": null
        },
        "border": {
          "hex": "#39FF14",
          "gradient": null
        },
        "text": {
          "hex": "#A3FF8F",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#39FF14",
          "gradient": null
        },
        "secondary": {
          "hex": "#0F5C24",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#39FF14",
          "gradient": null
        },
        "warning": {
          "hex": "#FFB703",
          "gradient": null
        },
        "error": {
          "hex": "#FF0054",
          "gradient": null
        },
        "info": {
          "hex": "#062910",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-93",
    "version": 2,
    "name": "IBM Mainframe Blue",
    "category": "Retro & Vintage",
    "personality": "System/360 computing authority, deep cobalt terminal blue",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#060C1B",
        "gradient": null
      },
      "primary": {
        "hex": "#0F1E3D",
        "gradient": null
      },
      "secondary": {
        "hex": "#1D4ED8",
        "gradient": null
      },
      "accent": {
        "hex": "#60A5FA",
        "gradient": null
      },
      "surface": {
        "hex": "#0F1E3D",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#60A5FA",
        "gradient": null
      },
      "text": {
        "hex": "#EFF6FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#93C5FD",
        "gradient": null
      },
      "cta": {
        "hex": "#0F1E3D",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#60A5FA",
          "gradient": null
        },
        "border": {
          "hex": "#60A5FA",
          "gradient": null
        },
        "text": {
          "hex": "#BFDBFE",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#1D4ED8",
          "gradient": null
        },
        "secondary": {
          "hex": "#60A5FA",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#0F1E3D",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-94",
    "version": 2,
    "name": "Macintosh System 1",
    "category": "Retro & Vintage",
    "personality": "1984 original Macintosh 1-bit dithered grey UI nostalgic simplicity",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#121214",
        "gradient": null
      },
      "primary": {
        "hex": "#222226",
        "gradient": null
      },
      "secondary": {
        "hex": "#4A4D57",
        "gradient": null
      },
      "accent": {
        "hex": "#D0D4E0",
        "gradient": null
      },
      "surface": {
        "hex": "#222226",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#D0D4E0",
        "gradient": null
      },
      "text": {
        "hex": "#F4F5F8",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A0A5B5",
        "gradient": null
      },
      "cta": {
        "hex": "#222226",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#D0D4E0",
          "gradient": null
        },
        "border": {
          "hex": "#D0D4E0",
          "gradient": null
        },
        "text": {
          "hex": "#E6E9F2",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#D0D4E0",
          "gradient": null
        },
        "secondary": {
          "hex": "#4A4D57",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#222226",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-95",
    "version": 2,
    "name": "Amiga Workbench 1.3",
    "category": "Retro & Vintage",
    "personality": "Iconic Commodore Amiga blue and orange workstation workspace",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A1224",
        "gradient": null
      },
      "primary": {
        "hex": "#14254A",
        "gradient": null
      },
      "secondary": {
        "hex": "#0055AA",
        "gradient": null
      },
      "accent": {
        "hex": "#FF5500",
        "gradient": null
      },
      "surface": {
        "hex": "#14254A",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#FF5500",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#88BBFF",
        "gradient": null
      },
      "cta": {
        "hex": "#14254A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#FF5500",
          "gradient": null
        },
        "border": {
          "hex": "#FF5500",
          "gradient": null
        },
        "text": {
          "hex": "#FF9966",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#0055AA",
          "gradient": null
        },
        "secondary": {
          "hex": "#FF5500",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#FFB703",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#14254A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-96",
    "version": 2,
    "name": "C64 Blue & Light Blue",
    "category": "Retro & Vintage",
    "personality": "Commodore 64 16-color palette nostalgia with royal blue background",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#101830",
        "gradient": null
      },
      "primary": {
        "hex": "#203060",
        "gradient": null
      },
      "secondary": {
        "hex": "#4060C0",
        "gradient": null
      },
      "accent": {
        "hex": "#A0C0FF",
        "gradient": null
      },
      "surface": {
        "hex": "#203060",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#A0C0FF",
        "gradient": null
      },
      "text": {
        "hex": "#F0F4FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#80A0E0",
        "gradient": null
      },
      "cta": {
        "hex": "#203060",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#A0C0FF",
          "gradient": null
        },
        "border": {
          "hex": "#A0C0FF",
          "gradient": null
        },
        "text": {
          "hex": "#C0D8FF",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#4060C0",
          "gradient": null
        },
        "secondary": {
          "hex": "#A0C0FF",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#203060",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-97",
    "version": 2,
    "name": "Sinclair ZX Spectrum",
    "category": "Retro & Vintage",
    "personality": "British home computer rainbow stripe feel on matte rubber keyboard dark base",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0A0A0E",
        "gradient": null
      },
      "primary": {
        "hex": "#1C1C24",
        "gradient": null
      },
      "secondary": {
        "hex": "#E11D48",
        "gradient": null
      },
      "accent": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "surface": {
        "hex": "#1C1C24",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#06B6D4",
        "gradient": null
      },
      "text": {
        "hex": "#FFFFFF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#A5F3FC",
        "gradient": null
      },
      "cta": {
        "hex": "#1C1C24",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "border": {
          "hex": "#06B6D4",
          "gradient": null
        },
        "text": {
          "hex": "#67E8F9",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#E11D48",
          "gradient": null
        },
        "secondary": {
          "hex": "#06B6D4",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1C1C24",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-98",
    "version": 2,
    "name": "Arcade Neon 1982",
    "category": "Retro & Vintage",
    "personality": "Quarter-eating arcade cabinet marquee with hot pink and electric violet",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#110214",
        "gradient": null
      },
      "primary": {
        "hex": "#40084A",
        "gradient": null
      },
      "secondary": {
        "hex": "#9333EA",
        "gradient": null
      },
      "accent": {
        "hex": "#F43F5E",
        "gradient": null
      },
      "surface": {
        "hex": "#28082E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#F43F5E",
        "gradient": null
      },
      "text": {
        "hex": "#FFF1F2",
        "gradient": null
      },
      "textMuted": {
        "hex": "#F472B6",
        "gradient": null
      },
      "cta": {
        "hex": "#40084A",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "border": {
          "hex": "#F43F5E",
          "gradient": null
        },
        "text": {
          "hex": "#FB7185",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#9333EA",
          "gradient": null
        },
        "secondary": {
          "hex": "#F43F5E",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#40084A",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-99",
    "version": 2,
    "name": "Atari 2600 Woodgrain",
    "category": "Retro & Vintage",
    "personality": "Classic woodgrain paneling with 70s orange retro game cartridge pop",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#140A06",
        "gradient": null
      },
      "primary": {
        "hex": "#2E170E",
        "gradient": null
      },
      "secondary": {
        "hex": "#7C2D12",
        "gradient": null
      },
      "accent": {
        "hex": "#EA580C",
        "gradient": null
      },
      "surface": {
        "hex": "#2E170E",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#EA580C",
        "gradient": null
      },
      "text": {
        "hex": "#FFF7ED",
        "gradient": null
      },
      "textMuted": {
        "hex": "#FDBA74",
        "gradient": null
      },
      "cta": {
        "hex": "#2E170E",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#EA580C",
          "gradient": null
        },
        "border": {
          "hex": "#EA580C",
          "gradient": null
        },
        "text": {
          "hex": "#FFEDD5",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#EA580C",
          "gradient": null
        },
        "secondary": {
          "hex": "#7C2D12",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#2E170E",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  },
  {
    "id": "theme-100",
    "version": 2,
    "name": "Solaris UNIX Workstation",
    "category": "Retro & Vintage",
    "personality": "Sun Microsystems CDE desktop blue-grey precision workstation classic",
    "typography": {
      "fontFamily": "'JetBrains Mono', monospace",
      "fontName": "JetBrains Mono",
      "fontGoogleUrl": "JetBrains+Mono:wght@400;500;700",
      "baseFontSize": 16,
      "lineHeight": 1.5,
      "fontWeights": {
        "regular": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
      }
    },
    "colors": {
      "bg": {
        "hex": "#0D131A",
        "gradient": null
      },
      "primary": {
        "hex": "#1C2836",
        "gradient": null
      },
      "secondary": {
        "hex": "#3A506B",
        "gradient": null
      },
      "accent": {
        "hex": "#48CAE4",
        "gradient": null
      },
      "surface": {
        "hex": "#1C2836",
        "gradient": null
      },
      "surfaceBorder": {
        "hex": "#48CAE4",
        "gradient": null
      },
      "text": {
        "hex": "#F0F8FF",
        "gradient": null
      },
      "textMuted": {
        "hex": "#90E0EF",
        "gradient": null
      },
      "cta": {
        "hex": "#1C2836",
        "gradient": null
      },
      "badge": {
        "bg": {
          "hex": "#48CAE4",
          "gradient": null
        },
        "border": {
          "hex": "#48CAE4",
          "gradient": null
        },
        "text": {
          "hex": "#ADE8F4",
          "gradient": null
        }
      },
      "glow": {
        "primary": {
          "hex": "#48CAE4",
          "gradient": null
        },
        "secondary": {
          "hex": "#0077B6",
          "gradient": null
        }
      },
      "semantic": {
        "success": {
          "hex": "#10B981",
          "gradient": null
        },
        "warning": {
          "hex": "#F59E0B",
          "gradient": null
        },
        "error": {
          "hex": "#EF4444",
          "gradient": null
        },
        "info": {
          "hex": "#1C2836",
          "gradient": null
        }
      }
    },
    "spacing": {
      "unit": 4,
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "pill": "9999px"
      }
    },
    "motion": {
      "enableAnimations": true,
      "transitionDuration": "0.3s",
      "transitionEasing": "cubic-bezier(0.16, 1, 0.3, 1)",
      "enableGlowOrbs": true,
      "enableBadgePulse": true,
      "enableHoverLift": true
    }
  }
];

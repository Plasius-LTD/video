export const aiVideoGenerationTokens = {
  color: {
    background: "#0F1117",
    surface: "#161A23",
    accentPrimary: "#6C5CE7",
    accentSecondary: "#00D4FF",
    success: "#00C896",
    warning: "#FFB020",
    error: "#FF4D4F",
    textPrimary: "#E6EAF2",
    textSecondary: "#A0A8B8",
    borderSubtle: "rgba(255,255,255,0.05)",
    placeholderText: "rgba(255,255,255,0.35)",
  },
  typography: {
    headingFontFamily: "Inter, 'SF Pro Display', sans-serif",
    bodyFontFamily: "Inter, sans-serif",
    h1Px: 28,
    h2Px: 20,
    bodyPx: 16,
    smallPx: 13,
    promptPxMin: 16,
    promptPxMax: 18,
  },
  layout: {
    headerHeightPx: 64,
    promptBarMinHeightPx: 140,
    gridGapPx: 16,
    cardAspectRatio: "16 / 9",
  },
  radius: {
    promptPx: 12,
    cardPx: 14,
    panelPx: 14,
  },
  spacing: {
    xxsPx: 4,
    xsPx: 8,
    smPx: 12,
    mdPx: 16,
    lgPx: 20,
    xlPx: 24,
  },
  animation: {
    fastMs: 200,
    standardMs: 280,
    slowMs: 300,
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
} as const;

export type AIVideoGenerationTokens = typeof aiVideoGenerationTokens;

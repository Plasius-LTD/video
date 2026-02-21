import { describe, expect, it } from "vitest";
import {
  aiVideoGenerationTokens,
  aiVideoStageFlow,
  AI_VIDEO_GENERATION_SCREEN_STYLES,
  createAIVideoGenerationDemoModel,
} from "../src/index.ts";

describe("ai video generation design tokens", () => {
  it("matches required base colors from the guide", () => {
    expect(aiVideoGenerationTokens.color.background).toBe("#0F1117");
    expect(aiVideoGenerationTokens.color.surface).toBe("#161A23");
    expect(aiVideoGenerationTokens.color.accentPrimary).toBe("#6C5CE7");
    expect(aiVideoGenerationTokens.color.accentSecondary).toBe("#00D4FF");
    expect(aiVideoGenerationTokens.layout.headerHeightPx).toBe(64);
  });

  it("uses the requested timing and easing values", () => {
    expect(aiVideoGenerationTokens.animation.fastMs).toBeGreaterThanOrEqual(200);
    expect(aiVideoGenerationTokens.animation.slowMs).toBeLessThanOrEqual(300);
    expect(aiVideoGenerationTokens.animation.easing).toBe("cubic-bezier(0.4, 0.0, 0.2, 1)");
  });
});

describe("ai video generation stage flow", () => {
  it("covers all design phases in the expected order", () => {
    const orderedStages = aiVideoStageFlow.map((item) => item.stage);

    expect(orderedStages).toEqual([
      "idle",
      "generatingImages",
      "imageSelection",
      "generatingVideo",
      "playback",
      "voiceover",
      "export",
    ]);
  });

  it("provides a demo model compatible with the voiceover phase", () => {
    const voiceoverModel = createAIVideoGenerationDemoModel("voiceover");
    expect(voiceoverModel.voicePresets.length).toBeGreaterThanOrEqual(3);
    expect(voiceoverModel.voiceSettings.script.length).toBeGreaterThan(10);
    expect(voiceoverModel.stage).toBe("voiceover");
  });

  it("contains style hooks for key visual areas", () => {
    expect(AI_VIDEO_GENERATION_SCREEN_STYLES).toContain("--plv-header-height: 64px");
    expect(AI_VIDEO_GENERATION_SCREEN_STYLES).toContain(".plv-image-grid");
    expect(AI_VIDEO_GENERATION_SCREEN_STYLES).toContain(".plv-voiceover-panel");
    expect(AI_VIDEO_GENERATION_SCREEN_STYLES).toContain("@keyframes plv-shimmer");
  });
});

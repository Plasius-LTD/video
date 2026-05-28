import { createI18n } from "@plasius/translations";
import { describe, expect, it } from "vitest";
import {
  createAIVideoGenerationDemoModel,
  getTranslatedAIVideoStageFlow,
} from "../src/index.ts";
import {
  createVideoTranslationResolver,
  getVideoDefaultTranslation,
  resolveVideoTranslation,
  videoEnGbTranslations,
  videoTranslationKeys,
  videoTranslations,
} from "../src/i18n.ts";

describe("ai video generation translations", () => {
  it("exports package-owned en-GB dictionaries for the shared translator", () => {
    const i18n = createI18n({
      language: "en-GB",
      fallback: "en-GB",
      translations: videoTranslations,
    });

    expect(i18n.t(videoTranslationKeys.aiVideoGeneration.stages.idle.label)).toBe(
      "Idle",
    );
    expect(
      i18n.t(videoTranslationKeys.aiVideoGeneration.screen.imageControls, {
        label: "Variant 1",
      }),
    ).toBe("Variant 1 controls");
  });

  it("resolves stage metadata and demo models through translation helpers", () => {
    const i18n = createI18n({
      language: "en-GB",
      fallback: "en-GB",
      translations: videoTranslations,
    });
    const translate = createVideoTranslationResolver(i18n.t);

    const stageFlow = getTranslatedAIVideoStageFlow(translate);
    const demoModel = createAIVideoGenerationDemoModel("voiceover", translate);

    expect(stageFlow.map((stage) => stage.label)).toContain("Voiceover");
    expect(demoModel.projectName).toBe("Mountain Valley Storyboard");
    expect(demoModel.voicePresets.map((preset) => preset.label)).toContain(
      "Narrator Documentary",
    );
  });

  it("falls back to packaged defaults when the active translator has not loaded a key", () => {
    expect(
      resolveVideoTranslation(
        (key) => key,
        videoTranslationKeys.aiVideoGeneration.screen.speed,
        {
          speed: "1.2",
        },
      ),
    ).toBe("Speed: 1.2x");
  });

  it("renders function-valued defaults and preserves placeholders without values", () => {
    const key = videoTranslationKeys.aiVideoGeneration.screen.prompt.input;
    const dictionary = videoEnGbTranslations as unknown as Record<string, unknown>;
    const original = dictionary[key];

    try {
      dictionary[key] = ({ label }: { label: string }) => `Prompt ${label}`;

      expect(
        getVideoDefaultTranslation(key, {
          label: "custom",
        }),
      ).toBe("Prompt custom");
      expect(
        getVideoDefaultTranslation(
          videoTranslationKeys.aiVideoGeneration.screen.imageControls,
          {},
        ),
      ).toBe("{label} controls");
      expect(
        getVideoDefaultTranslation(
          "video.aiVideoGeneration.missing" as Parameters<
            typeof getVideoDefaultTranslation
          >[0],
        ),
      ).toBe("video.aiVideoGeneration.missing");
    } finally {
      dictionary[key] = original;
    }
  });
});

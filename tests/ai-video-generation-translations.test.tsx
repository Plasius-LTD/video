import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  AIVideoGenerationScreen,
  AIVideoGenerationStudioDemo,
  createAIVideoGenerationDemoModel,
} from "../src/index.ts";
import { videoTranslationKeys } from "../src/i18n.ts";

const translationHarness = vi.hoisted(() => ({
  values: {} as Record<string, string>,
  t: vi.fn((key: string, args: Record<string, string | number | boolean> = {}) => {
    const template = translationHarness.values[key] ?? key;
    return template.replace(/\{(\w+)\}/g, (_match, placeholder: string) => {
      const replacement = args[placeholder];
      return replacement === undefined ? `{${placeholder}}` : String(replacement);
    });
  }),
}));

vi.mock("@plasius/translations", () => ({
  useI18n: () => ({
    t: translationHarness.t,
  }),
}));

const generationKeys = videoTranslationKeys.aiVideoGeneration;

describe("ai video generation rendered translations", () => {
  beforeEach(() => {
    translationHarness.values = {};
    translationHarness.t.mockClear();
  });

  it("uses translated stage selector and screen headings", () => {
    translationHarness.values = {
      [generationKeys.demoComponent.stageSelector]: "Translated stage selector",
      [generationKeys.stages.idle.label]: "Translated idle",
      [generationKeys.stages.generatingImages.label]: "Translated image stage",
      [generationKeys.screen.promptEntryHeading]: "Translated prompt entry",
      [generationKeys.screen.generatingImagesHeading]:
        "Translated image generation",
    };

    render(<AIVideoGenerationStudioDemo initialStage="idle" />);

    expect(
      screen.getByRole("group", { name: "Translated stage selector" }),
    ).toBeTruthy();
    expect(screen.getByText("Translated prompt entry")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Translated image stage" }));
    expect(screen.getByText("Translated image generation")).toBeTruthy();
  });

  it("uses translated controls inside the generation screen", () => {
    translationHarness.values = {
      [generationKeys.screen.imageSelectionHeading]: "Translated image grid",
      [generationKeys.screen.imageSelectionDescription]:
        "Translated image selection help.",
      [generationKeys.screen.selected]: "Translated selected",
      [generationKeys.screen.imageControls]: "Translated controls for {label}",
      [generationKeys.screen.refine]: "Translated refine",
      [generationKeys.screen.save]: "Translated save",
      [generationKeys.screen.useForVideo]: "Translated use for video",
      [generationKeys.screen.contextPanel]: "Translated context",
      [generationKeys.screen.promptVersions]: "Translated prompt versions",
      [generationKeys.screen.stage]: "Translated stage",
      [generationKeys.screen.status]: "Translated status",
      [generationKeys.screen.prompt]: "Translated prompt",
      [generationKeys.screen.promptInput]: "Translated prompt input",
      [generationKeys.screen.uploadImage]: "Translated upload",
      [generationKeys.screen.advanced]: "Translated advanced",
      [generationKeys.screen.generate]: "Translated generate",
    };

    const model = createAIVideoGenerationDemoModel("imageSelection");
    render(<AIVideoGenerationScreen model={model} />);

    expect(screen.getByText("Translated image grid")).toBeTruthy();
    expect(screen.getByText("Translated image selection help.")).toBeTruthy();
    expect(screen.getByText("Translated selected")).toBeTruthy();
    expect(
      screen.getByRole("group", { name: "Translated controls for Variant 1" }),
    ).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Translated refine" })[0]).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Translated save" })[0]).toBeTruthy();
    expect(
      screen.getAllByRole("button", { name: "Translated use for video" })[0],
    ).toBeTruthy();
    expect(screen.getByText("Translated context")).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "Translated prompt input" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Translated upload" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Translated advanced" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Translated generate" })).toBeTruthy();
  });
});

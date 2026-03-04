import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AIVideoGenerationScreen, createAIVideoGenerationDemoModel } from "../src/index.ts";

describe("AIVideoGenerationScreen", () => {
  it("renders idle stage prompt entry and supports top-level callbacks", () => {
    const model = createAIVideoGenerationDemoModel("idle");
    const onHistory = vi.fn();
    const onSettings = vi.fn();
    const onExport = vi.fn();
    const onAccount = vi.fn();

    render(
      <AIVideoGenerationScreen
        model={model}
        className="custom-shell"
        reduceMotion
        onHistory={onHistory}
        onSettings={onSettings}
        onExport={onExport}
        onAccount={onAccount}
      />,
    );

    expect(screen.getByText("Prompt Entry")).toBeTruthy();
    expect(screen.getByText("Upload Image complete. Motion prompt is required before generating.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "History" }));
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("button", { name: "Export" }));
    fireEvent.click(screen.getByRole("button", { name: "Account" }));

    expect(onHistory).toHaveBeenCalledTimes(1);
    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(onExport).toHaveBeenCalledTimes(1);
    expect(onAccount).toHaveBeenCalledTimes(1);
  });

  it("renders generating images stage with skeleton cards", () => {
    const model = createAIVideoGenerationDemoModel("generatingImages");
    const { container } = render(<AIVideoGenerationScreen model={model} />);

    expect(screen.getByText("Generating Image Variants")).toBeTruthy();
    expect(container.querySelectorAll(".plv-skeleton-card").length).toBe(model.imageVariants.length);
  });

  it("renders image selection and triggers image callbacks", () => {
    const model = createAIVideoGenerationDemoModel("imageSelection");
    const onSelectImage = vi.fn();
    const onRefineImage = vi.fn();
    const onSaveImage = vi.fn();
    const onUseForVideo = vi.fn();

    render(
      <AIVideoGenerationScreen
        model={model}
        onSelectImage={onSelectImage}
        onRefineImage={onRefineImage}
        onSaveImage={onSaveImage}
        onUseForVideo={onUseForVideo}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /variant 1/i }));
    fireEvent.click(screen.getAllByRole("button", { name: "Refine" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "Save" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "Use for Video" })[0]);

    expect(onSelectImage).toHaveBeenCalledTimes(1);
    expect(onRefineImage).toHaveBeenCalledTimes(1);
    expect(onSaveImage).toHaveBeenCalledTimes(1);
    expect(onUseForVideo).toHaveBeenCalledTimes(1);
  });

  it("clamps progress and renders motion panel in generating video stage", () => {
    const model = {
      ...createAIVideoGenerationDemoModel("generatingVideo"),
      generationProgress: 150,
    };
    render(<AIVideoGenerationScreen model={model} showContextPanel={false} />);

    expect(screen.getByText("Video Generation Phase")).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("100");
    expect(screen.queryByText("Context Panel")).toBeNull();
  });

  it("renders playback, voiceover and export controls", () => {
    const onDownloadVideo = vi.fn();
    const onRegenerateVideo = vi.fn();
    const onAddVoiceover = vi.fn();
    const onExport = vi.fn();

    const playbackModel = createAIVideoGenerationDemoModel("playback");
    const voiceModel = createAIVideoGenerationDemoModel("voiceover");
    const exportModel = createAIVideoGenerationDemoModel("export");

    const { rerender } = render(
      <AIVideoGenerationScreen
        model={playbackModel}
        onDownloadVideo={onDownloadVideo}
        onRegenerateVideo={onRegenerateVideo}
        onAddVoiceover={onAddVoiceover}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Download" }));
    fireEvent.click(screen.getByRole("button", { name: "Regenerate" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Voiceover" }));
    expect(onDownloadVideo).toHaveBeenCalledTimes(1);
    expect(onRegenerateVideo).toHaveBeenCalledTimes(1);
    expect(onAddVoiceover).toHaveBeenCalledTimes(1);

    rerender(<AIVideoGenerationScreen model={voiceModel} />);
    expect(screen.getByLabelText("Voiceover panel")).toBeTruthy();

    rerender(<AIVideoGenerationScreen model={exportModel} onExport={onExport} />);
    fireEvent.click(screen.getByRole("button", { name: "Confirm Export" }));
    expect(onExport).toHaveBeenCalledTimes(1);
  });
});

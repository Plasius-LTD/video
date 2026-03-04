import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AIVideoGenerationStudioDemo } from "../src/ai-video-generation/demo.tsx";

describe("AIVideoGenerationStudioDemo", () => {
  it("switches stages using selector buttons", () => {
    render(<AIVideoGenerationStudioDemo initialStage="idle" />);

    expect(screen.getByText("Prompt Entry")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Generating Images" }));
    expect(screen.getByText("Generating Image Variants")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Image Selection" }));
    expect(screen.getByText("Course Setting Image Grid")).toBeTruthy();
  });

  it("advances stage through action callbacks", () => {
    render(<AIVideoGenerationStudioDemo initialStage="imageSelection" />);

    fireEvent.click(screen.getAllByRole("button", { name: "Use for Video" })[0]);
    expect(screen.getByText("Video Generation Phase")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Playback" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Voiceover" }));
    expect(screen.getByLabelText("Voiceover panel")).toBeTruthy();

    fireEvent.click(screen.getAllByRole("button", { name: "Export" })[0]);
    expect(screen.getByRole("dialog", { name: "Export modal" })).toBeTruthy();
  });
});

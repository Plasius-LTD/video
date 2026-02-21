import type { AIVideoGenerationStage } from "./types.js";

export interface AIVideoStageSummary {
  stage: AIVideoGenerationStage;
  label: string;
  mainUI: string;
  description: string;
}

export const aiVideoStageFlow: readonly AIVideoStageSummary[] = [
  {
    stage: "idle",
    label: "Idle",
    mainUI: "Prompt input",
    description: "Base prompt entry with optional image upload and advanced settings.",
  },
  {
    stage: "generatingImages",
    label: "Generating Images",
    mainUI: "Skeleton grid",
    description: "Asynchronous generation feedback with shimmer placeholders.",
  },
  {
    stage: "imageSelection",
    label: "Image Selection",
    mainUI: "Image grid",
    description: "Select, refine, save, and mark an image as the video source.",
  },
  {
    stage: "generatingVideo",
    label: "Generating Video",
    mainUI: "Image + progress",
    description: "Motion extraction and generation progress with live feedback.",
  },
  {
    stage: "playback",
    label: "Playback",
    mainUI: "Video player",
    description: "Playback controls, download, regenerate, and voiceover entry point.",
  },
  {
    stage: "voiceover",
    label: "Voiceover",
    mainUI: "Bottom voice panel",
    description: "Editable script, voice presets, speed/emotion controls, waveform preview.",
  },
  {
    stage: "export",
    label: "Export",
    mainUI: "Export modal",
    description: "Final artifact export options with quality and format metadata.",
  },
] as const;

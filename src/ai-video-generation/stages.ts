import type { AIVideoGenerationStage } from "./types.js";
import {
  getVideoDefaultTranslation,
  videoTranslationKeys,
  type VideoTranslationResolver,
} from "../i18n.js";

export interface AIVideoStageSummary {
  stage: AIVideoGenerationStage;
  label: string;
  mainUI: string;
  description: string;
}

export const aiVideoStageOrder = [
  "idle",
  "generatingImages",
  "imageSelection",
  "generatingVideo",
  "playback",
  "voiceover",
  "export",
] as const satisfies readonly AIVideoGenerationStage[];

export function getTranslatedAIVideoStageFlow(
  translate: VideoTranslationResolver = getVideoDefaultTranslation,
): readonly AIVideoStageSummary[] {
  return aiVideoStageOrder.map((stage) => ({
    stage,
    label: translate(videoTranslationKeys.aiVideoGeneration.stages[stage].label),
    mainUI: translate(videoTranslationKeys.aiVideoGeneration.stages[stage].mainUI),
    description: translate(
      videoTranslationKeys.aiVideoGeneration.stages[stage].description,
    ),
  }));
}

export const aiVideoStageFlow = getTranslatedAIVideoStageFlow();

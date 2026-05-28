import type {
  AIVideoGenerationScreenModel,
  AIVideoGenerationStage,
  AIVideoImageVariant,
} from "./types.js";
import {
  getVideoDefaultTranslation,
  videoTranslationKeys,
  type VideoTranslationResolver,
} from "../i18n.js";

const demoKeys = videoTranslationKeys.aiVideoGeneration.demo;

function createBaseVariants(
  translate: VideoTranslationResolver,
): AIVideoImageVariant[] {
  return [
    {
      id: "img-1",
      label: translate(demoKeys.imageVariants.img1.label),
      alt: translate(demoKeys.imageVariants.img1.alt),
    },
    {
      id: "img-2",
      label: translate(demoKeys.imageVariants.img2.label),
      alt: translate(demoKeys.imageVariants.img2.alt),
    },
    {
      id: "img-3",
      label: translate(demoKeys.imageVariants.img3.label),
      alt: translate(demoKeys.imageVariants.img3.alt),
    },
    {
      id: "img-4",
      label: translate(demoKeys.imageVariants.img4.label),
      alt: translate(demoKeys.imageVariants.img4.alt),
    },
    {
      id: "img-5",
      label: translate(demoKeys.imageVariants.img5.label),
      alt: translate(demoKeys.imageVariants.img5.alt),
    },
    {
      id: "img-6",
      label: translate(demoKeys.imageVariants.img6.label),
      alt: translate(demoKeys.imageVariants.img6.alt),
    },
  ];
}

function createStageStatusText(
  translate: VideoTranslationResolver,
): Record<AIVideoGenerationStage, string> {
  return {
    idle: translate(demoKeys.status.idle),
    generatingImages: translate(demoKeys.status.generatingImages),
    imageSelection: translate(demoKeys.status.imageSelection),
    generatingVideo: translate(demoKeys.status.generatingVideo),
    playback: translate(demoKeys.status.playback),
    voiceover: translate(demoKeys.status.voiceover),
    export: translate(demoKeys.status.export),
  };
}

function withSelectedVariant(
  variants: AIVideoImageVariant[],
  selectedId: string,
): AIVideoImageVariant[] {
  return variants.map((variant) => ({
    ...variant,
    isSelected: variant.id === selectedId,
  }));
}

export function createAIVideoGenerationDemoModel(
  stage: AIVideoGenerationStage = "idle",
  translate: VideoTranslationResolver = getVideoDefaultTranslation,
): AIVideoGenerationScreenModel {
  const selectedId = "img-3";
  const basePrompt = translate(demoKeys.basePrompt);
  const refinement = translate(demoKeys.refinement);
  const baseVariants = createBaseVariants(translate);
  const selectedVariants = withSelectedVariant(baseVariants, selectedId);
  const stageStatusText = createStageStatusText(translate);

  const model: AIVideoGenerationScreenModel = {
    stage,
    projectName: translate(demoKeys.projectName),
    prompt: basePrompt,
    promptPlaceholder: translate(demoKeys.promptPlaceholder),
    canGenerate: stage !== "generatingImages" && stage !== "generatingVideo",
    statusText: stageStatusText[stage],
    generationProgress: stage === "generatingVideo" ? 62 : 100,
    imageVariants:
      stage === "idle" ? [] : stage === "generatingImages" ? baseVariants.slice(0, 8) : selectedVariants,
    selectedImageId:
      stage === "imageSelection" ||
      stage === "generatingVideo" ||
      stage === "playback" ||
      stage === "voiceover" ||
      stage === "export"
        ? selectedId
        : undefined,
    promptVersions: [
      {
        id: "v1",
        label: translate(demoKeys.promptVersions.version1),
        basePrompt,
      },
      {
        id: "v2",
        label: translate(demoKeys.promptVersions.version2),
        basePrompt,
        refinement,
      },
      {
        id: "v3",
        label: translate(demoKeys.promptVersions.version3),
        basePrompt,
        refinement: translate(demoKeys.promptVersions.version3Refinement),
        isActive: true,
      },
    ],
    motionDraft: {
      cameraMotion: translate(demoKeys.motionDraft.camera),
      environmentalMotion: translate(demoKeys.motionDraft.environmental),
      subjectMotion: translate(demoKeys.motionDraft.subject),
    },
    motionPrompt: translate(demoKeys.motionPrompt),
    voiceSettings: {
      script: translate(demoKeys.voice.script),
      voiceId: "narrator-documentary",
      speed: 1,
      emotion: translate(demoKeys.voice.emotion),
    },
    voicePresets: [
      { id: "male-warm", label: translate(demoKeys.voice.presets.maleWarm) },
      { id: "female-calm", label: translate(demoKeys.voice.presets.femaleCalm) },
      {
        id: "narrator-documentary",
        label: translate(demoKeys.voice.presets.narratorDocumentary),
      },
    ],
    videoSource:
      stage === "playback" || stage === "voiceover" || stage === "export"
        ? "https://example.invalid/plasius/video/demo.mp4"
        : undefined,
  };

  if (stage === "idle") {
    model.uploadedImageName = translate(demoKeys.uploadedImageName);
    model.motionPrompt = "";
    model.canGenerate = false;
    model.statusText = translate(demoKeys.status.idleUploadedImage);
  }

  return model;
}

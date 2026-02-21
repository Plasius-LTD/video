import type {
  AIVideoGenerationScreenModel,
  AIVideoGenerationStage,
  AIVideoImageVariant,
} from "./types.js";

const basePrompt = "Mountain village at sunset";
const refinement = "Add fog rolling through the valley";

const baseVariants: AIVideoImageVariant[] = [
  { id: "img-1", label: "Variant 1", alt: "Village view with warm skyline" },
  { id: "img-2", label: "Variant 2", alt: "Village rooftops and distant mountains" },
  { id: "img-3", label: "Variant 3", alt: "Bridge over misted valley" },
  { id: "img-4", label: "Variant 4", alt: "Forest edge overlooking village lights" },
  { id: "img-5", label: "Variant 5", alt: "Cloud bank drifting above the town" },
  { id: "img-6", label: "Variant 6", alt: "Cinematic wide frame across the valley" },
];

const stageStatusText: Record<AIVideoGenerationStage, string> = {
  idle: "Ready to generate image directions.",
  generatingImages: "Generating course-setting image variants...",
  imageSelection: "Choose a visual anchor for motion extraction.",
  generatingVideo: "Generating video from selected course image...",
  playback: "Video ready for review.",
  voiceover: "Voiceover tools ready.",
  export: "Review export profile and metadata.",
};

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
): AIVideoGenerationScreenModel {
  const selectedId = "img-3";
  const selectedVariants = withSelectedVariant(baseVariants, selectedId);

  const model: AIVideoGenerationScreenModel = {
    stage,
    projectName: "Mountain Valley Storyboard",
    prompt: basePrompt,
    promptPlaceholder:
      "Describe your scene, camera movement, mood, and intended spoken narration...",
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
        label: "Version 1",
        basePrompt,
      },
      {
        id: "v2",
        label: "Version 2",
        basePrompt,
        refinement,
      },
      {
        id: "v3",
        label: "Version 3",
        basePrompt,
        refinement: `${refinement}; camera starts low and pans left.`,
        isActive: true,
      },
    ],
    motionDraft: {
      cameraMotion: "Camera slowly pans left, then settles into a medium-wide frame.",
      environmentalMotion: "Fog layers move through the valley while lantern light flickers.",
      subjectMotion: "Foreground flags sway and distant birds cross near the skyline.",
    },
    motionPrompt: "Camera slowly pans left with drifting fog and gentle ambient motion.",
    voiceSettings: {
      script: "Welcome to the ancient valley. Each light tells a story waiting to be explored.",
      voiceId: "narrator-documentary",
      speed: 1,
      emotion: "Neutral",
    },
    voicePresets: [
      { id: "male-warm", label: "Male Warm" },
      { id: "female-calm", label: "Female Calm" },
      { id: "narrator-documentary", label: "Narrator Documentary" },
    ],
    videoSource:
      stage === "playback" || stage === "voiceover" || stage === "export"
        ? "https://example.invalid/plasius/video/demo.mp4"
        : undefined,
  };

  if (stage === "idle") {
    model.uploadedImageName = "uploaded-village-frame.png";
    model.motionPrompt = "";
    model.canGenerate = false;
    model.statusText = "Upload Image: complete. Add motion instructions (required).";
  }

  return model;
}

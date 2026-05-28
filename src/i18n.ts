import type {
  TranslationArgs,
  TranslationDictionary,
  TranslationValue,
} from "@plasius/translations";
import type { AIVideoGenerationStage } from "./ai-video-generation/types.js";
import { videoEnGbTranslations } from "./translations/en-GB.js";

const stageTranslationKeys = {
  idle: {
    label: "video.aiVideoGeneration.stage.idle.label",
    mainUI: "video.aiVideoGeneration.stage.idle.mainUI",
    description: "video.aiVideoGeneration.stage.idle.description",
  },
  generatingImages: {
    label: "video.aiVideoGeneration.stage.generatingImages.label",
    mainUI: "video.aiVideoGeneration.stage.generatingImages.mainUI",
    description: "video.aiVideoGeneration.stage.generatingImages.description",
  },
  imageSelection: {
    label: "video.aiVideoGeneration.stage.imageSelection.label",
    mainUI: "video.aiVideoGeneration.stage.imageSelection.mainUI",
    description: "video.aiVideoGeneration.stage.imageSelection.description",
  },
  generatingVideo: {
    label: "video.aiVideoGeneration.stage.generatingVideo.label",
    mainUI: "video.aiVideoGeneration.stage.generatingVideo.mainUI",
    description: "video.aiVideoGeneration.stage.generatingVideo.description",
  },
  playback: {
    label: "video.aiVideoGeneration.stage.playback.label",
    mainUI: "video.aiVideoGeneration.stage.playback.mainUI",
    description: "video.aiVideoGeneration.stage.playback.description",
  },
  voiceover: {
    label: "video.aiVideoGeneration.stage.voiceover.label",
    mainUI: "video.aiVideoGeneration.stage.voiceover.mainUI",
    description: "video.aiVideoGeneration.stage.voiceover.description",
  },
  export: {
    label: "video.aiVideoGeneration.stage.export.label",
    mainUI: "video.aiVideoGeneration.stage.export.mainUI",
    description: "video.aiVideoGeneration.stage.export.description",
  },
} as const satisfies Record<
  AIVideoGenerationStage,
  {
    label: string;
    mainUI: string;
    description: string;
  }
>;

export const videoTranslationKeys = {
  aiVideoGeneration: {
    stages: stageTranslationKeys,
    demo: {
      projectName: "video.aiVideoGeneration.demo.projectName",
      basePrompt: "video.aiVideoGeneration.demo.basePrompt",
      refinement: "video.aiVideoGeneration.demo.refinement",
      promptPlaceholder: "video.aiVideoGeneration.demo.prompt.placeholder",
      uploadedImageName: "video.aiVideoGeneration.demo.uploadedImageName",
      motionPrompt: "video.aiVideoGeneration.demo.motionPrompt",
      status: {
        idle: "video.aiVideoGeneration.demo.status.idle",
        generatingImages: "video.aiVideoGeneration.demo.status.generatingImages",
        imageSelection: "video.aiVideoGeneration.demo.status.imageSelection",
        generatingVideo: "video.aiVideoGeneration.demo.status.generatingVideo",
        playback: "video.aiVideoGeneration.demo.status.playback",
        voiceover: "video.aiVideoGeneration.demo.status.voiceover",
        export: "video.aiVideoGeneration.demo.status.export",
        idleUploadedImage:
          "video.aiVideoGeneration.demo.status.idleUploadedImage",
      },
      imageVariants: {
        img1: {
          label: "video.aiVideoGeneration.demo.imageVariant.img1.label",
          alt: "video.aiVideoGeneration.demo.imageVariant.img1.alt",
        },
        img2: {
          label: "video.aiVideoGeneration.demo.imageVariant.img2.label",
          alt: "video.aiVideoGeneration.demo.imageVariant.img2.alt",
        },
        img3: {
          label: "video.aiVideoGeneration.demo.imageVariant.img3.label",
          alt: "video.aiVideoGeneration.demo.imageVariant.img3.alt",
        },
        img4: {
          label: "video.aiVideoGeneration.demo.imageVariant.img4.label",
          alt: "video.aiVideoGeneration.demo.imageVariant.img4.alt",
        },
        img5: {
          label: "video.aiVideoGeneration.demo.imageVariant.img5.label",
          alt: "video.aiVideoGeneration.demo.imageVariant.img5.alt",
        },
        img6: {
          label: "video.aiVideoGeneration.demo.imageVariant.img6.label",
          alt: "video.aiVideoGeneration.demo.imageVariant.img6.alt",
        },
      },
      promptVersions: {
        version1: "video.aiVideoGeneration.demo.promptVersion.version1",
        version2: "video.aiVideoGeneration.demo.promptVersion.version2",
        version3: "video.aiVideoGeneration.demo.promptVersion.version3",
        version3Refinement:
          "video.aiVideoGeneration.demo.promptVersion.version3.refinement",
      },
      motionDraft: {
        camera: "video.aiVideoGeneration.demo.motionDraft.camera",
        environmental: "video.aiVideoGeneration.demo.motionDraft.environmental",
        subject: "video.aiVideoGeneration.demo.motionDraft.subject",
      },
      voice: {
        script: "video.aiVideoGeneration.demo.voice.script",
        emotion: "video.aiVideoGeneration.demo.voice.emotion",
        presets: {
          maleWarm: "video.aiVideoGeneration.demo.voicePreset.maleWarm",
          femaleCalm: "video.aiVideoGeneration.demo.voicePreset.femaleCalm",
          narratorDocumentary:
            "video.aiVideoGeneration.demo.voicePreset.narratorDocumentary",
        },
      },
    },
    screen: {
      stageShortLabel: {
        idle: "video.aiVideoGeneration.screen.stageShortLabel.idle",
        generatingImages:
          "video.aiVideoGeneration.screen.stageShortLabel.generatingImages",
        imageSelection:
          "video.aiVideoGeneration.screen.stageShortLabel.imageSelection",
        generatingVideo:
          "video.aiVideoGeneration.screen.stageShortLabel.generatingVideo",
        playback: "video.aiVideoGeneration.screen.stageShortLabel.playback",
        voiceover: "video.aiVideoGeneration.screen.stageShortLabel.voiceover",
        export: "video.aiVideoGeneration.screen.stageShortLabel.export",
      },
      selected: "video.aiVideoGeneration.screen.image.selected",
      imageControls: "video.aiVideoGeneration.screen.image.controls",
      refine: "video.aiVideoGeneration.screen.action.refine",
      save: "video.aiVideoGeneration.screen.action.save",
      useForVideo: "video.aiVideoGeneration.screen.action.useForVideo",
      generatingImagesHeading:
        "video.aiVideoGeneration.screen.generatingImages.heading",
      imageSelectionHeading:
        "video.aiVideoGeneration.screen.imageSelection.heading",
      imageSelectionDescription:
        "video.aiVideoGeneration.screen.imageSelection.description",
      generatingVideoHeading:
        "video.aiVideoGeneration.screen.generatingVideo.heading",
      imagePreview: "video.aiVideoGeneration.screen.preview.image",
      motionSummary: "video.aiVideoGeneration.screen.motion.summary",
      cameraMotion: "video.aiVideoGeneration.screen.motion.camera",
      environmentalMotion:
        "video.aiVideoGeneration.screen.motion.environmental",
      subjectMotion: "video.aiVideoGeneration.screen.motion.subject",
      generatingVideoProgress:
        "video.aiVideoGeneration.screen.generatingVideo.progress",
      playbackHeading: "video.aiVideoGeneration.screen.playback.heading",
      previewFrame: "video.aiVideoGeneration.screen.playback.previewFrame",
      playPause: "video.aiVideoGeneration.screen.playback.playPause",
      timeline: "video.aiVideoGeneration.screen.playback.timeline",
      volume: "video.aiVideoGeneration.screen.playback.volume",
      download: "video.aiVideoGeneration.screen.playback.download",
      regenerate: "video.aiVideoGeneration.screen.playback.regenerate",
      addVoiceover: "video.aiVideoGeneration.screen.playback.addVoiceover",
      voiceoverPanel: "video.aiVideoGeneration.screen.voiceover.panel",
      extractedSpeech: "video.aiVideoGeneration.screen.voiceover.extractedSpeech",
      voice: "video.aiVideoGeneration.screen.voiceover.voice",
      speed: "video.aiVideoGeneration.screen.voiceover.speed",
      emotion: "video.aiVideoGeneration.screen.voiceover.emotion",
      exportModal: "video.aiVideoGeneration.screen.export.modal",
      exportHeading: "video.aiVideoGeneration.screen.export.heading",
      exportDescription: "video.aiVideoGeneration.screen.export.description",
      confirmExport: "video.aiVideoGeneration.screen.export.confirm",
      promptEntryHeading: "video.aiVideoGeneration.screen.promptEntry.heading",
      promptEntryDescription:
        "video.aiVideoGeneration.screen.promptEntry.description",
      uploadedImage: "video.aiVideoGeneration.screen.promptEntry.uploadedImage",
      motionInstructionsRequired:
        "video.aiVideoGeneration.screen.promptEntry.motionInstructionsRequired",
      promptEntryEmpty:
        "video.aiVideoGeneration.screen.promptEntry.emptyState",
      history: "video.aiVideoGeneration.screen.header.history",
      settings: "video.aiVideoGeneration.screen.header.settings",
      exportAction: "video.aiVideoGeneration.screen.header.export",
      account: "video.aiVideoGeneration.screen.header.account",
      contextPanel: "video.aiVideoGeneration.screen.contextPanel.title",
      promptVersions: "video.aiVideoGeneration.screen.contextPanel.promptVersions",
      stage: "video.aiVideoGeneration.screen.contextPanel.stage",
      status: "video.aiVideoGeneration.screen.contextPanel.status",
      prompt: "video.aiVideoGeneration.screen.contextPanel.prompt",
      promptInput: "video.aiVideoGeneration.screen.prompt.input",
      uploadImage: "video.aiVideoGeneration.screen.prompt.uploadImage",
      advanced: "video.aiVideoGeneration.screen.prompt.advanced",
      generate: "video.aiVideoGeneration.screen.prompt.generate",
      motionPromptRequired:
        "video.aiVideoGeneration.screen.prompt.motionPromptRequired",
    },
    demoComponent: {
      stageSelector: "video.aiVideoGeneration.demoComponent.stageSelector",
    },
  },
} as const;

type LeafValues<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? LeafValues<T[keyof T]>
    : never;

export type VideoTranslationKey = LeafValues<typeof videoTranslationKeys>;

export type VideoTranslationResolver = (
  key: VideoTranslationKey,
  args?: TranslationArgs
) => string;

export type VideoRuntimeTranslator = (
  key: string,
  args?: TranslationArgs
) => string;

export { videoEnGbTranslations };

export const videoTranslations = {
  "en-GB": videoEnGbTranslations,
} as const satisfies Partial<Record<string, TranslationDictionary>>;

function renderTranslationValue(
  value: TranslationValue | undefined,
  args: TranslationArgs,
): string | null {
  if (typeof value === "function") {
    return value(args);
  }

  if (typeof value === "string") {
    return value.replace(/\{(\w+)\}/g, (_match, placeholder: string) => {
      const replacement = args[placeholder];
      return replacement !== undefined ? String(replacement) : `{${placeholder}}`;
    });
  }

  return null;
}

export function getVideoDefaultTranslation(
  key: VideoTranslationKey,
  args: TranslationArgs = {},
): string {
  return renderTranslationValue(videoEnGbTranslations[key], args) ?? key;
}

export function resolveVideoTranslation(
  translator: VideoRuntimeTranslator,
  key: VideoTranslationKey,
  args: TranslationArgs = {},
): string {
  const translated = translator(key, args);
  return translated === key ? getVideoDefaultTranslation(key, args) : translated;
}

export function createVideoTranslationResolver(
  translator: VideoRuntimeTranslator,
): VideoTranslationResolver {
  return (key, args) => resolveVideoTranslation(translator, key, args);
}

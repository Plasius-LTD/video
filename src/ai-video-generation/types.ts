export type AIVideoGenerationStage =
  | "idle"
  | "generatingImages"
  | "imageSelection"
  | "generatingVideo"
  | "playback"
  | "voiceover"
  | "export";

export interface AIVideoPromptVersion {
  id: string;
  label: string;
  basePrompt: string;
  refinement?: string;
  isActive?: boolean;
}

export interface AIVideoImageVariant {
  id: string;
  label: string;
  src?: string;
  alt?: string;
  isSelected?: boolean;
  isSaved?: boolean;
}

export interface AIVideoMotionDraft {
  cameraMotion: string;
  environmentalMotion: string;
  subjectMotion: string;
}

export interface AIVideoVoicePreset {
  id: string;
  label: string;
}

export interface AIVideoVoiceSettings {
  script: string;
  voiceId: string;
  speed: number;
  emotion: string;
}

export interface AIVideoGenerationScreenModel {
  stage: AIVideoGenerationStage;
  projectName: string;
  prompt: string;
  promptPlaceholder?: string;
  canGenerate: boolean;
  statusText?: string;
  generationProgress?: number;
  imageVariants: AIVideoImageVariant[];
  selectedImageId?: string;
  promptVersions: AIVideoPromptVersion[];
  motionDraft: AIVideoMotionDraft;
  motionPrompt?: string;
  uploadedImageName?: string;
  videoSource?: string;
  voiceSettings: AIVideoVoiceSettings;
  voicePresets: AIVideoVoicePreset[];
}

import type { VideoTranslationKey } from "../i18n.js";

export const videoEnGbTranslations = {
  "video.aiVideoGeneration.stage.idle.label": "Idle",
  "video.aiVideoGeneration.stage.idle.mainUI": "Prompt input",
  "video.aiVideoGeneration.stage.idle.description":
    "Base prompt entry with optional image upload and advanced settings.",
  "video.aiVideoGeneration.stage.generatingImages.label": "Generating Images",
  "video.aiVideoGeneration.stage.generatingImages.mainUI": "Skeleton grid",
  "video.aiVideoGeneration.stage.generatingImages.description":
    "Asynchronous generation feedback with shimmer placeholders.",
  "video.aiVideoGeneration.stage.imageSelection.label": "Image Selection",
  "video.aiVideoGeneration.stage.imageSelection.mainUI": "Image grid",
  "video.aiVideoGeneration.stage.imageSelection.description":
    "Select, refine, save, and mark an image as the video source.",
  "video.aiVideoGeneration.stage.generatingVideo.label": "Generating Video",
  "video.aiVideoGeneration.stage.generatingVideo.mainUI": "Image + progress",
  "video.aiVideoGeneration.stage.generatingVideo.description":
    "Motion extraction and generation progress with live feedback.",
  "video.aiVideoGeneration.stage.playback.label": "Playback",
  "video.aiVideoGeneration.stage.playback.mainUI": "Video player",
  "video.aiVideoGeneration.stage.playback.description":
    "Playback controls, download, regenerate, and voiceover entry point.",
  "video.aiVideoGeneration.stage.voiceover.label": "Voiceover",
  "video.aiVideoGeneration.stage.voiceover.mainUI": "Bottom voice panel",
  "video.aiVideoGeneration.stage.voiceover.description":
    "Editable script, voice presets, speed/emotion controls, waveform preview.",
  "video.aiVideoGeneration.stage.export.label": "Export",
  "video.aiVideoGeneration.stage.export.mainUI": "Export modal",
  "video.aiVideoGeneration.stage.export.description":
    "Final artifact export options with quality and format metadata.",
  "video.aiVideoGeneration.demo.projectName": "Mountain Valley Storyboard",
  "video.aiVideoGeneration.demo.basePrompt": "Mountain village at sunset",
  "video.aiVideoGeneration.demo.refinement":
    "Add fog rolling through the valley",
  "video.aiVideoGeneration.demo.prompt.placeholder":
    "Describe your scene, camera movement, mood, and intended spoken narration...",
  "video.aiVideoGeneration.demo.uploadedImageName": "uploaded-village-frame.png",
  "video.aiVideoGeneration.demo.motionPrompt":
    "Camera slowly pans left with drifting fog and gentle ambient motion.",
  "video.aiVideoGeneration.demo.status.idle":
    "Ready to generate image directions.",
  "video.aiVideoGeneration.demo.status.generatingImages":
    "Generating course-setting image variants...",
  "video.aiVideoGeneration.demo.status.imageSelection":
    "Choose a visual anchor for motion extraction.",
  "video.aiVideoGeneration.demo.status.generatingVideo":
    "Generating video from selected course image...",
  "video.aiVideoGeneration.demo.status.playback": "Video ready for review.",
  "video.aiVideoGeneration.demo.status.voiceover": "Voiceover tools ready.",
  "video.aiVideoGeneration.demo.status.export":
    "Review export profile and metadata.",
  "video.aiVideoGeneration.demo.status.idleUploadedImage":
    "Upload Image: complete. Add motion instructions (required).",
  "video.aiVideoGeneration.demo.imageVariant.img1.label": "Variant 1",
  "video.aiVideoGeneration.demo.imageVariant.img1.alt":
    "Village view with warm skyline",
  "video.aiVideoGeneration.demo.imageVariant.img2.label": "Variant 2",
  "video.aiVideoGeneration.demo.imageVariant.img2.alt":
    "Village rooftops and distant mountains",
  "video.aiVideoGeneration.demo.imageVariant.img3.label": "Variant 3",
  "video.aiVideoGeneration.demo.imageVariant.img3.alt":
    "Bridge over misted valley",
  "video.aiVideoGeneration.demo.imageVariant.img4.label": "Variant 4",
  "video.aiVideoGeneration.demo.imageVariant.img4.alt":
    "Forest edge overlooking village lights",
  "video.aiVideoGeneration.demo.imageVariant.img5.label": "Variant 5",
  "video.aiVideoGeneration.demo.imageVariant.img5.alt":
    "Cloud bank drifting above the town",
  "video.aiVideoGeneration.demo.imageVariant.img6.label": "Variant 6",
  "video.aiVideoGeneration.demo.imageVariant.img6.alt":
    "Cinematic wide frame across the valley",
  "video.aiVideoGeneration.demo.promptVersion.version1": "Version 1",
  "video.aiVideoGeneration.demo.promptVersion.version2": "Version 2",
  "video.aiVideoGeneration.demo.promptVersion.version3": "Version 3",
  "video.aiVideoGeneration.demo.promptVersion.version3.refinement":
    "Add fog rolling through the valley; camera starts low and pans left.",
  "video.aiVideoGeneration.demo.motionDraft.camera":
    "Camera slowly pans left, then settles into a medium-wide frame.",
  "video.aiVideoGeneration.demo.motionDraft.environmental":
    "Fog layers move through the valley while lantern light flickers.",
  "video.aiVideoGeneration.demo.motionDraft.subject":
    "Foreground flags sway and distant birds cross near the skyline.",
  "video.aiVideoGeneration.demo.voice.script":
    "Welcome to the ancient valley. Each light tells a story waiting to be explored.",
  "video.aiVideoGeneration.demo.voice.emotion": "Neutral",
  "video.aiVideoGeneration.demo.voicePreset.maleWarm": "Male Warm",
  "video.aiVideoGeneration.demo.voicePreset.femaleCalm": "Female Calm",
  "video.aiVideoGeneration.demo.voicePreset.narratorDocumentary":
    "Narrator Documentary",
  "video.aiVideoGeneration.screen.stageShortLabel.idle": "Prompt",
  "video.aiVideoGeneration.screen.stageShortLabel.generatingImages": "Images",
  "video.aiVideoGeneration.screen.stageShortLabel.imageSelection": "Selection",
  "video.aiVideoGeneration.screen.stageShortLabel.generatingVideo": "Video",
  "video.aiVideoGeneration.screen.stageShortLabel.playback": "Playback",
  "video.aiVideoGeneration.screen.stageShortLabel.voiceover": "Voiceover",
  "video.aiVideoGeneration.screen.stageShortLabel.export": "Export",
  "video.aiVideoGeneration.screen.image.selected": "Selected",
  "video.aiVideoGeneration.screen.image.controls": "{label} controls",
  "video.aiVideoGeneration.screen.action.refine": "Refine",
  "video.aiVideoGeneration.screen.action.save": "Save",
  "video.aiVideoGeneration.screen.action.useForVideo": "Use for Video",
  "video.aiVideoGeneration.screen.generatingImages.heading":
    "Generating Image Variants",
  "video.aiVideoGeneration.screen.imageSelection.heading":
    "Course Setting Image Grid",
  "video.aiVideoGeneration.screen.imageSelection.description":
    "Select a visual anchor before video generation.",
  "video.aiVideoGeneration.screen.generatingVideo.heading":
    "Video Generation Phase",
  "video.aiVideoGeneration.screen.preview.image": "Image Preview",
  "video.aiVideoGeneration.screen.motion.summary": "Motion Summary",
  "video.aiVideoGeneration.screen.motion.camera": "Camera motion",
  "video.aiVideoGeneration.screen.motion.environmental": "Environmental motion",
  "video.aiVideoGeneration.screen.motion.subject": "Subject motion",
  "video.aiVideoGeneration.screen.generatingVideo.progress":
    "Generating Video...",
  "video.aiVideoGeneration.screen.playback.heading": "Video Playback",
  "video.aiVideoGeneration.screen.playback.previewFrame": "16:9 Preview Frame",
  "video.aiVideoGeneration.screen.playback.playPause": "Play / Pause",
  "video.aiVideoGeneration.screen.playback.timeline": "Timeline",
  "video.aiVideoGeneration.screen.playback.volume": "Volume",
  "video.aiVideoGeneration.screen.playback.download": "Download",
  "video.aiVideoGeneration.screen.playback.regenerate": "Regenerate",
  "video.aiVideoGeneration.screen.playback.addVoiceover": "Add Voiceover",
  "video.aiVideoGeneration.screen.voiceover.panel": "Voiceover panel",
  "video.aiVideoGeneration.screen.voiceover.extractedSpeech":
    "Extracted Speech",
  "video.aiVideoGeneration.screen.voiceover.voice": "Voice",
  "video.aiVideoGeneration.screen.voiceover.speed": "Speed: {speed}x",
  "video.aiVideoGeneration.screen.voiceover.emotion": "Emotion: {emotion}",
  "video.aiVideoGeneration.screen.export.modal": "Export modal",
  "video.aiVideoGeneration.screen.export.heading": "Export",
  "video.aiVideoGeneration.screen.export.description":
    "Finalize codec, quality, and voice mixdown profile.",
  "video.aiVideoGeneration.screen.export.confirm": "Confirm Export",
  "video.aiVideoGeneration.screen.promptEntry.heading": "Prompt Entry",
  "video.aiVideoGeneration.screen.promptEntry.description":
    "Start with a cinematic prompt, then generate course-setting images.",
  "video.aiVideoGeneration.screen.promptEntry.uploadedImage":
    "Upload Image: {fileName}",
  "video.aiVideoGeneration.screen.promptEntry.motionInstructionsRequired":
    "Add Motion Instructions (Required)",
  "video.aiVideoGeneration.screen.promptEntry.emptyState":
    "Upload an image or write a prompt to begin.",
  "video.aiVideoGeneration.screen.header.history": "History",
  "video.aiVideoGeneration.screen.header.settings": "Settings",
  "video.aiVideoGeneration.screen.header.export": "Export",
  "video.aiVideoGeneration.screen.header.account": "Account",
  "video.aiVideoGeneration.screen.contextPanel.title": "Context Panel",
  "video.aiVideoGeneration.screen.contextPanel.promptVersions":
    "Prompt versions",
  "video.aiVideoGeneration.screen.contextPanel.stage": "Stage",
  "video.aiVideoGeneration.screen.contextPanel.status": "Status",
  "video.aiVideoGeneration.screen.contextPanel.prompt": "Prompt",
  "video.aiVideoGeneration.screen.prompt.input": "Prompt input",
  "video.aiVideoGeneration.screen.prompt.uploadImage": "Upload Image",
  "video.aiVideoGeneration.screen.prompt.advanced": "Advanced",
  "video.aiVideoGeneration.screen.prompt.generate": "Generate",
  "video.aiVideoGeneration.screen.prompt.motionPromptRequired":
    "Upload Image complete. Motion prompt is required before generating.",
  "video.aiVideoGeneration.demoComponent.stageSelector": "Stage selector",
} as const satisfies Record<VideoTranslationKey, string>;

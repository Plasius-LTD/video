import type { CSSProperties, ReactNode } from "react";
import { aiVideoStageFlow } from "./stages.js";
import { aiVideoGenerationTokens } from "./tokens.js";
import type { AIVideoGenerationScreenModel, AIVideoImageVariant, AIVideoGenerationStage } from "./types.js";

const stageLabel: Record<AIVideoGenerationStage, string> = {
  idle: "Prompt",
  generatingImages: "Images",
  imageSelection: "Selection",
  generatingVideo: "Video",
  playback: "Playback",
  voiceover: "Voiceover",
  export: "Export",
};

function clampProgress(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return Math.round(value);
}

function gradientForCard(index: number): string {
  const gradients = [
    "linear-gradient(140deg, #20305a 0%, #6c5ce7 45%, #00d4ff 100%)",
    "linear-gradient(140deg, #2b1f3f 0%, #6c5ce7 48%, #3dd9f5 100%)",
    "linear-gradient(140deg, #283645 0%, #4f89c2 46%, #9be3ff 100%)",
    "linear-gradient(140deg, #2f2921 0%, #8a5f3a 48%, #ffd39f 100%)",
  ];

  return gradients[index % gradients.length];
}

export interface AIVideoGenerationScreenCallbacks {
  onHistory?: () => void;
  onSettings?: () => void;
  onExport?: () => void;
  onAccount?: () => void;
  onGenerate?: () => void;
  onUploadImage?: () => void;
  onAdvanced?: () => void;
  onSelectImage?: (variant: AIVideoImageVariant) => void;
  onRefineImage?: (variant: AIVideoImageVariant) => void;
  onSaveImage?: (variant: AIVideoImageVariant) => void;
  onUseForVideo?: (variant: AIVideoImageVariant) => void;
  onAddVoiceover?: () => void;
  onRegenerateVideo?: () => void;
  onDownloadVideo?: () => void;
}

export interface AIVideoGenerationScreenProps extends AIVideoGenerationScreenCallbacks {
  model: AIVideoGenerationScreenModel;
  className?: string;
  style?: CSSProperties;
  showContextPanel?: boolean;
  reduceMotion?: boolean;
}

function renderImageCard(
  variant: AIVideoImageVariant,
  index: number,
  callbacks: AIVideoGenerationScreenCallbacks,
): ReactNode {
  const isSelected = Boolean(variant.isSelected);

  return (
    <article
      className={`plv-image-card${isSelected ? " is-selected" : ""}`}
      key={variant.id}
      aria-label={variant.alt ?? variant.label}
    >
      <button
        type="button"
        className="plv-image-select-hitbox"
        aria-pressed={isSelected}
        onClick={() => callbacks.onSelectImage?.(variant)}
      >
        {variant.src ? (
          <img src={variant.src} alt={variant.alt ?? variant.label} className="plv-image-media" />
        ) : (
          <div className="plv-image-media" style={{ background: gradientForCard(index) }} />
        )}
        <div className="plv-image-caption">
          <span>{variant.label}</span>
          {isSelected ? <span className="plv-chip">Selected</span> : null}
        </div>
      </button>

      <div className="plv-image-overlay-controls" role="group" aria-label={`${variant.label} controls`}>
        <button type="button" onClick={() => callbacks.onRefineImage?.(variant)}>
          Refine
        </button>
        <button type="button" onClick={() => callbacks.onSaveImage?.(variant)}>
          Save
        </button>
        <button type="button" onClick={() => callbacks.onUseForVideo?.(variant)}>
          Use for Video
        </button>
      </div>

      {isSelected ? (
        <span className="plv-selected-checkmark" aria-hidden="true">
          ✓
        </span>
      ) : null}
    </article>
  );
}

function renderSkeletonGrid(count: number): ReactNode {
  const items = Array.from({ length: count }).map((_, index) => (
    <div className="plv-skeleton-card" key={`skeleton-${index}`} />
  ));

  return <div className="plv-image-grid">{items}</div>;
}

function renderStageCanvas(
  model: AIVideoGenerationScreenModel,
  callbacks: AIVideoGenerationScreenCallbacks,
): ReactNode {
  const progress = clampProgress(model.generationProgress);

  if (model.stage === "generatingImages") {
    return (
      <>
        <h2>Generating Image Variants</h2>
        <p className="plv-muted">{model.statusText}</p>
        {renderSkeletonGrid(model.imageVariants.length > 0 ? model.imageVariants.length : 8)}
      </>
    );
  }

  if (model.stage === "imageSelection") {
    return (
      <>
        <h2>Course Setting Image Grid</h2>
        <p className="plv-muted">Select a visual anchor before video generation.</p>
        <div className="plv-image-grid">
          {model.imageVariants.map((variant, index) => renderImageCard(variant, index, callbacks))}
        </div>
      </>
    );
  }

  if (model.stage === "generatingVideo") {
    return (
      <>
        <h2>Video Generation Phase</h2>
        <div className="plv-split-panel">
          <div className="plv-preview-box">
            <div className="plv-preview-title">Image Preview</div>
            <div className="plv-preview-media" />
          </div>
          <div className="plv-motion-panel">
            <div className="plv-preview-title">Motion Summary</div>
            <label>
              Camera motion
              <textarea readOnly value={model.motionDraft.cameraMotion} />
            </label>
            <label>
              Environmental motion
              <textarea readOnly value={model.motionDraft.environmentalMotion} />
            </label>
            <label>
              Subject motion
              <textarea readOnly value={model.motionDraft.subjectMotion} />
            </label>
          </div>
        </div>
        <div className="plv-progress-panel">
          <div className="plv-progress-topline">
            <span>Generating Video...</span>
            <span>{progress}%</span>
          </div>
          <div className="plv-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div className="plv-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="plv-waveform" aria-hidden="true" />
        </div>
      </>
    );
  }

  if (model.stage === "playback" || model.stage === "voiceover" || model.stage === "export") {
    return (
      <>
        <h2>Video Playback</h2>
        <div className="plv-player-shell">
          <div className="plv-player-frame">
            <div className="plv-player-glow" />
            <div className="plv-player-screen">16:9 Preview Frame</div>
          </div>
          <div className="plv-player-controls">
            <button type="button">Play / Pause</button>
            <button type="button">Timeline</button>
            <button type="button">Volume</button>
            <button type="button" onClick={callbacks.onDownloadVideo}>
              Download
            </button>
            <button type="button" onClick={callbacks.onRegenerateVideo}>
              Regenerate
            </button>
            <button type="button" onClick={callbacks.onAddVoiceover}>
              Add Voiceover
            </button>
          </div>
        </div>

        {model.stage === "voiceover" ? (
          <section className="plv-voiceover-panel" aria-label="Voiceover panel">
            <div className="plv-preview-title">Extracted Speech</div>
            <textarea readOnly value={model.voiceSettings.script} />
            <div className="plv-voice-grid">
              <div>
                <div className="plv-field-label">Voice</div>
                <div className="plv-pill-group">
                  {model.voicePresets.map((voice) => (
                    <button
                      type="button"
                      key={voice.id}
                      className={voice.id === model.voiceSettings.voiceId ? "is-active" : undefined}
                    >
                      {voice.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="plv-field-label">Speed: {model.voiceSettings.speed.toFixed(1)}x</div>
                <div className="plv-slider-track" />
              </div>
              <div>
                <div className="plv-field-label">Emotion: {model.voiceSettings.emotion}</div>
                <div className="plv-slider-track" />
              </div>
            </div>
            <div className="plv-waveform is-voiceover" aria-hidden="true" />
          </section>
        ) : null}

        {model.stage === "export" ? (
          <div className="plv-export-modal" role="dialog" aria-label="Export modal">
            <h3>Export</h3>
            <p>Finalize codec, quality, and voice mixdown profile.</p>
            <button type="button" onClick={callbacks.onExport}>
              Confirm Export
            </button>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <h2>Prompt Entry</h2>
      <p className="plv-muted">Start with a cinematic prompt, then generate course-setting images.</p>
      <div className="plv-idle-canvas">
        {model.uploadedImageName ? (
          <>
            <div className="plv-upload-chip">Upload Image: {model.uploadedImageName}</div>
            <div className="plv-required-chip">Add Motion Instructions (Required)</div>
          </>
        ) : (
          <div className="plv-upload-chip">Upload an image or write a prompt to begin.</div>
        )}
      </div>
    </>
  );
}

export function AIVideoGenerationScreen({
  model,
  className,
  style,
  showContextPanel = true,
  reduceMotion = false,
  ...callbacks
}: AIVideoGenerationScreenProps) {
  const rootClassName = [
    "plv-video-screen",
    reduceMotion ? "plv-reduce-motion" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const requiresMotionPrompt = Boolean(model.uploadedImageName) && !model.motionPrompt?.trim();

  return (
    <section className={rootClassName} style={style}>
      <style>{AI_VIDEO_GENERATION_SCREEN_STYLES}</style>

      <header className="plv-header">
        <div className="plv-logo">PLASIUS</div>
        <div className="plv-project-title">{model.projectName}</div>
        <div className="plv-header-actions">
          <button type="button" onClick={callbacks.onHistory}>
            History
          </button>
          <button type="button" onClick={callbacks.onSettings}>
            Settings
          </button>
          <button type="button" onClick={callbacks.onExport}>
            Export
          </button>
          <button type="button" onClick={callbacks.onAccount}>
            Account
          </button>
        </div>
      </header>

      <main className="plv-main-canvas">{renderStageCanvas(model, callbacks)}</main>

      {showContextPanel ? (
        <aside className="plv-context-panel">
          <div className="plv-context-title">Context Panel</div>
          <div className="plv-chip-row" role="list" aria-label="Prompt versions">
            {model.promptVersions.map((version) => (
              <button
                type="button"
                key={version.id}
                role="listitem"
                className={version.isActive ? "is-active" : undefined}
              >
                {version.label}
              </button>
            ))}
          </div>
          <div className="plv-metadata-grid">
            <div>
              <span>Stage</span>
              <strong>{stageLabel[model.stage]}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{model.statusText}</strong>
            </div>
            <div>
              <span>Prompt</span>
              <strong>{model.prompt}</strong>
            </div>
          </div>
          <div className="plv-stage-row">
            {aiVideoStageFlow.map((stage) => (
              <span key={stage.stage} className={stage.stage === model.stage ? "is-active" : undefined}>
                {stage.label}
              </span>
            ))}
          </div>
        </aside>
      ) : null}

      <footer className="plv-prompt-area">
        <label className="plv-sr-only" htmlFor="plv-prompt-textarea">
          Prompt input
        </label>
        <textarea
          id="plv-prompt-textarea"
          value={model.prompt}
          readOnly
          placeholder={model.promptPlaceholder}
          aria-label="Prompt input"
        />

        <div className="plv-prompt-actions">
          <button type="button" onClick={callbacks.onUploadImage}>
            Upload Image
          </button>
          <button type="button" onClick={callbacks.onAdvanced}>
            Advanced
          </button>
          <button type="button" className="is-generate" disabled={!model.canGenerate} onClick={callbacks.onGenerate}>
            Generate
          </button>
        </div>

        {requiresMotionPrompt ? (
          <div className="plv-required-chip">Upload Image complete. Motion prompt is required before generating.</div>
        ) : null}
      </footer>
    </section>
  );
}

/* c8 ignore start */
export const AI_VIDEO_GENERATION_SCREEN_STYLES = `
.plv-video-screen {
  --plv-background: ${aiVideoGenerationTokens.color.background};
  --plv-surface: ${aiVideoGenerationTokens.color.surface};
  --plv-border: ${aiVideoGenerationTokens.color.borderSubtle};
  --plv-text: ${aiVideoGenerationTokens.color.textPrimary};
  --plv-text-muted: ${aiVideoGenerationTokens.color.textSecondary};
  --plv-accent-primary: ${aiVideoGenerationTokens.color.accentPrimary};
  --plv-accent-secondary: ${aiVideoGenerationTokens.color.accentSecondary};
  --plv-success: ${aiVideoGenerationTokens.color.success};
  --plv-warning: ${aiVideoGenerationTokens.color.warning};
  --plv-error: ${aiVideoGenerationTokens.color.error};
  --plv-prompt-placeholder: ${aiVideoGenerationTokens.color.placeholderText};
  --plv-header-height: ${aiVideoGenerationTokens.layout.headerHeightPx}px;
  --plv-transition: ${aiVideoGenerationTokens.animation.standardMs}ms ${aiVideoGenerationTokens.animation.easing};
  font-family: ${aiVideoGenerationTokens.typography.bodyFontFamily};
  color: var(--plv-text);
  background:
    radial-gradient(1200px 520px at 20% -10%, rgba(108, 92, 231, 0.22), transparent 62%),
    radial-gradient(1000px 540px at 80% -20%, rgba(0, 212, 255, 0.16), transparent 60%),
    var(--plv-background);
  border-radius: ${aiVideoGenerationTokens.radius.panelPx}px;
  border: 1px solid var(--plv-border);
  overflow: hidden;
  display: grid;
  grid-template-rows: var(--plv-header-height) minmax(360px, 1fr) auto auto;
  min-height: 820px;
}

.plv-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 16px;
  border-bottom: 1px solid var(--plv-border);
  background: #0f1117;
}

.plv-logo {
  font-weight: 800;
  letter-spacing: 0.08em;
}

.plv-project-title {
  font-size: 15px;
  color: var(--plv-text-muted);
}

.plv-header-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.plv-header-actions button,
.plv-player-controls button,
.plv-prompt-actions button,
.plv-chip-row button,
.plv-pill-group button,
.plv-image-overlay-controls button {
  border: 1px solid var(--plv-border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--plv-text);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  transition: all var(--plv-transition);
}

.plv-header-actions button:hover,
.plv-player-controls button:hover,
.plv-prompt-actions button:hover,
.plv-chip-row button:hover,
.plv-pill-group button:hover,
.plv-image-overlay-controls button:hover {
  border-color: rgba(0, 212, 255, 0.45);
  box-shadow: 0 0 0 1px rgba(0, 212, 255, 0.22);
}

.plv-main-canvas {
  padding: 18px;
}

.plv-main-canvas h2 {
  margin: 0 0 8px;
  font-family: ${aiVideoGenerationTokens.typography.headingFontFamily};
  font-size: ${aiVideoGenerationTokens.typography.h2Px}px;
}

.plv-muted {
  margin: 0 0 14px;
  color: var(--plv-text-muted);
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
}

.plv-image-grid {
  display: grid;
  gap: ${aiVideoGenerationTokens.layout.gridGapPx}px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.plv-image-card,
.plv-skeleton-card {
  aspect-ratio: ${aiVideoGenerationTokens.layout.cardAspectRatio};
  border-radius: ${aiVideoGenerationTokens.radius.cardPx}px;
  position: relative;
  overflow: hidden;
}

.plv-image-card {
  border: 1px solid var(--plv-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: transform var(--plv-transition), box-shadow var(--plv-transition), border-color var(--plv-transition);
}

.plv-image-card:hover {
  transform: scale(1.02);
  border-color: rgba(0, 212, 255, 0.55);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.48);
}

.plv-image-card.is-selected {
  border: 2px solid var(--plv-accent-secondary);
  box-shadow: 0 0 0 1px rgba(108, 92, 231, 0.35), 0 16px 32px rgba(0, 0, 0, 0.55);
}

.plv-image-select-hitbox {
  border: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
}

.plv-image-media {
  position: absolute;
  inset: 0;
}

.plv-image-caption {
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 17, 23, 0.84) 60%);
}

.plv-chip {
  font-size: 11px;
  border-radius: 999px;
  padding: 2px 8px;
  background: rgba(0, 212, 255, 0.14);
  border: 1px solid rgba(0, 212, 255, 0.36);
}

.plv-selected-checkmark {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #00121a;
  background: #7ff3ff;
  font-weight: 900;
}

.plv-image-overlay-controls {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity var(--plv-transition), transform var(--plv-transition);
}

.plv-image-card:hover .plv-image-overlay-controls {
  opacity: 1;
  transform: translateY(0);
}

.plv-skeleton-card {
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0.03) 20%,
    rgba(255, 255, 255, 0.14) 40%,
    rgba(255, 255, 255, 0.03) 60%
  );
  background-size: 200% 100%;
  animation: plv-shimmer 1.25s linear infinite;
}

.plv-split-panel {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 16px;
}

.plv-preview-box,
.plv-motion-panel,
.plv-progress-panel,
.plv-player-shell,
.plv-voiceover-panel,
.plv-idle-canvas,
.plv-context-panel,
.plv-prompt-area {
  background: var(--plv-surface);
  border: 1px solid var(--plv-border);
  border-radius: ${aiVideoGenerationTokens.radius.panelPx}px;
}

.plv-preview-box,
.plv-motion-panel {
  padding: 14px;
}

.plv-preview-title {
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--plv-text-muted);
  margin-bottom: 10px;
}

.plv-preview-media {
  width: 100%;
  aspect-ratio: ${aiVideoGenerationTokens.layout.cardAspectRatio};
  border-radius: ${aiVideoGenerationTokens.radius.cardPx}px;
  background: linear-gradient(135deg, #2d3e67 0%, #6c5ce7 45%, #00d4ff 100%);
}

.plv-motion-panel label {
  display: block;
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
  color: var(--plv-text-muted);
  margin-bottom: 10px;
}

.plv-motion-panel textarea,
.plv-voiceover-panel textarea {
  width: 100%;
  margin-top: 6px;
  border: 1px solid var(--plv-border);
  border-radius: 10px;
  min-height: 62px;
  resize: none;
  background: rgba(255, 255, 255, 0.02);
  color: var(--plv-text);
  padding: 10px;
  font-family: ${aiVideoGenerationTokens.typography.bodyFontFamily};
}

.plv-progress-panel {
  margin-top: 16px;
  padding: 12px 14px;
}

.plv-progress-topline {
  display: flex;
  justify-content: space-between;
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
  margin-bottom: 8px;
}

.plv-progress-track {
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.plv-progress-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--plv-accent-primary), var(--plv-accent-secondary));
  transition: width var(--plv-transition);
}

.plv-waveform {
  margin-top: 10px;
  height: 32px;
  border-radius: 10px;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(108, 92, 231, 0.24) 0,
      rgba(108, 92, 231, 0.24) 4px,
      rgba(0, 212, 255, 0.28) 4px,
      rgba(0, 212, 255, 0.28) 8px
    );
  animation: plv-wave 1.2s linear infinite;
}

.plv-waveform.is-voiceover {
  height: 46px;
}

.plv-player-shell {
  padding: 14px;
}

.plv-player-frame {
  position: relative;
  aspect-ratio: ${aiVideoGenerationTokens.layout.cardAspectRatio};
  background: #020202;
  border-radius: ${aiVideoGenerationTokens.radius.cardPx}px;
  overflow: hidden;
}

.plv-player-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle at center, rgba(0, 212, 255, 0.26), transparent 60%);
}

.plv-player-screen {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: rgba(230, 234, 242, 0.74);
  font-size: 15px;
}

.plv-player-controls {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
}

.plv-voiceover-panel {
  margin-top: 14px;
  padding: 14px;
  animation: plv-slide-up var(--plv-transition);
}

.plv-voice-grid {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.plv-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.plv-pill-group .is-active,
.plv-chip-row .is-active {
  border-color: rgba(0, 212, 255, 0.6);
  box-shadow: 0 0 0 1px rgba(0, 212, 255, 0.24);
}

.plv-field-label {
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
  color: var(--plv-text-muted);
  margin-bottom: 6px;
}

.plv-slider-track {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.7), rgba(0, 212, 255, 0.7));
}

.plv-export-modal {
  margin-top: 14px;
  padding: 14px;
  border-radius: ${aiVideoGenerationTokens.radius.panelPx}px;
  border: 1px solid rgba(255, 176, 32, 0.4);
  background: rgba(255, 176, 32, 0.08);
}

.plv-export-modal h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.plv-export-modal p {
  margin: 0 0 10px;
  color: var(--plv-text-muted);
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
}

.plv-export-modal button {
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #ffb020, #ffd386);
  color: #161a23;
  font-weight: 700;
  padding: 8px 12px;
}

.plv-idle-canvas {
  min-height: 180px;
  display: grid;
  place-items: center;
  gap: 10px;
  padding: 16px;
}

.plv-upload-chip,
.plv-required-chip {
  border-radius: 999px;
  padding: 8px 12px;
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
}

.plv-upload-chip {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--plv-border);
}

.plv-required-chip {
  background: rgba(255, 176, 32, 0.12);
  border: 1px solid rgba(255, 176, 32, 0.4);
  color: #ffd18a;
}

.plv-context-panel {
  margin: 0 18px 16px;
  padding: 14px;
}

.plv-context-title {
  margin-bottom: 10px;
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--plv-text-muted);
}

.plv-chip-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.plv-metadata-grid {
  margin-top: 12px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.plv-metadata-grid div {
  display: grid;
  gap: 4px;
}

.plv-metadata-grid span {
  font-size: ${aiVideoGenerationTokens.typography.smallPx}px;
  color: var(--plv-text-muted);
}

.plv-metadata-grid strong {
  font-size: 14px;
  line-height: 1.35;
}

.plv-stage-row {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.plv-stage-row span {
  border-radius: 999px;
  padding: 5px 10px;
  border: 1px solid var(--plv-border);
  color: var(--plv-text-muted);
  font-size: 12px;
}

.plv-stage-row .is-active {
  color: var(--plv-text);
  border-color: rgba(0, 212, 255, 0.55);
}

.plv-prompt-area {
  margin: 0 18px 18px;
  padding: 14px;
}

.plv-prompt-area textarea {
  width: 100%;
  min-height: ${aiVideoGenerationTokens.layout.promptBarMinHeightPx}px;
  border: 1px solid var(--plv-border);
  border-radius: ${aiVideoGenerationTokens.radius.promptPx}px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--plv-text);
  font-family: ${aiVideoGenerationTokens.typography.bodyFontFamily};
  font-size: 17px;
  line-height: 1.45;
  padding: 12px;
  resize: vertical;
}

.plv-prompt-area textarea::placeholder {
  color: var(--plv-prompt-placeholder);
}

.plv-prompt-actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.plv-prompt-actions .is-generate {
  margin-left: auto;
  border: 0;
  background: linear-gradient(135deg, #6c5ce7, #00d4ff);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 12px 28px rgba(0, 212, 255, 0.22);
}

.plv-prompt-actions .is-generate:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 14px 34px rgba(0, 212, 255, 0.34);
}

.plv-prompt-actions .is-generate:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.plv-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.plv-reduce-motion * {
  animation: none !important;
  transition: none !important;
}

@media (max-width: 1024px) {
  .plv-video-screen {
    min-height: 920px;
  }

  .plv-split-panel {
    grid-template-columns: 1fr;
  }

  .plv-player-controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .plv-metadata-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .plv-header {
    flex-wrap: wrap;
    height: auto;
    min-height: var(--plv-header-height);
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .plv-header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .plv-image-grid {
    grid-template-columns: 1fr;
  }

  .plv-prompt-actions {
    flex-wrap: wrap;
  }

  .plv-prompt-actions .is-generate {
    margin-left: 0;
    width: 100%;
  }
}

@keyframes plv-shimmer {
  from {
    background-position: 120% 0;
  }
  to {
    background-position: -120% 0;
  }
}

@keyframes plv-wave {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 64px 0;
  }
}

@keyframes plv-slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
/* c8 ignore stop */

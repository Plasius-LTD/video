import { useMemo, useState } from "react";
import { useI18n } from "@plasius/translations";
import { createAIVideoGenerationDemoModel } from "./demo-model.js";
import { AIVideoGenerationScreen } from "./screen.js";
import { getTranslatedAIVideoStageFlow } from "./stages.js";
import type { AIVideoGenerationStage } from "./types.js";
import {
  createVideoTranslationResolver,
  videoTranslationKeys,
} from "../i18n.js";

export interface AIVideoGenerationStudioDemoProps {
  initialStage?: AIVideoGenerationStage;
}

export function AIVideoGenerationStudioDemo({
  initialStage = "idle",
}: AIVideoGenerationStudioDemoProps) {
  const { t } = useI18n();
  const translate = useMemo(() => createVideoTranslationResolver(t), [t]);
  const [stage, setStage] = useState<AIVideoGenerationStage>(initialStage);

  const model = useMemo(
    () => createAIVideoGenerationDemoModel(stage, translate),
    [stage, translate],
  );
  const stageFlow = useMemo(
    () => getTranslatedAIVideoStageFlow(translate),
    [translate],
  );

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <div
        role="group"
        aria-label={translate(
          videoTranslationKeys.aiVideoGeneration.demoComponent.stageSelector,
        )}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {stageFlow.map((item) => (
          <button
            type="button"
            key={item.stage}
            onClick={() => setStage(item.stage)}
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.14)",
              color: stage === item.stage ? "#0F1117" : "#E6EAF2",
              background: stage === item.stage ? "#00D4FF" : "rgba(255,255,255,0.04)",
              padding: "6px 10px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AIVideoGenerationScreen
        model={model}
        onGenerate={() => {
          setStage("generatingImages");
        }}
        onUseForVideo={() => {
          setStage("generatingVideo");
        }}
        onAddVoiceover={() => {
          setStage("voiceover");
        }}
        onRegenerateVideo={() => {
          setStage("generatingVideo");
        }}
        onExport={() => {
          setStage("export");
        }}
      />
    </div>
  );
}

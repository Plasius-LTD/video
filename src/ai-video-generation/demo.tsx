import { useMemo, useState } from "react";
import { createAIVideoGenerationDemoModel } from "./demo-model.js";
import { AIVideoGenerationScreen } from "./screen.js";
import { aiVideoStageFlow } from "./stages.js";
import type { AIVideoGenerationStage } from "./types.js";

export interface AIVideoGenerationStudioDemoProps {
  initialStage?: AIVideoGenerationStage;
}

export function AIVideoGenerationStudioDemo({
  initialStage = "idle",
}: AIVideoGenerationStudioDemoProps) {
  const [stage, setStage] = useState<AIVideoGenerationStage>(initialStage);

  const model = useMemo(() => createAIVideoGenerationDemoModel(stage), [stage]);

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <div
        role="group"
        aria-label="Stage selector"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {aiVideoStageFlow.map((item) => (
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

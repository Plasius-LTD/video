import { existsSync } from "node:fs";

const distEntry = new URL("../dist/index.js", import.meta.url);

if (!existsSync(distEntry)) {
  console.error("Build output not found. Run: npm run build");
  process.exit(1);
}

const mod = await import(distEntry.href);
const exported = Object.keys(mod);

console.log("Package:", "@plasius/video");
console.log("Export count:", exported.length);
console.log("Exports:", exported.slice(0, 20));

if (mod.aiVideoGenerationTokens) {
  console.log(
    "Design tokens:",
    JSON.stringify(
      {
        background: mod.aiVideoGenerationTokens.color.background,
        surface: mod.aiVideoGenerationTokens.color.surface,
        accentPrimary: mod.aiVideoGenerationTokens.color.accentPrimary,
        accentSecondary: mod.aiVideoGenerationTokens.color.accentSecondary,
      },
      null,
      2,
    ),
  );
}

if (Array.isArray(mod.aiVideoStageFlow)) {
  console.log("Stage flow:", mod.aiVideoStageFlow.map((stage) => stage.stage).join(" -> "));
}

if (typeof mod.createAIVideoGenerationDemoModel === "function") {
  const playbackModel = mod.createAIVideoGenerationDemoModel("playback");
  console.log("Playback status:", playbackModel.statusText);
}

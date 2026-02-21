# @plasius/video Demo

This is a lightweight local demo scaffold for package sanity checks.

## Run

```bash
npm run demo:run
```

## React Example

```tsx
import {
  AIVideoGenerationScreen,
  createAIVideoGenerationDemoModel,
} from "@plasius/video";

const model = createAIVideoGenerationDemoModel("imageSelection");

export function ScreenExample() {
  return <AIVideoGenerationScreen model={model} />;
}
```

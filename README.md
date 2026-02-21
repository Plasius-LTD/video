# @plasius/video

[![npm version](https://img.shields.io/npm/v/@plasius/video.svg)](https://www.npmjs.com/package/@plasius/video)
[![CD Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/video/cd.yml?branch=main&label=cd&style=flat)](https://github.com/Plasius-LTD/video/actions/workflows/cd.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/video)](https://codecov.io/gh/Plasius-LTD/video)
[![License](https://img.shields.io/github/license/Plasius-LTD/video)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Video generation components and helpers for the Plasius ecosystem.

Apache-2.0. ESM + CJS builds. TypeScript types included.

## Install

```bash
npm install @plasius/video
```

## Usage

```ts
import {
  AIVideoGenerationScreen,
  createAIVideoGenerationDemoModel,
  aiVideoGenerationTokens,
  aiVideoStageFlow,
  videoPackageInfo,
} from "@plasius/video";

console.log(videoPackageInfo.name, videoPackageInfo.version);
console.log(aiVideoGenerationTokens.color.background);
console.log(aiVideoStageFlow.map((stage) => stage.stage));

const model = createAIVideoGenerationDemoModel("imageSelection");
void AIVideoGenerationScreen;
void model;
```

## Node.js Version

This project uses Node.js **24** by default. The version is pinned in the [`.nvmrc`](./.nvmrc) file.

If you use [nvm](https://github.com/nvm-sh/nvm), run:

```bash
nvm use
```

## Package Scope

`@plasius/video` is intended to host reusable video generation interfaces and shared view-model logic used across Plasius applications.

## AI Video Generation Visual Styling Pieces

This package now includes a design-system aligned screen scaffold for:

- Prompt entry
- Image generation and selection
- Video generation and motion editing
- Playback controls
- Voiceover panel
- Export state

Primary exports:

- `AIVideoGenerationScreen`
- `AIVideoGenerationStudioDemo`
- `createAIVideoGenerationDemoModel`
- `aiVideoGenerationTokens`
- `aiVideoStageFlow`
- `AI_VIDEO_GENERATION_SCREEN_STYLES`

Reference design document:

- [`docs/ai-video-generation-screen-visual-styling-guide.md`](./docs/ai-video-generation-screen-visual-styling-guide.md)

## State Flow Summary

The staged flow aligns to the screen design sequence:

1. `idle`
2. `generatingImages`
3. `imageSelection`
4. `generatingVideo`
5. `playback`
6. `voiceover`
7. `export`

## Development

```bash
npm install
npm run build
npm run test
npm run demo:run
```

## Demo Sanity Check

```bash
npm run demo:run
```

## Publishing

This package is published via GitHub CD only.

1. Configure repository environment `production` with secret `NPM_TOKEN`.
2. Run `.github/workflows/cd.yml` via **Actions -> CD (Publish to npm) -> Run workflow**.
3. Select the version bump (`patch`, `minor`, `major`, or `none`) and optional pre-release id.

## Contributing

We welcome contributions. See:

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributor License Agreement](./legal/CLA.md)

## License

Licensed under the [Apache-2.0 License](./LICENSE).

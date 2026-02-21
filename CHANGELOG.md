# Changelog

All notable changes to this project will be documented in this file.

The format is based on **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.

---

## [Unreleased]

- **Added**
  - Added AI video generation design-system modules under `src/ai-video-generation/` with typed stage, token, and model definitions.
  - Added `AIVideoGenerationScreen` and `AIVideoGenerationStudioDemo` React components to provide a demo-ready staged UI scaffold.
  - Added visual-style token exports (`aiVideoGenerationTokens`) and stage-flow metadata (`aiVideoStageFlow`) for host app integration.
  - Added tests for design token values, stage ordering, and core style hooks in `tests/ai-video-generation-design.test.ts`.

- **Changed**
  - Added package-level GitHub CD publish workflow at `.github/workflows/cd.yml` for npm publication with provenance.
  - Hardened publish sequence to run install/test/build before version tagging and npm publish.
  - Replaced `audit:deps` from `depcheck` to `npm ls --all --omit=optional --omit=peer > /dev/null 2>&1 || true` to avoid deprecated dependency-chain risk.
  - Updated CD test stage to execute `npm run test:coverage` and upload coverage to Codecov using OIDC in the release pipeline.
  - Updated Vitest coverage reporters to include `lcov` output for Codecov ingestion.
  - Made SBOM generation non-blocking in CD and only attest when `sbom.cdx.json` is present.
  - Made SBOM release-asset upload non-blocking to avoid failing publish after successful npm release.
  - Updated README badges to include Codecov coverage and point workflow status to `cd.yml`.
  - Normalized README section headings/formatting for consistent markdown rendering.
  - Expanded README/demo examples to include the AI video generation screen scaffold and exported style primitives.

- **Fixed**
  - Updated `videoPackageInfo.version` to match the current package line.

- **Security**
  - Removed `depcheck` (and its `multimatch`/`minimatch` chain) from devDependencies to resolve reported high-severity audit findings.

## [0.1.1] - 2026-02-21

- **Added**
  - Root-level standalone npm package scaffold in `/video` with package-local governance and legal docs.
  - Demo runner script (`npm run demo:run`) with an executable sanity check at `demo/example.mjs`.

- **Changed**
  - Updated package metadata to point to the standalone `Plasius-LTD/video` repository.
  - Updated TypeScript configuration to be package-local (removed monorepo-relative `extends`).
  - Aligned toolchain dependency minimums with current `plasius-ltd-site` resolved requirements.

- **Fixed**
  - Corrected demo package labeling from `@plasius/ai` to `@plasius/video`.
  - Corrected README links to reference package-local files.

- **Security**
  - Added package-local release/governance docs to support independent npm publishing workflows.

## [0.1.0] - 2026-02-21

- **Added**
  - Initial standards-aligned package scaffold for `@plasius/video`.
  - Added package-level `.nvmrc`, `.npmrc`, `legal/`, README, and changelog.

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

---

## Release process (maintainers)

1. Update `CHANGELOG.md` under **Unreleased** with user-visible changes.
2. Bump version in `package.json` following SemVer (major/minor/patch).
3. Move entries from **Unreleased** to a new version section with the current date.
4. Tag the release in Git (`vX.Y.Z`) and push tags.
5. Publish to npm via GitHub CD pipeline.

[Unreleased]: https://github.com/Plasius-LTD/video/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/Plasius-LTD/video/releases/tag/v0.1.1
[0.1.0]: https://github.com/Plasius-LTD/video/releases/tag/v0.1.0

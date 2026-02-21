# AI Video Generation Screen - Visual Styling Guide

This document captures the implementation-facing version of the design system for the staged AI video workflow.

## Goals

- Keep cognitive load low while users iterate creatively.
- Keep stage boundaries explicit:
  - Prompt
  - Images
  - Video
  - Voice
  - Playback/Export
- Keep asynchronous operations visibly active.
- Keep refinement non-destructive with version history.
- Keep the visual tone cinematic and production-tool oriented.

## Implemented Package Pieces

- `AIVideoGenerationScreen`
  - Composite screen scaffold with:
    - 64px header bar
    - main canvas
    - optional context panel
    - bottom prompt input area
- `AIVideoGenerationStudioDemo`
  - Interactive stage switcher for design and QA walkthroughs.
- `aiVideoGenerationTokens`
  - Color, typography, spacing, animation, and layout token map.
- `aiVideoStageFlow`
  - Canonical state flow metadata.
- `createAIVideoGenerationDemoModel`
  - Demo-friendly model factory to hydrate each stage quickly.
- `AI_VIDEO_GENERATION_SCREEN_STYLES`
  - Base cinematic dark style sheet used by the screen scaffold.

## Color System

- Background: `#0F1117`
- Surface: `#161A23`
- Accent Primary: `#6C5CE7`
- Accent Secondary: `#00D4FF`
- Success: `#00C896`
- Warning: `#FFB020`
- Error: `#FF4D4F`
- Text Primary: `#E6EAF2`
- Text Secondary: `#A0A8B8`

## Typography

- Heading family: `Inter / SF Pro Display`
- Body family: `Inter`
- H1: `28px`
- H2: `20px`
- Body: `16px`
- Small metadata: `13px`
- Prompt text target: `16-18px`

## Motion and Interaction

- Transition range: `200-300ms`
- Easing: `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Includes shimmer and waveform states for async feedback.
- Supports reduced-motion mode via `reduceMotion`.

## Accessibility Notes

- Dark-surface contrast is tuned for 4.5:1+ target combinations.
- Interactive elements are keyboard-focusable buttons/inputs.
- Stage/state details are exposed in text, not color-only signals.
- Reduced-motion mode can disable non-essential animation.

## Future Extensions

- Scene timeline editor
- Layered motion controls
- Multi-shot stitching
- AI character injection controls

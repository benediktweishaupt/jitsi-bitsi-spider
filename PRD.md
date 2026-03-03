# PRD — Jitsi Bitsi Spider

## Vision

A system that takes speaker data and outputs animated, interactive posters. Each poster style is a self-contained component with its own visual language and animation logic. Same data in, different visual output — every time.

## Core Concept

One unified speaker data object. Many visual interpretations. A designer picks a poster style, feeds it the data, and gets a finished animated poster. No manual layout work, no per-speaker design decisions.

## Speaker Data Interface

Every poster component accepts a single `speaker` prop:

```typescript
interface Speaker {
  name: string
  editionNumber: number
  date: string              // ISO date: 'YYYY-MM-DD'
  time: string              // ISO time: 'HH:MM:SS+TZ'
  caption: {
    en: string
    de: string
  }
  image?: string            // Path to speaker image
  link?: string             // Meeting/event URL
  bio?: {
    en: { text: string; link: string | string[] }
    de: { text: string; link: string | string[] }
  }
}
```

Every poster must work with just `name`, `editionNumber`, `date`, `time`, and `caption`. The rest is optional — posters that need images or bios gracefully degrade without them.

## Poster Requirements

Each poster component:

- Implements the `PosterFactory` signature: `(container, speaker, config?) => Cleanup`
- Is a self-contained TypeScript module with co-located CSS and Storybook story
- Owns its animation logic, color palette, and timing
- Renders as a full-viewport experience (100vw × 100vh)
- Uses scoped DOM queries (`container.querySelector`, never `document`)
- Uses `IntervalManager` for animation lifecycle and cleanup
- Has a corresponding Storybook story with speaker selector and config controls
- Works with any speaker — not hardcoded to one

## Visual Styles

The system should support visually distinct poster styles. Examples of approaches:

- **Kinetic typography** — text that moves, splits, nests, or morphs
- **Image reveal** — speaker images unveiled through interaction or time
- **Grid mutations** — layouts that shift, resize, recolor on intervals
- **Mouse-driven** — elements that follow or react to cursor position
- **Screen flicker** — rapid content switching with font/color cycling
- **Generative pattern** — algorithmic compositions from speaker data

Each style is a standalone interpretation. There is no "default" — every poster is a design statement.

## Storybook Documentation

Each poster has a story that:

- Renders the poster with default speaker data
- Exposes the `speaker` prop via Storybook Controls
- Allows switching between different speakers to verify the design works universally
- Lives at `Design System/Poster/[StyleName]`

## Extensibility

Adding a new poster style means:

1. Create `src/posters/my-poster/my-poster.ts` — export a `PosterFactory`
2. Create `src/posters/my-poster/my-poster.css` — BEM-scoped styles
3. Create `src/posters/my-poster/my-poster.stories.ts` — Storybook story
4. Add export to `src/index.ts`
5. No changes to data, routing, or infrastructure

The poster receives data — it does not fetch, transform, or depend on anything outside its own file and the shared utilities.

## Technical Target

- TypeScript — no framework, imperative DOM manipulation
- Storybook 8+ HTML (`@storybook/html-vite`) — only display layer
- Vite 6 — bundler
- Vanilla CSS (BEM) — `.poster-name__element--modifier`
- Clean separation: data layer knows nothing about presentation, poster components know nothing about routing
- Static site output
- No Svelte, no Tailwind, no jQuery, no paper.js

## Backlog — Missing Posters

The following speakers still need unique poster designs. They currently only exist as reference images in the source material — no original animation code was written for them.

| Speaker | Edition | Source Material | Notes |
|---|---|---|---|
| Prem Krishnamurthy | #6 | Images only | Currently uses letter-grid variant as placeholder |
| Jan Middendorp | #8 | Template stub | No original design existed |
| Stephanie Wunderlich | #9 | Images only | Currently uses letter-scatter variant as placeholder |
| Franziska Morlok | #10 | Template stub | No original design existed |

### Completed but needs porting

| Speaker | Edition | Source Material | Notes |
|---|---|---|---|
| Michael Spranger | #12 | Full standalone HTML/CSS/JS project | `jitsi-bitsi-spider-source-material/jitsi-bitsi-michael-spranger/` — uses jQuery, needs rewrite to vanilla TS |

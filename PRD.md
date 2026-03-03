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

- Accepts a `speaker` prop (see interface above)
- Is a single Svelte file, fully self-contained
- Owns its animation logic, color palette, and timing
- Renders as a full-viewport experience
- Runs animations client-side only (no SSR)
- Has a corresponding Storybook story with controls for the speaker data
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

1. One new Svelte component in `src/lib/components/poster/`
2. One new story file alongside it
3. No changes to data, routing, or infrastructure

The poster receives data — it does not fetch, transform, or depend on anything outside its own file and the shared utilities.

## Technical Target

- Svelte 5 with modern runes syntax
- Storybook with Controls and Args
- Tailwind CSS for base styling
- Clean separation: data layer knows nothing about presentation, poster components know nothing about routing
- Static site output

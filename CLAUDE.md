# CLAUDE.md

## Project

Jitsi Bitsi Spider — generative poster toolkit for a lecture series (Kunsthochschule Weißensee, 2020). Each speaker gets an animated, interactive poster. Same data in, different visual output. 9 unique poster patterns, 13 speakers.

## Commands

```bash
npm run storybook        # Storybook at localhost:6006
npm run build-storybook  # Static Storybook build
npm run typecheck        # TypeScript type checking
```

## Tech Stack

- **TypeScript** — no framework, imperative DOM manipulation
- **Storybook 10 HTML** (`@storybook/html-vite`) — only display layer
- **Vite 6** — bundler
- **Vanilla CSS (BEM)** — `.poster-name__element--modifier`
- No Svelte, no Tailwind, no jQuery, no paper.js

## Architecture

```
src/
├── types/
│   └── speaker.ts              # Speaker, PosterConfig, Cleanup, PosterFactory
├── data/
│   ├── speakers.ts             # All 13 speakers (typed)
│   └── tags.ts                 # HTML tags array for TextExplosion
├── utilities/
│   ├── random.ts               # getRandomInt, getRandomItem, getRandomColor
│   ├── dom.ts                  # SCOPED applyStyle, changeStyle, createElement
│   ├── animation.ts            # IntervalManager, animateSequence, prefersReducedMotion
│   ├── style-mutations.ts      # changeFlex, changeFontSize, changeColor, ...
│   ├── gradients.ts            # getRandomGradient, cssGradients
│   ├── text-transforms.ts      # stringToLettersArray, wrapInRandomElement, speakerToStrings
│   ├── color-palettes.ts       # Named color collections (PALETTES)
│   ├── font-stacks.ts          # Named font collections (FONTS)
│   └── physics.ts              # Vec2 math + Blob class (replaces paper.js)
├── css/
│   ├── reset.css               # Meyer reset
│   └── base.css                # Shared .poster styles
├── posters/
│   ├── text-explosion/         # #1 Marco Land — text in random HTML tags
│   ├── word-reveal/            # #2 Jutta Bauer — word-by-word reveal + parallax
│   ├── letter-grid/            # #3 Nontsikelelo + #6 Prem — flex grid mutations
│   ├── letter-chase/           # #4 Studio Moniker — mouse-following letters
│   ├── screen-flicker/         # #5 Stefan Marx — rapid screen cycling
│   ├── letter-scatter/         # #7 Lukas + #9 Stephanie — large scattered letters
│   ├── physics-blobs/          # #11 Emily Smith — canvas blob physics
│   ├── static-typography/      # #13 Wenzel & Schwärzler — CSS-only layout
│   └── scroll-carousel/        # #12 Michael Spranger — scroll-driven zoom carousel
├── assets/img/                 # Speaker images
└── index.ts                    # Barrel export
```

## Speaker Data Schema

```typescript
interface Speaker {
  name: string;
  editionNumber: number;
  date: string;              // 'YYYY-MM-DD'
  time: string;              // 'HH:MM:SS+TZ'
  caption: { en: string; de: string };
  image?: string;
  link?: string;
  bio?: {
    en: { text: string; link: string | string[] };
    de: { text: string; link: string | string[] };
  };
}
```

## Poster Factory Pattern

Every poster follows the same signature:

```typescript
type PosterFactory = (container: HTMLElement, speaker: Speaker, config?: PosterConfig) => Cleanup;
```

- `container` — DOM element to render into (scoped, not document)
- `speaker` — typed speaker data
- `config` — optional overrides (colors, fonts, speed)
- Returns `Cleanup` function that stops all intervals/listeners

## Key Architecture Decisions

### Scoped DOM

All DOM queries use `container.querySelectorAll()`, never `document.querySelectorAll()`. This is critical for Storybook where multiple stories can coexist.

### IntervalManager

Every animated poster creates an `IntervalManager` that tracks intervals, timeouts, event listeners, and animation frames. The `cleanup()` method stops everything. This prevents zombie animations when switching stories.

### Composable Utilities

Style mutations, gradients, text transforms, color palettes, and font stacks are standalone functions — not classes. They can be freely combined to create new poster patterns.

## Adding a New Poster

1. Create `src/posters/my-poster/my-poster.ts` — export a `PosterFactory`
2. Create `src/posters/my-poster/my-poster.css` — BEM-scoped styles
3. Create `src/posters/my-poster/my-poster.stories.ts` — Storybook story
4. Add export to `src/index.ts`

## Storybook Pattern

```typescript
const meta: Meta<Args> = {
  title: 'Posters/PosterName',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map(s => s.name),
      mapping: Object.fromEntries(speakers.map(s => [s.name, s])),
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createPoster(container, args.speaker);
    (container as any).__cleanup = cleanup;
    return container;
  },
};
```

## Conventions

- Poster folders named after the **visual pattern**, not the speaker
- All animations are imperative DOM manipulation
- Full-viewport posters (100vw × 100vh)
- German locale for date formatting (`de-DE`)
- `prefers-reduced-motion` respected in animated posters
- Source material preserved at `jitsi-bitsi-spider-source-material/`

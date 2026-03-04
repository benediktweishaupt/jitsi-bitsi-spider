# PRD — Jitsi Bitsi Spider

## Backlog — Missing Posters

The following speakers still need unique poster designs. They currently only exist as reference images in the source material — no original animation code was written for them.

| Speaker | Edition | Source Material | Notes |
| --- | --- | --- | --- |
| Prem Krishnamurthy | #6 | Images only | Currently uses letter-grid variant as placeholder |
| Jan Middendorp | #8 | Template stub | No original design existed |
| Stephanie Wunderlich | #9 | Images only | Currently uses letter-scatter variant as placeholder |
| Franziska Morlok | #10 | Template stub | No original design existed |

## Backlog — Info Backside

Every poster should have an **info backside** that reveals speaker details via a CSS 3D card-flip animation. Triggered by clicking a small info button (not a bare click on the poster, since posters may use click/touch for their own interactions).

### Backside content

- Speaker name
- Edition number + formatted date
- Caption (de or en)
- Speaker image (if available)
- Bio text (if available)
- Link to event (if available)

### Implementation notes

- Use CSS `transform-style: preserve-3d` with `rotateY(180deg)` for the flip
- Info button: small `(i)` icon, positioned at a poster corner, `z-index` above the poster content
- The flip container wraps both the poster front and info back
- Clicking the info button toggles a `.poster--flipped` class
- Clicking the info button again (or a close button on the back) flips back
- Must not interfere with poster-specific mouse/touch interactions

---

## Changelog

### 2026-03-04 — Three-layer composable architecture

- **New architecture: Content / Render / Animate** — posters decomposed into three composable layers connected by typed `Token[]`. Inspired by Spotify's Base/Style/Animation component pattern.
- **`composePoster(recipe)`** replaces `definePoster()` for 8 of 9 posters. Same lifecycle (IntervalManager, reduced-motion, DOM removal watch) but with explicit content/render/animate split. PhysicsBlobs stays on legacy `definePoster` (canvas-based).
- **Layer 1 — Content primitives** (`src/layers/content.ts`): `extract(speaker, fields)`, `tokenize(tokens, strategy)`, `sequence(tokens, mode)`. One function per concern, strategy via argument.
- **Layer 2 — Layout primitives** (`src/layers/layout.ts`): `createElements(tokens, tag, classPrefix)` with `data-token-type` attribute for CSS targeting, `layout(container, elements, strategy)` supporting flow, flex-grid, absolute-random, fullscreen-stack, z-stack.
- **Layer 3 — Behavior primitives** (`src/layers/behavior.ts`): `drive(manager, target, driver, effect)` connecting timer/mouse/scroll drivers to mutation effects, `applyToElements()` for common operations (emit, reveal, cycle, reposition).
- **Token interface** (`src/types/layers.ts`): `{ text: string; type: string }` — semantic types (name, caption, date, bio, meta, image, link, keyword, symbol) enable per-type styling via `[data-token-type]` CSS selectors.
- **All 8 DOM-based posters refactored**: TextExplosion, WordReveal, LetterGrid, LetterChase, ScreenFlicker, LetterScatter, ScrollCarousel, StaticTypography — each now uses `composePoster` with layer primitives where natural, custom code where needed.
- **Playground story** (`src/stories/Playground.stories.ts`): interactive Storybook story for composing arbitrary posters by mixing content fields, tokenization strategies, layout modes, color palettes, and behavior drivers. Presets for LetterGrid-style, TextExplosion-style, scattered letters, flicker stack.
- **Barrel exports updated** (`src/index.ts`): Token, PosterRecipe, composePoster, all layer primitives exported.

### 2026-03-03 — ScrollCarousel poster (#12 Michael Spranger)

- **New poster pattern: `scroll-carousel`** — ported from jQuery source to vanilla TypeScript using `definePoster()`. Scroll/swipe-driven layer rotation with CSS scale transitions (before: 0.5, active: 1, after: 2). Content blocks (name, keywords, date, bio, image) randomly positioned within layers.
- Storybook story with controls (speed, reposition interval, blocks per layer) and presets (Dense, Minimal).
- Updated Gallery/About page, capture script, README, CLAUDE.md for 9 posters.

### 2026-03-03 — DRY architecture, visual portfolio + deployment

- **`definePoster()` scaffold** — extracted shared lifecycle (container setup, reduced-motion check, animation start, IntervalManager cleanup) into `src/utilities/poster-scaffold.ts`. All posters refactored to use it.
- **Configurable PosterConfig** — enriched with `intervals`, `counts`, `ranges` (named overrides with fallback defaults). Every hardcoded constant in all posters is now configurable. Deleted ad-hoc `LetterGridConfig`/`LetterScatterConfig` interfaces.
- **Content-adaptive defaults** — letter-grid chunk size defaults to `Math.ceil(nameLength / 3)` instead of fixed 5.
- **Storybook controls** — all stories expose relevant config as controls (interval sliders, count/range inputs, palette/font selectors). 2-3 preset story variants per poster.
- **About page** — `Overview/About` with project intro (lecture series by Matthias Hubner at KH Weissensee, 2020) and all posters running live in a grid.
- **Screenshot script** — Playwright captures each poster + about page to `docs/screenshots/`.
- **README rewrite** — poster image gallery, usage example, correct stack info.
- **GitHub Pages deployment** — repo transferred to `benediktweishaupt/jitsi-bitsi-spider` (public), GitHub Actions workflow auto-deploys Storybook on push to main.

### 2026-03-03 — Visual QA

- Changed poster format from 2:3 to 1:1 (square).
- Per-poster bug fixes: TextExplosion overflow, WordReveal image/link rendering, LetterGrid background image + border radius, LetterChase symbols + gradient background, ScreenFlicker font/shadow cycling, LetterScatter font size + background color, PhysicsBlobs stable color + speaker name layer, StaticTypography caption text.
- Fixed Storybook visibility (dark gray body background, removed autodocs).

### 2026-03-02 — Migration to vanilla TypeScript

- Migrated from SvelteKit/Svelte/Tailwind to vanilla TypeScript + Storybook HTML.
- Rewrote all 8 posters as imperative DOM manipulation with `PosterFactory` pattern.
- Replaced paper.js with custom `Vec2` math + `Blob` class.
- Created shared utilities: `IntervalManager`, style mutations, text transforms, color palettes, font stacks, gradients.
- Upgraded Storybook from 8.x to 10.x.

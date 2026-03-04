# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [0.3.0] - 2026-03-04

### Added

- Three-layer composable architecture: Content / Render / Animate
- `composePoster()` scaffold replacing `definePoster()` for 8 of 9 posters
- Layer 1 primitives: `extract()`, `tokenize()`, `sequence()` in `src/layers/content.ts`
- Layer 2 primitives: `createElements()`, `layout()` in `src/layers/layout.ts`
- Layer 3 primitives: `drive()`, `applyToElements()` in `src/layers/behavior.ts`
- `Token` and `PosterRecipe` interfaces in `src/types/layers.ts`
- Playground story for interactive layer-mixing experimentation

### Changed

- All 8 DOM-based posters refactored to `composePoster` with typed tokens
- Barrel exports updated with layer primitives
- CLAUDE.md updated with three-layer architecture documentation

## [0.2.0] - 2026-03-03

### Fixed

- Replaced corrupted local git repository with fresh clone from GitHub

### Added

- Project documentation: CLAUDE.md, PRD.md, CHANGELOG.md
- Updated README with project description and context

## [0.1.1] - 2023-11-15

### Changed

- Updated build configuration and .gitignore
- Added link to live site build

## [0.1.0] - 2020

### Added

- Initial project setup: SvelteKit + Storybook + Tailwind CSS
- 6 poster styles: Jutta Bauer, Studio Moniker, Marco Land, Prem Krishnamurthy, Nontsikelelo Mutiti, Stefan Marx
- Speaker data model with bilingual support (EN/DE)
- Shared animation utilities: StyleChanger, LetterMover, ScreenUpdater, JBauerAnimation
- GitHub Actions deployment pipeline to Hostinger
- Dynamic routing via speaker slug
- 13 speaker data entries in lecturerData.js

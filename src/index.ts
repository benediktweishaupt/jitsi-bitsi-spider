// Types
export type { Speaker, PosterConfig, Cleanup, PosterFactory } from './types/speaker';
export type { Token, PosterRecipe } from './types/layers';

// Data
export { speakers } from './data/speakers';
export { HTML_TAGS } from './data/tags';

// Three-layer architecture
export { composePoster } from './layers/compose';
export { extract, tokenize, sequence } from './layers/content';
export { createElements, layout } from './layers/layout';
export { drive, applyToElements } from './layers/behavior';

// Poster factories
export { createTextExplosion } from './posters/text-explosion/text-explosion';
export { createWordReveal } from './posters/word-reveal/word-reveal';
export { createLetterGrid } from './posters/letter-grid/letter-grid';
export { createLetterChase } from './posters/letter-chase/letter-chase';
export { createScreenFlicker } from './posters/screen-flicker/screen-flicker';
export { createLetterScatter } from './posters/letter-scatter/letter-scatter';
export { createPhysicsBlobs } from './posters/physics-blobs/physics-blobs';
export { createStaticTypography } from './posters/static-typography/static-typography';
export { createScrollCarousel } from './posters/scroll-carousel/scroll-carousel';

// Scaffold (legacy — PhysicsBlobs only)
export { definePoster } from './utilities/poster-scaffold';
export type { PosterDefinition, PosterContext } from './utilities/poster-scaffold';

// Utilities
export { getRandomNumber, getRandomInt, getRandomItem, getRandomColor } from './utilities/random';
export { applyStyle, changeStyle, createElement, queryAll } from './utilities/dom';
export { IntervalManager, animateSequence, prefersReducedMotion } from './utilities/animation';
export { changeFontSize, changeFlex, changeClass, changeBorderRadius, changeColorCss, changeFontColorCss, changeFontFamily, changeBoxRotation, changeBoxShadow } from './utilities/style-mutations';
export { getRandomGradient, cssGradients, cssIDGradient } from './utilities/gradients';
export { stringToLettersArray, wrapInRandomElement, speakerToStrings, formatDateAndTime, generateScreenTexts } from './utilities/text-transforms';
export { PALETTES } from './utilities/color-palettes';
export { FONTS } from './utilities/font-stacks';
export { Blob, vec2, add, sub, scale, normalize, distance } from './utilities/physics';

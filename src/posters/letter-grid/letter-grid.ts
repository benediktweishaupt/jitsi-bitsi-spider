import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, prefersReducedMotion } from '../../utilities/animation';
import { stringToLettersArray } from '../../utilities/text-transforms';
import { changeFlex, changeFontSize, changeClass, changeBorderRadius } from '../../utilities/style-mutations';
import { cssGradients } from '../../utilities/gradients';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-grid.css';

export interface LetterGridConfig extends PosterConfig {
  backgroundImage?: string;
  animatedBackground?: boolean;
  borderRadiusOptions?: string[];
  chunkSize?: number;
}

const LETTER_CLASSES = ['letter-grid__letter--black', 'letter-grid__letter--white'] as const;
const DEFAULT_BORDER_RADIUS = ['25cqw', '25cqw', '25cqw', '100cqw', '50px', '10cqw', '20cqw', '10cqw', '0'];

export function createLetterGrid(
  container: HTMLElement,
  speaker: Speaker,
  config?: LetterGridConfig,
): Cleanup {
  const manager = new IntervalManager();
  const speed = config?.speed ?? 1;
  const colors = config?.colors ?? [...PALETTES.monochrome];
  const borderRadiusOptions = config?.borderRadiusOptions ?? DEFAULT_BORDER_RADIUS;

  container.classList.add('poster', 'letter-grid');

  // Canvas
  const canvas = document.createElement('div');
  canvas.classList.add('letter-grid__canvas');
  if (config?.animatedBackground) {
    canvas.classList.add('letter-grid__canvas--animated-bg');
  }
  if (config?.backgroundImage) {
    canvas.style.backgroundImage = `url(${config.backgroundImage})`;
  }
  container.appendChild(canvas);

  // Build letter grid from speaker name
  const letters = stringToLettersArray(speaker.name, config?.chunkSize);

  letters.forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('letter-grid__row');

    row.forEach((letter) => {
      const letterEl = document.createElement('div');
      letterEl.classList.add('letter-grid__letter', 'letter-grid__letter--black');
      letterEl.textContent = letter;
      rowEl.appendChild(letterEl);
    });

    canvas.appendChild(rowEl);
  });

  const SEL_LETTER = '.letter-grid__letter';
  const SEL_ROW = '.letter-grid__row';

  // Static fallback
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    return () => manager.cleanup();
  }

  // Fast mutations (1s)
  manager.addInterval(() => {
    changeFlex(container, SEL_LETTER, 200);
    changeFlex(container, SEL_ROW, 100);
    changeClass(container, SEL_LETTER, [...LETTER_CLASSES], [...LETTER_CLASSES]);
    cssGradients(container, SEL_LETTER, colors);
  }, 1000 / speed);

  // Slow mutations (8s)
  manager.addInterval(() => {
    changeFontSize(container, SEL_LETTER, 1, 40);
    changeBorderRadius(container, SEL_LETTER, borderRadiusOptions);
  }, 8000 / speed);

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

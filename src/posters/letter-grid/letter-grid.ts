import type { PosterConfig } from '../../types/speaker';
import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
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

export const createLetterGrid = definePoster({
  name: 'letter-grid',

  build({ container, speaker, config }: PosterContext) {
    const gridConfig = config as LetterGridConfig;

    const canvas = document.createElement('div');
    canvas.classList.add('letter-grid__canvas');
    if (gridConfig.animatedBackground) {
      canvas.classList.add('letter-grid__canvas--animated-bg');
    }
    if (gridConfig.backgroundImage) {
      canvas.style.backgroundImage = `url(${gridConfig.backgroundImage})`;
    }
    container.appendChild(canvas);

    const letters = stringToLettersArray(speaker.name, gridConfig.chunkSize);

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
  },

  animate({ container, config }: PosterContext, manager) {
    const gridConfig = config as LetterGridConfig;
    const speed = config.speed ?? 1;
    const colors = config.colors ?? [...PALETTES.monochrome];
    const borderRadiusOptions = gridConfig.borderRadiusOptions ?? DEFAULT_BORDER_RADIUS;

    const SEL_LETTER = '.letter-grid__letter';
    const SEL_ROW = '.letter-grid__row';

    manager.addInterval(() => {
      changeFlex(container, SEL_LETTER, 200);
      changeFlex(container, SEL_ROW, 100);
      changeClass(container, SEL_LETTER, [...LETTER_CLASSES], [...LETTER_CLASSES]);
      cssGradients(container, SEL_LETTER, colors);
    }, 1000 / speed);

    manager.addInterval(() => {
      changeFontSize(container, SEL_LETTER, 1, 40);
      changeBorderRadius(container, SEL_LETTER, borderRadiusOptions);
    }, 8000 / speed);
  },
});

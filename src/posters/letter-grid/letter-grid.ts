import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { stringToLettersArray } from '../../utilities/text-transforms';
import { changeFlex, changeFontSize, changeClass, changeBorderRadius } from '../../utilities/style-mutations';
import { cssGradients } from '../../utilities/gradients';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-grid.css';

const LETTER_CLASSES = ['letter-grid__letter--black', 'letter-grid__letter--white'] as const;
const DEFAULT_BORDER_RADIUS = ['25cqw', '25cqw', '25cqw', '100cqw', '50px', '10cqw', '20cqw', '10cqw', '0'];
const DEFAULT_FAST_INTERVAL = 1000;
const DEFAULT_SLOW_INTERVAL = 8000;

export const createLetterGrid = definePoster({
  name: 'letter-grid',

  build({ container, speaker, config }: PosterContext) {
    const canvas = document.createElement('div');
    canvas.classList.add('letter-grid__canvas');
    if (config.animatedBackground) {
      canvas.classList.add('letter-grid__canvas--animated-bg');
    }
    if (config.backgroundImage) {
      canvas.style.backgroundImage = `url(${config.backgroundImage})`;
    }
    container.appendChild(canvas);

    const chunkSize = config.counts?.chunkSize ?? Math.ceil(speaker.name.replace(/\s/g, '').length / 3);
    const letters = stringToLettersArray(speaker.name, chunkSize);

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
    const speed = config.speed ?? 1;
    const fastInterval = config.intervals?.fast ?? DEFAULT_FAST_INTERVAL;
    const slowInterval = config.intervals?.slow ?? DEFAULT_SLOW_INTERVAL;
    const colors = config.colors ?? [...PALETTES.monochrome];
    const borderRadiusOptions = config.borderRadiusOptions ?? DEFAULT_BORDER_RADIUS;
    const [fontMin, fontMax] = config.ranges?.fontSize ?? [1, 40];

    const SEL_LETTER = '.letter-grid__letter';
    const SEL_ROW = '.letter-grid__row';

    manager.addInterval(() => {
      changeFlex(container, SEL_LETTER, 200);
      changeFlex(container, SEL_ROW, 100);
      changeClass(container, SEL_LETTER, [...LETTER_CLASSES], [...LETTER_CLASSES]);
      cssGradients(container, SEL_LETTER, colors);
    }, fastInterval / speed);

    manager.addInterval(() => {
      changeFontSize(container, SEL_LETTER, fontMin, fontMax);
      changeBorderRadius(container, SEL_LETTER, borderRadiusOptions);
    }, slowInterval / speed);
  },
});

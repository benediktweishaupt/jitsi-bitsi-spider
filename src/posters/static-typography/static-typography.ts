import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { getRandomItem } from '../../utilities/random';
import './static-typography.css';

const LETTER_CLASSES = ['static-typography__letter--black', 'static-typography__letter--white'] as const;

/** Decompose text into rows of individual characters for typographic display */
function decomposeForLayout(text: string): string[][] {
  const words = text.split(/\s+/).filter(Boolean);
  const rows: string[][] = [];

  rows.push(text.replace(/\s/g, '').split(''));

  words.forEach((word) => {
    rows.push(word.split(''));
  });

  rows.push(text.replace(/\s/g, '').split(''));

  return rows;
}

export const createStaticTypography = definePoster({
  name: 'static-typography',

  build({ container, speaker }: PosterContext) {
    const canvas = document.createElement('div');
    canvas.classList.add('static-typography__canvas');
    container.appendChild(canvas);

    const sourceText = speaker.caption.de || speaker.caption.en || speaker.name;
    const rows = decomposeForLayout(sourceText);

    rows.forEach((row) => {
      const rowEl = document.createElement('div');
      rowEl.classList.add('static-typography__row');

      row.forEach((char) => {
        const letterEl = document.createElement('div');
        const cls = getRandomItem(LETTER_CLASSES);
        letterEl.classList.add('static-typography__letter', cls);

        const p = document.createElement('p');
        p.textContent = char;
        letterEl.appendChild(p);
        rowEl.appendChild(letterEl);
      });

      canvas.appendChild(rowEl);
    });
  },

  animate() {
    // No animation — purely static poster
  },
});

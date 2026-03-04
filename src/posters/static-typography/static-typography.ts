import { composePoster } from '../../layers/compose';
import { extract } from '../../layers/content';
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

export const createStaticTypography = composePoster({
  name: 'static-typography',

  content(speaker) {
    // Extract caption (or name fallback) as a whole token — render decomposes into rows
    const caption = extract(speaker, ['caption']);
    if (caption.length > 0) return caption;
    return extract(speaker, ['name']);
  },

  render(container, tokens) {
    const canvas = document.createElement('div');
    canvas.classList.add('static-typography__canvas');
    container.appendChild(canvas);

    const sourceText = tokens[0]?.text ?? '';
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
});

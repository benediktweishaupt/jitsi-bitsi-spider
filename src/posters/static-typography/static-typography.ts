import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { getRandomItem } from '../../utilities/random';
import './static-typography.css';

const LETTER_CLASSES = ['static-typography__letter--black', 'static-typography__letter--white'] as const;

/** Decompose text into rows of individual characters for typographic display */
function decomposeForLayout(text: string): string[][] {
  const words = text.split(/\s+/).filter(Boolean);
  const rows: string[][] = [];

  // Full text as one character row
  rows.push(text.replace(/\s/g, '').split(''));

  // Per-word character rows
  words.forEach((word) => {
    rows.push(word.split(''));
  });

  // All characters again as closing row
  rows.push(text.replace(/\s/g, '').split(''));

  return rows;
}

export function createStaticTypography(
  container: HTMLElement,
  speaker: Speaker,
  _config?: PosterConfig,
): Cleanup {
  container.classList.add('poster', 'static-typography');

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

  // No animation — no cleanup needed
  return () => {};
}

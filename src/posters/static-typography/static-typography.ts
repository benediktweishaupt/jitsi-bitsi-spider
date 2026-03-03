import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { getRandomItem } from '../../utilities/random';
import './static-typography.css';

const LETTER_CLASSES = ['static-typography__letter--black', 'static-typography__letter--white'] as const;

/** Decompose a name into rows of individual characters for typographic display */
function decomposeForLayout(name: string): string[][] {
  const words = name.split(/\s+/);
  const rows: string[][] = [];

  // Row per word, characters split individually
  words.forEach((word) => {
    rows.push(word.split(''));
  });

  // Add a combined row with all characters
  rows.push(name.replace(/\s/g, '').split(''));

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

  const rows = decomposeForLayout(speaker.name);

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

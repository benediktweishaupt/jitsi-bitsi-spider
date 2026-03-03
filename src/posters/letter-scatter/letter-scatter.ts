import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, prefersReducedMotion } from '../../utilities/animation';
import { getRandomInt, getRandomItem } from '../../utilities/random';
import { changeFontColorCss, changeFontSize } from '../../utilities/style-mutations';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-scatter.css';

export interface LetterScatterConfig extends PosterConfig {
  blurBackground?: boolean;
  colorBurn?: boolean;
}

const SCATTER_INTERVAL = 1361;

export function createLetterScatter(
  container: HTMLElement,
  speaker: Speaker,
  config?: LetterScatterConfig,
): Cleanup {
  const manager = new IntervalManager();
  const speed = config?.speed ?? 1;
  const colors = config?.colors ?? [...PALETTES.primary];

  container.classList.add('poster', 'letter-scatter');
  container.style.position = 'relative';

  // Canvas layer
  const canvas = document.createElement('div');
  canvas.classList.add('letter-scatter__canvas');
  container.appendChild(canvas);

  // Background layer
  const bg = document.createElement('div');
  bg.classList.add('letter-scatter__background');
  if (config?.blurBackground) {
    bg.classList.add('letter-scatter__background--blur');
  }
  container.appendChild(bg);

  // Data layer (mix-blend-mode: difference)
  const data = document.createElement('div');
  data.classList.add('letter-scatter__data');
  container.appendChild(data);

  // Extract unique letters from name
  const nameChars = speaker.name.replace(/\s/g, '').split('').slice(0, 10);

  // Create letter elements in both canvas and background layers
  [canvas, bg].forEach((layer) => {
    nameChars.forEach((char, i) => {
      const el = document.createElement('div');
      el.classList.add('letter-scatter__letter');
      if (config?.colorBurn) {
        el.classList.add('letter-scatter__letter--color-burn');
      }
      el.id = `${layer === canvas ? 'fg' : 'bg'}-letter-${i}`;
      el.textContent = char;
      layer.appendChild(el);
    });
  });

  // Static fallback
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    nameChars.forEach((_, i) => {
      const x = getRandomInt(10, 80);
      const y = getRandomInt(10, 80);
      ['fg', 'bg'].forEach((prefix) => {
        const el = container.querySelector(`#${prefix}-letter-${i}`) as HTMLElement;
        if (el) {
          el.style.left = `${x}%`;
          el.style.top = `${y}%`;
        }
      });
    });
    return () => manager.cleanup();
  }

  let letterCount = 0;

  // Scatter letters at interval
  manager.addInterval(() => {
    const idx = letterCount % nameChars.length;
    const x = getRandomInt(60, container.clientWidth - 60);
    const y = getRandomInt(60, container.clientHeight - 60);

    ['fg', 'bg'].forEach((prefix) => {
      const el = container.querySelector(`#${prefix}-letter-${idx}`) as HTMLElement;
      if (el) {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.color = getRandomItem(colors);
      }
    });

    changeFontSize(canvas, '.letter-scatter__letter', 10, 40);
    letterCount++;
  }, SCATTER_INTERVAL / speed);

  // Background color changes
  manager.addInterval(() => {
    bg.style.backgroundColor = getRandomItem(colors);
  }, 3470 / speed);

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

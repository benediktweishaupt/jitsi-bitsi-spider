import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { getRandomInt, getRandomItem } from '../../utilities/random';
import { changeFontSize } from '../../utilities/style-mutations';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-scatter.css';

const DEFAULT_SCATTER_INTERVAL = 1361;
const DEFAULT_BG_COLOR_INTERVAL = 8000;

function getNameChars(speaker: PosterContext['speaker']): string[] {
  return speaker.name.replace(/\s/g, '').split('');
}

export const createLetterScatter = definePoster({
  name: 'letter-scatter',

  build({ container, speaker, config }: PosterContext) {
    container.style.position = 'relative';

    const canvas = document.createElement('div');
    canvas.classList.add('letter-scatter__canvas');
    container.appendChild(canvas);

    const bg = document.createElement('div');
    bg.classList.add('letter-scatter__background');
    if (config.blurBackground) {
      bg.classList.add('letter-scatter__background--blur');
    }
    container.appendChild(bg);

    const data = document.createElement('div');
    data.classList.add('letter-scatter__data');
    container.appendChild(data);

    const nameChars = getNameChars(speaker);

    [canvas, bg].forEach((layer) => {
      nameChars.forEach((char, i) => {
        const el = document.createElement('div');
        el.classList.add('letter-scatter__letter');
        if (config.colorBurn) {
          el.classList.add('letter-scatter__letter--color-burn');
        }
        el.id = `${layer === canvas ? 'fg' : 'bg'}-letter-${i}`;
        el.textContent = char;
        layer.appendChild(el);
      });
    });
  },

  staticFallback({ container, speaker }: PosterContext) {
    const nameChars = getNameChars(speaker);
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
  },

  animate({ container, speaker, config }: PosterContext, manager) {
    const speed = config.speed ?? 1;
    const scatterInterval = config.intervals?.scatter ?? DEFAULT_SCATTER_INTERVAL;
    const bgColorInterval = config.intervals?.bgColor ?? DEFAULT_BG_COLOR_INTERVAL;
    const colors = config.colors ?? [...PALETTES.primary];
    const [fontMin, fontMax] = config.ranges?.fontSize ?? [10, 40];
    const canvas = container.querySelector('.letter-scatter__canvas') as HTMLElement;
    const bg = container.querySelector('.letter-scatter__background') as HTMLElement;
    const nameChars = getNameChars(speaker);

    let letterCount = 0;

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

      changeFontSize(canvas, '.letter-scatter__letter', fontMin, fontMax);
      letterCount++;
    }, scatterInterval / speed);

    manager.addInterval(() => {
      bg.style.backgroundColor = getRandomItem(colors);
    }, bgColorInterval / speed);
  },
});

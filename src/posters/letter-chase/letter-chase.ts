import type { Token } from '../../types/layers';
import { composePoster } from '../../layers/compose';
import { extract, tokenize } from '../../layers/content';
import { changeFontColorCss } from '../../utilities/style-mutations';
import { cssIDGradient } from '../../utilities/gradients';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-chase.css';

const DEFAULT_MOVE_INTERVAL = 1500;
const DEFAULT_BG_INTERVAL = 4000;
const SYMBOLS: Token[] = [
  { text: '■', type: 'symbol' },
  { text: '●', type: 'symbol' },
  { text: '▲', type: 'symbol' },
];

export const createLetterChase = composePoster({
  name: 'letter-chase',

  content(speaker) {
    return [...tokenize(extract(speaker, ['name']), 'letter'), ...SYMBOLS];
  },

  render(container, tokens) {
    const canvas = document.createElement('div');
    canvas.classList.add('letter-chase__canvas');
    container.appendChild(canvas);

    tokens.forEach((token, i) => {
      const el = document.createElement('div');
      el.classList.add('letter-chase__letter');
      el.id = `letter-${String(i).padStart(2, '0')}`;
      el.textContent = token.text;
      canvas.appendChild(el);
    });
  },

  staticFallback(container, tokens) {
    const canvas = container.querySelector('.letter-chase__canvas')!;
    tokens.forEach((_, i) => {
      const el = canvas.querySelector(`#letter-${String(i).padStart(2, '0')}`) as HTMLElement;
      if (el) {
        el.style.opacity = '1';
        el.style.left = `${Math.random() * 80}%`;
        el.style.top = `${Math.random() * 80}%`;
      }
    });
  },

  animate(container, tokens, manager, config) {
    const speed = config.speed ?? 1;
    const moveInterval = config.intervals?.move ?? DEFAULT_MOVE_INTERVAL;
    const bgInterval = config.intervals?.background ?? DEFAULT_BG_INTERVAL;
    const colors = config.colors ?? [...PALETTES.primary];
    const canvas = container.querySelector('.letter-chase__canvas') as HTMLElement;

    let letterCount = 0;

    const moveHandler = (e: MouseEvent | TouchEvent) => {
      if (e.target !== canvas) return;

      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const id = `#letter-${String(letterCount).padStart(2, '0')}`;
      const letter = canvas.querySelector(id) as HTMLElement;
      if (letter) {
        letter.style.left = `${x}px`;
        letter.style.top = `${y}px`;
        letter.style.opacity = '1';
        changeFontColorCss(canvas, id, colors);
      }
    };

    manager.addListener(canvas, 'mousemove', moveHandler as EventListener);
    manager.addListener(canvas, 'touchmove', moveHandler as EventListener, { passive: true });

    manager.addInterval(() => {
      letterCount = (letterCount + 1) % tokens.length;
    }, moveInterval / speed);

    manager.addInterval(() => {
      cssIDGradient(container, '.letter-chase__canvas', colors);
    }, bgInterval / speed);
  },
});

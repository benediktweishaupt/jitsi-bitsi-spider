import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, prefersReducedMotion } from '../../utilities/animation';
import { changeFontColorCss } from '../../utilities/style-mutations';
import { cssIDGradient } from '../../utilities/gradients';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-chase.css';

const MOVE_INTERVAL = 1500;
const CANVAS_UPDATE_INTERVAL = 4000;
const SYMBOLS = ['■', '●', '▲'];

export function createLetterChase(
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
): Cleanup {
  const manager = new IntervalManager();
  const speed = config?.speed ?? 1;
  const colors = config?.colors ?? [...PALETTES.primary];

  container.classList.add('poster', 'letter-chase');

  const canvas = document.createElement('div');
  canvas.classList.add('letter-chase__canvas');
  container.appendChild(canvas);

  // Build letters from speaker name + symbols
  const nameChars = speaker.name.replace(/\s/g, '').split('');
  const allChars = [...nameChars.slice(0, 7), ...SYMBOLS].slice(0, 10);

  allChars.forEach((char, i) => {
    const el = document.createElement('div');
    el.classList.add('letter-chase__letter');
    el.id = `letter-${String(i).padStart(2, '0')}`;
    el.textContent = char;
    canvas.appendChild(el);
  });

  // Static fallback
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    // Show all letters scattered statically
    allChars.forEach((_, i) => {
      const el = canvas.querySelector(`#letter-${String(i).padStart(2, '0')}`) as HTMLElement;
      if (el) {
        el.style.opacity = '1';
        el.style.left = `${Math.random() * 80}vw`;
        el.style.top = `${Math.random() * 80}vh`;
      }
    });
    return () => manager.cleanup();
  }

  let letterCount = 0;

  const moveHandler = (e: MouseEvent | TouchEvent) => {
    if (e.target !== canvas) return;

    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const y = 'touches' in e ? e.touches[0].pageY : e.pageY;

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

  // Cycle through letters
  manager.addInterval(() => {
    letterCount = (letterCount + 1) % allChars.length;
  }, MOVE_INTERVAL / speed);

  // Change canvas background
  manager.addInterval(() => {
    cssIDGradient(container, '.letter-chase__canvas', colors);
  }, CANVAS_UPDATE_INTERVAL / speed);

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

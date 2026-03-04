import type { Token } from '../../types/layers';
import { composePoster } from '../../layers/compose';
import { extract, tokenize, sequence } from '../../layers/content';
import { getRandomInt } from '../../utilities/random';
import './scroll-carousel.css';

const DEFAULT_REPOSITION_INTERVAL = 10000;
const DEFAULT_BLOCKS_PER_LAYER = 5;
const LAYER_COUNT = 6;

const CLS_BEFORE = 'scroll-carousel__layer--before';
const CLS_ACTIVE = 'scroll-carousel__layer--active';
const CLS_AFTER = 'scroll-carousel__layer--after';
const STATE_CLASSES = [CLS_BEFORE, CLS_ACTIVE, CLS_AFTER] as const;

/** Position a block randomly within container bounds */
function positionBlock(block: HTMLElement, w: number, h: number): void {
  const bh = getRandomInt(Math.round(h * 0.1), Math.round(h * 0.5));
  const bw = Math.round(bh * 1.6);
  const x = getRandomInt(0, Math.max(0, w - bw));
  const y = getRandomInt(0, Math.max(0, h - bh));

  block.style.left = `${x}px`;
  block.style.top = `${y}px`;
  block.style.width = `${bw}px`;
  block.style.height = `${bh}px`;
}

/** Debounce helper */
function debounce(fn: (e: Event) => void, ms: number): (e: Event) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (e: Event) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(e), ms);
  };
}

export const createScrollCarousel = composePoster({
  name: 'scroll-carousel',

  content(speaker) {
    // Name words repeated 3x for density
    const name = sequence(tokenize(extract(speaker, ['name']), 'word'), 'repeat', { times: 3 });

    // Keywords: series meta + caption words
    const caption = speaker.caption.de || speaker.caption.en;
    const kwTexts = ['jitsi', 'bitsi', 'spider', `#${speaker.editionNumber}`, ...caption.split(/\s+/).slice(0, 6)];
    const keywords: Token[] = kwTexts.map((kw) => ({ text: kw, type: 'keyword' }));

    // Date
    const date = extract(speaker, ['date']);

    // Bio chunked into ~12-word blocks
    const bioToken = extract(speaker, ['bio']);
    const bioChunks: Token[] = [];
    if (bioToken.length > 0) {
      const words = bioToken[0].text.split(/\s+/);
      for (let i = 0; i < words.length; i += 12) {
        bioChunks.push({ text: words.slice(i, i + 12).join(' '), type: 'bio' });
      }
    }

    // Image
    const image = extract(speaker, ['image']);

    return [...name, ...keywords, ...date, ...bioChunks, ...image];
  },

  render(container, tokens, config) {
    const stage = document.createElement('div');
    stage.classList.add('scroll-carousel__stage');
    container.appendChild(stage);

    // Create DOM pool from tokens
    const pool: HTMLElement[] = tokens.map((token) => {
      const el = document.createElement('div');
      el.classList.add('scroll-carousel__block', `scroll-carousel__block--${token.type}`);
      if (token.type === 'image') {
        el.style.backgroundImage = `url(${token.text})`;
      } else {
        el.textContent = token.text;
      }
      return el;
    });

    const blocksPerLayer = config.counts?.blocksPerLayer ?? DEFAULT_BLOCKS_PER_LAYER;

    for (let i = 0; i < LAYER_COUNT; i++) {
      const layer = document.createElement('div');
      layer.classList.add('scroll-carousel__layer');
      layer.dataset.layerIndex = String(i);

      if (i === 0) layer.classList.add(CLS_BEFORE);
      if (i === 1) layer.classList.add(CLS_ACTIVE);
      if (i === 2) layer.classList.add(CLS_AFTER);

      for (let j = 0; j < blocksPerLayer; j++) {
        const src = pool[getRandomInt(0, pool.length - 1)];
        layer.appendChild(src.cloneNode(true) as HTMLElement);
      }

      stage.appendChild(layer);
    }
  },

  staticFallback(container) {
    const stage = container.querySelector('.scroll-carousel__stage')!;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 800;

    stage.querySelectorAll('.scroll-carousel__block').forEach((block) => {
      positionBlock(block as HTMLElement, w, h);
    });
  },

  animate(container, _tokens, manager, config) {
    const speed = config.speed ?? 1;
    const repositionInterval = config.intervals?.reposition ?? DEFAULT_REPOSITION_INTERVAL;
    const stage = container.querySelector('.scroll-carousel__stage') as HTMLElement;
    const layers = Array.from(stage.querySelectorAll('.scroll-carousel__layer')) as HTMLElement[];

    const getSize = () => ({
      w: container.clientWidth || 800,
      h: container.clientHeight || 800,
    });

    // Initial positioning
    const { w, h } = getSize();
    stage.querySelectorAll('.scroll-carousel__block').forEach((block) => {
      positionBlock(block as HTMLElement, w, h);
    });

    // Scroll handler — rotate layers
    const rotateClasses = (direction: 1 | -1) => {
      for (const cls of STATE_CLASSES) {
        const current = stage.querySelector(`.${cls}`) as HTMLElement | null;
        if (!current) continue;

        current.classList.remove(cls);
        const idx = layers.indexOf(current);
        const nextIdx = (idx + direction + layers.length) % layers.length;
        layers[nextIdx].classList.add(cls);
      }
    };

    const onWheel = debounce((e: Event) => {
      const delta = (e as WheelEvent).deltaY;
      if (delta > 0) rotateClasses(-1);
      else if (delta < 0) rotateClasses(1);
    }, 50);

    manager.addListener(container, 'wheel', onWheel, { passive: true });

    // Touch support — swipe up/down
    let touchStartY = 0;
    manager.addListener(container, 'touchstart', ((e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    }) as EventListener, { passive: true });

    manager.addListener(container, 'touchend', ((e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 30) {
        rotateClasses(dy > 0 ? -1 : 1);
      }
    }) as EventListener, { passive: true });

    // Periodic repositioning
    manager.addInterval(() => {
      const { w: cw, h: ch } = getSize();
      stage.querySelectorAll('.scroll-carousel__block').forEach((block) => {
        positionBlock(block as HTMLElement, cw, ch);
      });
    }, repositionInterval / speed);
  },
});

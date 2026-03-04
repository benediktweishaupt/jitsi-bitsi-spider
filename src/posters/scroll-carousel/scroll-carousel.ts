import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { getRandomInt } from '../../utilities/random';
import { formatDateAndTime } from '../../utilities/text-transforms';
import './scroll-carousel.css';

const DEFAULT_REPOSITION_INTERVAL = 10000;
const DEFAULT_BLOCKS_PER_LAYER = 5;
const LAYER_COUNT = 6;

const CLS_BEFORE = 'scroll-carousel__layer--before';
const CLS_ACTIVE = 'scroll-carousel__layer--active';
const CLS_AFTER = 'scroll-carousel__layer--after';
const STATE_CLASSES = [CLS_BEFORE, CLS_ACTIVE, CLS_AFTER] as const;

/** Build content blocks from speaker data */
function buildContentPool(ctx: PosterContext): HTMLElement[] {
  const { speaker } = ctx;
  const nameParts = speaker.name.split(/\s+/);
  const { formattedDate, formattedTime } = formatDateAndTime(speaker.date, speaker.time);
  const caption = speaker.caption.de || speaker.caption.en;
  const bio = speaker.bio?.de?.text || speaker.bio?.en?.text || '';
  const keywords = ['jitsi', 'bitsi', 'spider', `#${speaker.editionNumber}`, ...caption.split(/\s+/).slice(0, 6)];

  const blocks: HTMLElement[] = [];

  const makeBlock = (cls: string, content: string): HTMLElement => {
    const el = document.createElement('div');
    el.classList.add('scroll-carousel__block', cls);
    el.textContent = content;
    return el;
  };

  // Name blocks (repeated for density)
  for (let i = 0; i < 3; i++) {
    nameParts.forEach((part) => blocks.push(makeBlock('scroll-carousel__block--name', part)));
  }

  // Keyword blocks
  keywords.forEach((kw) => blocks.push(makeBlock('scroll-carousel__block--keyword', kw)));

  // Date blocks
  if (formattedDate) {
    blocks.push(makeBlock('scroll-carousel__block--date', `${formattedDate} ${formattedTime}`));
    blocks.push(makeBlock('scroll-carousel__block--date', formattedDate));
  }

  // Bio blocks (split into chunks)
  if (bio) {
    const words = bio.split(/\s+/);
    for (let i = 0; i < words.length; i += 12) {
      blocks.push(makeBlock('scroll-carousel__block--bio', words.slice(i, i + 12).join(' ')));
    }
  }

  // Image block
  if (speaker.image) {
    const img = document.createElement('div');
    img.classList.add('scroll-carousel__block', 'scroll-carousel__block--image');
    img.style.backgroundImage = `url(${speaker.image})`;
    blocks.push(img);
  }

  return blocks;
}

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

export const createScrollCarousel = definePoster({
  name: 'scroll-carousel',

  build({ container, speaker, config }: PosterContext) {
    const stage = document.createElement('div');
    stage.classList.add('scroll-carousel__stage');
    container.appendChild(stage);

    const ctx: PosterContext = { container, speaker, config };
    const pool = buildContentPool(ctx);
    const blocksPerLayer = config.counts?.blocksPerLayer ?? DEFAULT_BLOCKS_PER_LAYER;

    // Create layers with randomly assigned blocks
    for (let i = 0; i < LAYER_COUNT; i++) {
      const layer = document.createElement('div');
      layer.classList.add('scroll-carousel__layer');
      layer.dataset.layerIndex = String(i);

      // Assign state classes to first 3 layers
      if (i === 0) layer.classList.add(CLS_BEFORE);
      if (i === 1) layer.classList.add(CLS_ACTIVE);
      if (i === 2) layer.classList.add(CLS_AFTER);

      // Add random blocks from pool
      for (let j = 0; j < blocksPerLayer; j++) {
        const src = pool[getRandomInt(0, pool.length - 1)];
        const block = src.cloneNode(true) as HTMLElement;
        layer.appendChild(block);
      }

      stage.appendChild(layer);
    }
  },

  staticFallback({ container }: PosterContext) {
    // Show the active layer with positioned blocks
    const stage = container.querySelector('.scroll-carousel__stage')!;
    const w = (container as HTMLElement).clientWidth || 800;
    const h = (container as HTMLElement).clientHeight || 800;

    stage.querySelectorAll('.scroll-carousel__block').forEach((block) => {
      positionBlock(block as HTMLElement, w, h);
    });
  },

  animate({ container, config }: PosterContext, manager) {
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

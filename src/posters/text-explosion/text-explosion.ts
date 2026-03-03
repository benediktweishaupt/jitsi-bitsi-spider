import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { speakerToStrings, wrapInRandomElement } from '../../utilities/text-transforms';
import { HTML_TAGS } from '../../data/tags';
import './text-explosion.css';

const DEFAULT_EMIT_INTERVAL = 1200;

function getWords(ctx: PosterContext): string[] {
  const strings = speakerToStrings(ctx.speaker);
  return strings.flatMap((s) => s.split(/\s+/)).filter(Boolean);
}

export const createTextExplosion = definePoster({
  name: 'text-explosion',

  build({ container }: PosterContext) {
    const content = document.createElement('article');
    content.classList.add('text-explosion__content');
    container.appendChild(content);
  },

  staticFallback(ctx: PosterContext) {
    const content = ctx.container.querySelector('.text-explosion__content')!;
    getWords(ctx).forEach((word) => {
      const el = document.createElement('div');
      el.innerHTML = wrapInRandomElement(word, HTML_TAGS);
      content.appendChild(el);
    });
  },

  animate(ctx: PosterContext, manager) {
    const speed = ctx.config.speed ?? 1;
    const emitInterval = ctx.config.intervals?.emit ?? DEFAULT_EMIT_INTERVAL;
    const content = ctx.container.querySelector('.text-explosion__content')!;
    const words = getWords(ctx);
    let counter = 0;

    manager.addInterval(() => {
      const word = words[counter % words.length];
      const child = document.createElement('div');
      child.innerHTML = wrapInRandomElement(word, HTML_TAGS);
      content.insertBefore(child, content.firstChild);
      counter++;
    }, emitInterval / speed);
  },
});

import { composePoster } from '../../layers/compose';
import { extract, tokenize } from '../../layers/content';
import { wrapInRandomElement } from '../../utilities/text-transforms';
import { HTML_TAGS } from '../../data/tags';
import './text-explosion.css';

const DEFAULT_EMIT_INTERVAL = 1200;

export const createTextExplosion = composePoster({
  name: 'text-explosion',

  content(speaker) {
    return tokenize(extract(speaker, 'all'), 'word');
  },

  render(container) {
    const content = document.createElement('article');
    content.classList.add('text-explosion__content');
    container.appendChild(content);
  },

  staticFallback(container, tokens) {
    const content = container.querySelector('.text-explosion__content')!;
    tokens.forEach((token) => {
      const el = document.createElement('div');
      el.innerHTML = wrapInRandomElement(token.text, HTML_TAGS);
      content.appendChild(el);
    });
  },

  animate(container, tokens, manager, config) {
    const speed = config.speed ?? 1;
    const interval = config.intervals?.emit ?? DEFAULT_EMIT_INTERVAL;
    const content = container.querySelector('.text-explosion__content')!;
    let i = 0;

    manager.addInterval(() => {
      const token = tokens[i % tokens.length];
      const el = document.createElement('div');
      el.innerHTML = wrapInRandomElement(token.text, HTML_TAGS);
      content.insertBefore(el, content.firstChild);
      i++;
    }, interval / speed);
  },
});

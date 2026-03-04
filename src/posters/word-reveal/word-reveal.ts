import { composePoster } from '../../layers/compose';
import { extract, tokenize } from '../../layers/content';
import { animateSequence } from '../../utilities/animation';
import { PALETTES } from '../../utilities/color-palettes';
import './word-reveal.css';

const DEFAULT_REVEAL_INTERVAL = 600;

export const createWordReveal = composePoster({
  name: 'word-reveal',

  content(speaker) {
    // Prefer bio, fall back to caption — plus image and link as typed tokens
    const bioTokens = tokenize(extract(speaker, ['bio']), 'word');
    const words = bioTokens.length > 0 ? bioTokens : tokenize(extract(speaker, ['caption']), 'word');
    return [...words, ...extract(speaker, ['image', 'link'])];
  },

  render(container, tokens) {
    const imageToken = tokens.find((t) => t.type === 'image');
    const linkToken = tokens.find((t) => t.type === 'link');

    const textEl = document.createElement('div');
    textEl.classList.add('word-reveal__text');
    container.appendChild(textEl);

    const imageEl = document.createElement('div');
    imageEl.classList.add('word-reveal__image');
    if (imageToken) {
      imageEl.style.backgroundImage = `url(${imageToken.text})`;
    } else {
      imageEl.style.backgroundColor = PALETTES.redTint();
    }
    container.appendChild(imageEl);

    if (linkToken) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('word-reveal__link');
      linkEl.href = linkToken.text;
      linkEl.target = '_blank';
      linkEl.textContent = 'join';
      container.appendChild(linkEl);
    }
  },

  staticFallback(container, tokens) {
    const textEl = container.querySelector('.word-reveal__text')!;
    const wordTokens = tokens.filter((t) => t.type !== 'image' && t.type !== 'link');
    wordTokens.forEach((token) => {
      const span = document.createElement('span');
      span.style.color = PALETTES.redTint();
      span.textContent = `${token.text} `;
      textEl.appendChild(span);
    });
  },

  animate(container, tokens, manager, config) {
    const speed = config.speed ?? 1;
    const revealInterval = config.intervals?.reveal ?? DEFAULT_REVEAL_INTERVAL;
    const textEl = container.querySelector('.word-reveal__text') as HTMLElement;
    const imageEl = container.querySelector('.word-reveal__image') as HTMLElement;
    const wordTokens = tokens.filter((t) => t.type !== 'image' && t.type !== 'link');

    animateSequence(
      wordTokens,
      revealInterval / speed,
      (token, _index, progress) => {
        const span = document.createElement('span');
        span.style.color = PALETTES.redTint();
        span.textContent = `${token.text} `;
        textEl.appendChild(span);

        imageEl.style.backgroundPosition = `0% ${progress}%`;
        imageEl.style.backgroundColor = PALETTES.redTint();
      },
      manager,
    );
  },
});

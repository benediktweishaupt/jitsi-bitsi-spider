import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { animateSequence } from '../../utilities/animation';
import { PALETTES } from '../../utilities/color-palettes';
import './word-reveal.css';

const WORD_DELAY = 600;

function getWords(speaker: PosterContext['speaker']): string[] {
  const text = speaker.bio?.de?.text || speaker.bio?.en?.text || speaker.caption.de || speaker.caption.en;
  return text.split(/\s+/).filter(Boolean);
}

export const createWordReveal = definePoster({
  name: 'word-reveal',

  build({ container, speaker }: PosterContext) {
    const textEl = document.createElement('div');
    textEl.classList.add('word-reveal__text');
    container.appendChild(textEl);

    const imageEl = document.createElement('div');
    imageEl.classList.add('word-reveal__image');
    if (speaker.image) {
      imageEl.style.backgroundImage = `url(${speaker.image})`;
    } else {
      imageEl.style.backgroundColor = PALETTES.redTint();
    }
    container.appendChild(imageEl);

    if (speaker.link) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('word-reveal__link');
      linkEl.href = speaker.link;
      linkEl.target = '_blank';
      linkEl.textContent = 'join';
      container.appendChild(linkEl);
    }
  },

  staticFallback({ container, speaker }: PosterContext) {
    const textEl = container.querySelector('.word-reveal__text')!;
    getWords(speaker).forEach((word) => {
      const span = document.createElement('span');
      span.style.color = PALETTES.redTint();
      span.textContent = `${word} `;
      textEl.appendChild(span);
    });
  },

  animate({ container, speaker, config }: PosterContext, manager) {
    const speed = config.speed ?? 1;
    const textEl = container.querySelector('.word-reveal__text') as HTMLElement;
    const imageEl = container.querySelector('.word-reveal__image') as HTMLElement;
    const words = getWords(speaker);

    animateSequence(
      words,
      WORD_DELAY / speed,
      (word, _index, progress) => {
        const span = document.createElement('span');
        span.style.color = PALETTES.redTint();
        span.textContent = `${word} `;
        textEl.appendChild(span);

        imageEl.style.backgroundPosition = `0% ${progress}%`;
        imageEl.style.backgroundColor = PALETTES.redTint();
      },
      manager,
    );
  },
});

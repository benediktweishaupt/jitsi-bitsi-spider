import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, animateSequence, prefersReducedMotion } from '../../utilities/animation';
import { PALETTES } from '../../utilities/color-palettes';
import './word-reveal.css';

const WORD_DELAY = 600;

export function createWordReveal(
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
): Cleanup {
  const manager = new IntervalManager();
  const speed = config?.speed ?? 1;
  const delay = WORD_DELAY / speed;

  container.classList.add('poster', 'word-reveal');

  // Text container
  const textEl = document.createElement('div');
  textEl.classList.add('word-reveal__text');
  container.appendChild(textEl);

  // Image container
  const imageEl = document.createElement('div');
  imageEl.classList.add('word-reveal__image');
  if (speaker.image) {
    imageEl.style.backgroundImage = `url(${speaker.image})`;
  } else {
    imageEl.style.backgroundColor = PALETTES.redTint();
  }
  container.appendChild(imageEl);

  // Link
  if (speaker.link) {
    const linkEl = document.createElement('a');
    linkEl.classList.add('word-reveal__link');
    linkEl.href = speaker.link;
    linkEl.target = '_blank';
    linkEl.textContent = 'join';
    container.appendChild(linkEl);
  }

  // Build word list from bio or caption
  const text = speaker.bio?.de?.text || speaker.bio?.en?.text || speaker.caption.de || speaker.caption.en;
  const words = text.split(/\s+/).filter(Boolean);

  // Static fallback
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    words.forEach((word) => {
      const span = document.createElement('span');
      span.style.color = PALETTES.redTint();
      span.textContent = `${word} `;
      textEl.appendChild(span);
    });
    return () => manager.cleanup();
  }

  // Animate words and background position in parallel
  animateSequence(
    words,
    delay,
    (word, _index, progress) => {
      // Add word
      const span = document.createElement('span');
      span.style.color = PALETTES.redTint();
      span.textContent = `${word} `;
      textEl.appendChild(span);

      // Move background
      imageEl.style.backgroundPosition = `0% ${progress}%`;
      imageEl.style.backgroundColor = PALETTES.redTint();
    },
    manager,
  );

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

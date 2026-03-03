import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, prefersReducedMotion } from '../../utilities/animation';
import { speakerToStrings } from '../../utilities/text-transforms';
import { wrapInRandomElement } from '../../utilities/text-transforms';
import { HTML_TAGS } from '../../data/tags';
import './text-explosion.css';

const INTERVAL_MS = 1200;

export function createTextExplosion(
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
): Cleanup {
  const manager = new IntervalManager();
  const speed = config?.speed ?? 1;
  const ms = INTERVAL_MS / speed;

  container.classList.add('poster', 'text-explosion');

  const content = document.createElement('article');
  content.classList.add('text-explosion__content');
  container.appendChild(content);

  // Split speaker data into individual words
  const strings = speakerToStrings(speaker);
  const words = strings.flatMap((s) => s.split(/\s+/)).filter(Boolean);

  // Static fallback for reduced motion
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    words.forEach((word) => {
      const el = document.createElement('div');
      el.innerHTML = wrapInRandomElement(word, HTML_TAGS);
      content.appendChild(el);
    });
    return () => manager.cleanup();
  }

  let counter = 0;

  manager.addInterval(() => {
    const word = words[counter % words.length];
    const child = document.createElement('div');
    child.innerHTML = wrapInRandomElement(word, HTML_TAGS);
    content.insertBefore(child, content.firstChild);
    counter++;
  }, ms);

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

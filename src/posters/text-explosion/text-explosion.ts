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

  const strings = speakerToStrings(speaker);

  // Static fallback for reduced motion
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    strings.forEach((str) => {
      const el = document.createElement('div');
      el.textContent = str;
      content.appendChild(el);
    });
    return () => manager.cleanup();
  }

  let counter = 0;

  manager.addInterval(() => {
    const wrapped = wrapInRandomElement(strings[counter], HTML_TAGS);
    const child = document.createElement('div');
    child.innerHTML = wrapped;
    content.insertBefore(child, content.firstChild);
    counter = (counter + 1) % strings.length;
  }, ms);

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

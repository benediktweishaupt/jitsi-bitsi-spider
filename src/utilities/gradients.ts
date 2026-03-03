import { applyStyle } from './dom';
import { getRandomItem } from './random';

/** Generate a random CSS linear-gradient string */
export function getRandomGradient(colors: readonly string[]): string {
  const orientation = Math.floor(Math.random() * 360);
  const colorOne = getRandomItem(colors);
  const colorTwo = getRandomItem(colors);
  return `linear-gradient(${orientation}deg, ${colorOne}, ${colorTwo})`;
}

/** Apply random gradients to elements with a configurable probability */
export function cssGradients(
  container: HTMLElement,
  selector: string,
  colors: readonly string[],
  probability = 0.03,
): void {
  applyStyle(container, selector, (el) => {
    if (Math.random() < probability) {
      el.style.background = getRandomGradient(colors);
    }
  });
}

/** Always apply a random gradient */
export function cssIDGradient(
  container: HTMLElement,
  selector: string,
  colors: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    el.style.background = getRandomGradient(colors);
  });
}

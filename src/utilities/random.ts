/** Random integer from 0 to max-1 */
export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

/** Random integer between min and max (inclusive) */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Random item from an array */
export function getRandomItem<T>(array: readonly T[]): T {
  return array[getRandomNumber(array.length)];
}

/** Random color from a palette */
export function getRandomColor(palette: readonly string[]): string {
  return getRandomItem(palette);
}

/** Random number as pixel string, e.g. "42px" */
export function getRandomNumberPx(max: number): string {
  return `${getRandomNumber(max)}px`;
}

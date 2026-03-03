import { applyStyle } from './dom';
import { getRandomInt, getRandomItem } from './random';

/** Randomize font-size in cqh units (container query height) */
export function changeFontSize(
  container: HTMLElement,
  selector: string,
  min = 1,
  max = 10,
): void {
  applyStyle(container, selector, (el) => {
    el.style.fontSize = `${getRandomInt(min, max)}cqh`;
  });
}

/** Randomize flex value */
export function changeFlex(
  container: HTMLElement,
  selector: string,
  amount: number,
): void {
  applyStyle(container, selector, (el) => {
    el.style.flex = String(Math.floor(Math.random() * amount));
  });
}

/** Toggle between CSS classes */
export function changeClass(
  container: HTMLElement,
  selector: string,
  classOptions: readonly string[],
  removeClasses?: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    const className = getRandomItem(classOptions);
    if (removeClasses) {
      removeClasses.forEach((c) => el.classList.remove(c));
    }
    el.classList.add(className);
  });
}

/** Randomize border-radius with values from array */
export function changeBorderRadius(
  container: HTMLElement,
  selector: string,
  radiusOptions: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    const corners = Array.from({ length: 4 }, () => getRandomItem(radiusOptions));
    el.style.borderRadius = corners.join(' ');
  });
}

/** Randomize background color from palette */
export function changeColorCss(
  container: HTMLElement,
  selector: string,
  colors: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    el.style.backgroundColor = getRandomItem(colors);
  });
}

/** Randomize font color from palette */
export function changeFontColorCss(
  container: HTMLElement,
  selector: string,
  colors: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    el.style.color = getRandomItem(colors);
  });
}

/** Randomize font family from array */
export function changeFontFamily(
  container: HTMLElement,
  selector: string,
  fonts: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    el.style.fontFamily = getRandomItem(fonts);
  });
}

/** Randomize rotation and transform origin */
export function changeBoxRotation(
  container: HTMLElement,
  selector: string,
  min = 1,
  max = 10,
): void {
  applyStyle(container, selector, (el) => {
    const deg = getRandomInt(min, max);
    const originX = getRandomInt(1, 50);
    const originY = getRandomInt(1, 50);
    el.style.transform = `rotate(${deg}deg)`;
    el.style.transformOrigin = `${originX}% ${originY}%`;
  });
}

/** Randomize box-shadow */
export function changeBoxShadow(
  container: HTMLElement,
  selector: string,
  colors: readonly string[],
): void {
  applyStyle(container, selector, (el) => {
    const x = getRandomInt(-10, 10);
    const y = getRandomInt(-10, 10);
    const blur = getRandomInt(5, 15);
    const color = getRandomItem(colors);
    el.style.boxShadow = `${x}px ${y}px ${blur}px ${color}`;
  });
}

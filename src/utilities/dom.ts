/** Query all matching elements within a scoped container */
export function queryAll(container: HTMLElement, selector: string): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/** Apply a callback to all matching elements within a scoped container */
export function applyStyle(
  container: HTMLElement,
  selector: string,
  callback: (el: HTMLElement) => void,
): void {
  queryAll(container, selector).forEach(callback);
}

/** Set a CSS property on all matching elements via a value generator */
export function changeStyle(
  container: HTMLElement,
  selector: string,
  property: string,
  valueGenerator: () => string | number,
): void {
  applyStyle(container, selector, (el) => {
    el.style.setProperty(property, String(valueGenerator()));
  });
}

/** Create an HTML element with optional configuration */
export function createElement(
  tag: string,
  options?: {
    className?: string;
    textContent?: string;
    innerHTML?: string;
    styles?: Partial<CSSStyleDeclaration>;
  },
): HTMLElement {
  const el = document.createElement(tag);
  if (options?.className) el.className = options.className;
  if (options?.textContent) el.textContent = options.textContent;
  if (options?.innerHTML) el.innerHTML = options.innerHTML;
  if (options?.styles) {
    Object.assign(el.style, options.styles);
  }
  return el;
}

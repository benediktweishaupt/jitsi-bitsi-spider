import type { Token } from '../types/layers';
import { getRandomInt, getRandomItem } from '../utilities/random';

/**
 * Create DOM elements from tokens.
 *
 * createElements(tokens, 'div', 'letter-grid__letter')
 * createElements(tokens, 'span')
 * createElements(tokens, { randomTag: ['h1','h2','p','blockquote'] })
 *
 * Each element gets:
 * - `data-token-type` attribute for CSS targeting: [data-token-type="name"] { ... }
 * - `classPrefix` class if provided
 * - textContent set to token.text
 */
export function createElements(
  tokens: Token[],
  wrap: 'div' | 'span' | 'p' | { randomTag: readonly string[] },
  classPrefix?: string,
): HTMLElement[] {
  return tokens.map((token) => {
    const tag = typeof wrap === 'string' ? wrap : getRandomItem(wrap.randomTag);
    const el = document.createElement(tag);
    el.textContent = token.text;
    el.dataset.tokenType = token.type;
    if (classPrefix) el.classList.add(classPrefix);
    return el;
  });
}

/**
 * Arrange elements into a container using a layout strategy.
 *
 * layout(canvas, elements, 'flow')
 *   → appends elements directly (natural document flow)
 *
 * layout(canvas, elements, 'flex-grid', { columns: 5 })
 *   → wraps into rows of N elements with flex display
 *
 * layout(stage, elements, 'absolute-random')
 *   → sets position:absolute with random %, visibility hidden
 *
 * layout(stage, elements, 'fullscreen-stack')
 *   → stacks each element as a full-size overlay
 *
 * layout(stage, elements, 'z-stack', { layers: 6, perLayer: 5 })
 *   → distributes elements across N absolutely-positioned layers
 */
export function layout(
  container: HTMLElement,
  elements: HTMLElement[],
  strategy: 'flow' | 'flex-grid' | 'absolute-random' | 'fullscreen-stack' | 'z-stack',
  options?: {
    columns?: number;
    layers?: number;
    perLayer?: number;
    rowClass?: string;
    layerClass?: string;
    stackClass?: string;
  },
): void {
  if (strategy === 'flow') {
    elements.forEach((el) => container.appendChild(el));
    return;
  }

  if (strategy === 'flex-grid') {
    const cols = options?.columns ?? 5;
    const rowClass = options?.rowClass;
    let row: HTMLElement | null = null;

    elements.forEach((el, i) => {
      if (i % cols === 0) {
        row = document.createElement('div');
        row.style.display = 'flex';
        if (rowClass) row.classList.add(rowClass);
        container.appendChild(row);
      }
      row!.appendChild(el);
    });
    return;
  }

  if (strategy === 'absolute-random') {
    container.style.position = container.style.position || 'relative';
    elements.forEach((el) => {
      el.style.position = 'absolute';
      el.style.left = `${getRandomInt(5, 90)}%`;
      el.style.top = `${getRandomInt(5, 90)}%`;
      container.appendChild(el);
    });
    return;
  }

  if (strategy === 'fullscreen-stack') {
    const stackClass = options?.stackClass;
    elements.forEach((el) => {
      if (stackClass) el.classList.add(stackClass);
      container.appendChild(el);
    });
    return;
  }

  // z-stack: distribute elements across layers
  const layerCount = options?.layers ?? 6;
  const perLayer = options?.perLayer ?? Math.ceil(elements.length / layerCount);
  const layerClass = options?.layerClass;

  for (let i = 0; i < layerCount; i++) {
    const layer = document.createElement('div');
    layer.dataset.layerIndex = String(i);
    if (layerClass) layer.classList.add(layerClass);

    const start = i * perLayer;
    const slice = elements.slice(start, start + perLayer);

    // If fewer elements than layers × perLayer, sample randomly
    if (slice.length === 0) {
      for (let j = 0; j < perLayer; j++) {
        const src = elements[getRandomInt(0, elements.length - 1)];
        layer.appendChild(src.cloneNode(true) as HTMLElement);
      }
    } else {
      slice.forEach((el) => layer.appendChild(el));
    }

    container.appendChild(layer);
  }
}

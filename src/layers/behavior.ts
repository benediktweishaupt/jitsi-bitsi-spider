import type { IntervalManager } from '../utilities/animation';
import { getRandomInt } from '../utilities/random';

type Driver =
  | { type: 'timer'; interval: number }
  | { type: 'mouse'; event: 'move' | 'hover' }
  | { type: 'scroll'; debounce?: number };

/**
 * Connect a driver (timer, mouse, scroll) to an effect callback.
 *
 * drive(manager, container, { type: 'timer', interval: 1000 }, () => changeFlex(...))
 * drive(manager, canvas, { type: 'mouse', event: 'move' }, (target, e) => positionAt(...))
 * drive(manager, container, { type: 'scroll', debounce: 50 }, () => rotateClasses(...))
 */
export function drive(
  manager: IntervalManager,
  target: HTMLElement,
  driver: Driver,
  effect: (target: HTMLElement, event?: Event) => void,
): void {
  if (driver.type === 'timer') {
    manager.addInterval(() => effect(target), driver.interval);
    return;
  }

  if (driver.type === 'mouse') {
    const eventName = driver.event === 'move' ? 'mousemove' : 'mouseenter';
    manager.addListener(target, eventName, ((e: Event) => {
      effect(target, e);
    }) as EventListener);

    // Touch support for move
    if (driver.event === 'move') {
      manager.addListener(target, 'touchmove', ((e: Event) => {
        effect(target, e);
      }) as EventListener, { passive: true });
    }
    return;
  }

  // scroll
  const ms = driver.debounce ?? 50;
  let timer: ReturnType<typeof setTimeout>;
  const handler = ((e: Event) => {
    clearTimeout(timer);
    timer = setTimeout(() => effect(target, e), ms);
  }) as EventListener;

  manager.addListener(target, 'wheel', handler, { passive: true });

  // Touch swipe support
  let touchStartY = 0;
  manager.addListener(target, 'touchstart', ((e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  }) as EventListener, { passive: true });

  manager.addListener(target, 'touchend', ((e: TouchEvent) => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 30) effect(target, e);
  }) as EventListener, { passive: true });
}

/**
 * Common element-level operations on matched elements.
 *
 * applyToElements(container, '.class', 'emit', { factory: () => makeEl() })
 *   → appends a new element from factory to the first match (prepend)
 *
 * applyToElements(container, '.class', 'reveal-next', { counter: { value: 0 } })
 *   → shows the next hidden element by index
 *
 * applyToElements(container, '.class', 'cycle-visibility', { activeClass: 'visible' })
 *   → hides current active, shows next
 *
 * applyToElements(container, '.class', 'reposition')
 *   → randomises left/top positions within container bounds
 */
export function applyToElements(
  container: HTMLElement,
  selector: string,
  effect: 'emit' | 'reveal-next' | 'cycle-visibility' | 'reposition',
  options?: {
    factory?: () => HTMLElement;
    counter?: { value: number };
    activeClass?: string;
    bounds?: { w: number; h: number };
  },
): void {
  const els = Array.from(container.querySelectorAll<HTMLElement>(selector));

  if (effect === 'emit') {
    const parent = els[0] ?? container;
    const child = options?.factory?.();
    if (child) parent.insertBefore(child, parent.firstChild);
    return;
  }

  if (effect === 'reveal-next') {
    const ctr = options?.counter ?? { value: 0 };
    const idx = ctr.value % els.length;
    const el = els[idx];
    if (el) el.style.opacity = '1';
    ctr.value++;
    return;
  }

  if (effect === 'cycle-visibility') {
    const cls = options?.activeClass ?? 'active';
    const current = container.querySelector(`.${cls}`) as HTMLElement | null;
    if (current) current.classList.remove(cls);

    const ctr = options?.counter ?? { value: 0 };
    const idx = ctr.value % els.length;
    els[idx]?.classList.add(cls);
    ctr.value++;
    return;
  }

  // reposition
  const w = options?.bounds?.w ?? (container.clientWidth || 800);
  const h = options?.bounds?.h ?? (container.clientHeight || 800);

  els.forEach((el) => {
    const bh = getRandomInt(Math.round(h * 0.1), Math.round(h * 0.5));
    const bw = Math.round(bh * 1.6);
    el.style.left = `${getRandomInt(0, Math.max(0, w - bw))}px`;
    el.style.top = `${getRandomInt(0, Math.max(0, h - bh))}px`;
    el.style.width = `${bw}px`;
    el.style.height = `${bh}px`;
  });
}

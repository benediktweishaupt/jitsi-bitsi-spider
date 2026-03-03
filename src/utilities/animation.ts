import type { Cleanup } from '../types/speaker';

/** Manages intervals, timeouts, listeners, and animation frames with cleanup */
export class IntervalManager {
  private intervals: number[] = [];
  private timeouts: number[] = [];
  private listeners: Array<{ target: EventTarget; event: string; handler: EventListenerOrEventListenerObject }> = [];
  private animationFrames: number[] = [];
  private observer: MutationObserver | null = null;

  /** Register a setInterval that will be cleaned up */
  addInterval(callback: () => void, ms: number): number {
    const id = window.setInterval(callback, ms);
    this.intervals.push(id);
    return id;
  }

  /** Register a setTimeout that will be cleaned up */
  addTimeout(callback: () => void, ms: number): number {
    const id = window.setTimeout(callback, ms);
    this.timeouts.push(id);
    return id;
  }

  /** Register an event listener that will be cleaned up */
  addListener(
    target: EventTarget,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions,
  ): void {
    target.addEventListener(event, handler, options);
    this.listeners.push({ target, event, handler });
  }

  /** Register a requestAnimationFrame loop that will be cleaned up */
  addAnimationFrame(callback: FrameRequestCallback): number {
    const id = requestAnimationFrame(callback);
    this.animationFrames.push(id);
    return id;
  }

  /** Start a persistent rAF loop. Returns a function to stop it. */
  startAnimationLoop(callback: (time: number) => void): Cleanup {
    let running = true;
    const loop = (time: number) => {
      if (!running) return;
      callback(time);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return () => { running = false; };
  }

  /** Auto-cleanup when container is removed from DOM */
  watchForRemoval(container: HTMLElement): void {
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const removed of mutation.removedNodes) {
          if (removed === container || (removed instanceof HTMLElement && removed.contains(container))) {
            this.cleanup();
            return;
          }
        }
      }
    });
    if (container.parentNode) {
      this.observer.observe(container.parentNode, { childList: true, subtree: true });
    }
  }

  /** Clean up everything */
  cleanup(): void {
    this.intervals.forEach(clearInterval);
    this.intervals = [];

    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    this.listeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
    });
    this.listeners = [];

    this.animationFrames.forEach(cancelAnimationFrame);
    this.animationFrames = [];

    this.observer?.disconnect();
    this.observer = null;
  }
}

/** Promise-based sequential animation: calls onItem for each item with a delay */
export async function animateSequence<T>(
  items: T[],
  delayMs: number,
  onItem: (item: T, index: number, progress: number) => void,
  manager: IntervalManager,
): Promise<void> {
  const total = items.length;
  for (let i = 0; i < total; i++) {
    await new Promise<void>((resolve) => {
      manager.addTimeout(() => {
        onItem(items[i], i, (i / total) * 100);
        resolve();
      }, delayMs);
    });
  }
}

/** Check if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

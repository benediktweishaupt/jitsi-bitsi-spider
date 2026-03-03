import type { Speaker, PosterConfig, Cleanup, PosterFactory } from '../types/speaker';
import { IntervalManager, prefersReducedMotion } from './animation';

export interface PosterContext {
  container: HTMLElement;
  speaker: Speaker;
  config: PosterConfig;
}

export interface PosterDefinition {
  name: string;
  build: (ctx: PosterContext) => void;
  staticFallback?: (ctx: PosterContext) => void;
  animate: (ctx: PosterContext, manager: IntervalManager) => Cleanup | void;
}

export function definePoster(def: PosterDefinition): PosterFactory {
  return (container, speaker, config = {}) => {
    const ctx: PosterContext = { container, speaker, config };
    const manager = new IntervalManager();

    container.classList.add('poster', def.name);
    def.build(ctx);

    if (prefersReducedMotion() && config.reduceMotion !== false) {
      def.staticFallback?.(ctx);
      return () => manager.cleanup();
    }

    const extraCleanup = def.animate(ctx, manager);
    manager.watchForRemoval(container);

    return () => {
      extraCleanup?.();
      manager.cleanup();
    };
  };
}

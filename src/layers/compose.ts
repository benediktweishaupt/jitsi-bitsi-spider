import type { PosterConfig, PosterFactory } from '../types/speaker';
import type { PosterRecipe } from '../types/layers';
import { IntervalManager, prefersReducedMotion } from '../utilities/animation';

/**
 * Compose a poster from a three-layer recipe.
 *
 * Same lifecycle as definePoster (CSS class, IntervalManager, reduced-motion,
 * DOM removal watch, cleanup) but with an explicit content/render/animate split.
 */
export function composePoster(recipe: PosterRecipe): PosterFactory {
  return (container, speaker, config: PosterConfig = {}) => {
    const manager = new IntervalManager();

    container.classList.add('poster', recipe.name);

    const tokens = recipe.content(speaker, config);
    recipe.render(container, tokens, config);

    if (prefersReducedMotion() && config.reduceMotion !== false) {
      recipe.staticFallback?.(container, tokens, config);
      return () => manager.cleanup();
    }

    const extraCleanup = recipe.animate?.(container, tokens, manager, config);
    manager.watchForRemoval(container);

    return () => {
      extraCleanup?.();
      manager.cleanup();
    };
  };
}

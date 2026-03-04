import type { Speaker, PosterConfig, Cleanup } from './speaker';
import type { IntervalManager } from '../utilities/animation';

/** A typed content token — the shared interface between all three layers */
export interface Token {
  text: string;
  type: string; // 'name' | 'caption' | 'date' | 'bio' | 'keyword' | 'meta' | 'image'
}

/** A poster decomposed into Content / Render / Animate layers */
export interface PosterRecipe {
  name: string;

  /** Layer 1: extract and tokenize speaker data */
  content(speaker: Speaker, config: PosterConfig): Token[];

  /** Layer 2: create DOM structure from tokens */
  render(container: HTMLElement, tokens: Token[], config: PosterConfig): void;

  /** Layer 3: animate the rendered DOM over time */
  animate?(
    container: HTMLElement,
    tokens: Token[],
    manager: IntervalManager,
    config: PosterConfig,
  ): Cleanup | void;

  /** Reduced-motion fallback (static snapshot) */
  staticFallback?(container: HTMLElement, tokens: Token[], config: PosterConfig): void;
}

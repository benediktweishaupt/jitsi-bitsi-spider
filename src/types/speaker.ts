export interface Speaker {
  name: string;
  editionNumber: number;
  date: string;
  time: string;
  caption: {
    en: string;
    de: string;
  };
  image?: string;
  link?: string;
  bio?: {
    en: { text: string; link: string | string[] };
    de: { text: string; link: string | string[] };
  };
}

export interface PosterConfig {
  // Visual
  colors?: string[];
  fonts?: string[];
  backgroundColor?: string;
  blendMode?: string;

  // Timing — named intervals in ms (poster reads by key with fallback)
  intervals?: Record<string, number>;

  // Quantities — named counts (poster reads by key with fallback)
  counts?: Record<string, number>;

  // Ranges — named min/max pairs (poster reads by key with fallback)
  ranges?: Record<string, [number, number]>;

  // Behavior
  speed?: number;
  reduceMotion?: boolean;

  // Poster-specific
  backgroundImage?: string;
  animatedBackground?: boolean;
  blurBackground?: boolean;
  colorBurn?: boolean;
  borderRadiusOptions?: string[];
}

export type Cleanup = () => void;

export type PosterFactory = (
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
) => Cleanup;

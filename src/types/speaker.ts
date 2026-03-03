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
  colors?: string[];
  fonts?: string[];
  speed?: number;
  reduceMotion?: boolean;
}

export type Cleanup = () => void;

export type PosterFactory = (
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
) => Cleanup;

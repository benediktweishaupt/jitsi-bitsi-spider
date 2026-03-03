import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createLetterGrid } from './letter-grid';
import { speakers } from '../../data/speakers';
import { PALETTES } from '../../utilities/color-palettes';

interface Args {
  speaker: Speaker;
  speed: number;
  fastInterval: number;
  slowInterval: number;
  palette: string;
  fontSizeMin: number;
  fontSizeMax: number;
  variant: 'mutiti' | 'krishnamurthy';
}

const PALETTE_MAP: Record<string, string[]> = {
  monochrome: [...PALETTES.monochrome],
  primary: [...PALETTES.primary],
  warm: [...PALETTES.warm],
};

function buildConfig(args: Args): PosterConfig {
  const variantConfig = args.variant === 'mutiti'
    ? {
        animatedBackground: true,
        backgroundImage: 'img/nontsikelelo-mutiti/background.png',
      }
    : {
        animatedBackground: false,
        borderRadiusOptions: ['100%', '0'],
      };

  return {
    speed: args.speed,
    colors: PALETTE_MAP[args.palette] ?? [...PALETTES.monochrome],
    intervals: { fast: args.fastInterval, slow: args.slowInterval },
    ranges: { fontSize: [args.fontSizeMin, args.fontSizeMax] },
    ...variantConfig,
  };
}

const meta: Meta<Args> = {
  title: 'Posters/LetterGrid',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    fastInterval: { control: { type: 'range', min: 200, max: 3000, step: 100 } },
    slowInterval: { control: { type: 'range', min: 2000, max: 15000, step: 500 } },
    palette: { control: 'select', options: ['monochrome', 'primary', 'warm'] },
    fontSizeMin: { control: { type: 'range', min: 1, max: 20, step: 1 } },
    fontSizeMax: { control: { type: 'range', min: 10, max: 80, step: 1 } },
    variant: { control: 'radio', options: ['mutiti', 'krishnamurthy'] },
  },
  args: {
    speaker: speakers[2],
    speed: 1,
    fastInterval: 1000,
    slowInterval: 8000,
    palette: 'monochrome',
    fontSizeMin: 1,
    fontSizeMax: 40,
    variant: 'mutiti',
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createLetterGrid(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const MutitiStyle: Story = {
  args: { speaker: speakers[2], variant: 'mutiti' },
};

export const KrishnamurthyStyle: Story = {
  args: { speaker: speakers[5], variant: 'krishnamurthy' },
};

export const Frantic: Story = {
  args: { speed: 3, fastInterval: 300, slowInterval: 2000, palette: 'warm' },
};

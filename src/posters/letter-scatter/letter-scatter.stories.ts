import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createLetterScatter } from './letter-scatter';
import { speakers } from '../../data/speakers';
import { PALETTES } from '../../utilities/color-palettes';

interface Args {
  speaker: Speaker;
  speed: number;
  scatterInterval: number;
  bgColorInterval: number;
  palette: string;
  fontSizeMin: number;
  fontSizeMax: number;
  variant: 'contrast' | 'blur';
}

const PALETTE_MAP: Record<string, string[]> = {
  monochrome: [...PALETTES.monochrome],
  primary: [...PALETTES.primary],
  warm: [...PALETTES.warm],
};

function buildConfig(args: Args): PosterConfig {
  const variantConfig = args.variant === 'blur'
    ? { blurBackground: true, colorBurn: true }
    : { blurBackground: false, colorBurn: false };

  return {
    speed: args.speed,
    colors: PALETTE_MAP[args.palette] ?? [...PALETTES.monochrome],
    intervals: { scatter: args.scatterInterval, bgColor: args.bgColorInterval },
    ranges: { fontSize: [args.fontSizeMin, args.fontSizeMax] },
    ...variantConfig,
  };
}

const meta: Meta<Args> = {
  title: 'Posters/LetterScatter',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    scatterInterval: { control: { type: 'range', min: 200, max: 4000, step: 100 } },
    bgColorInterval: { control: { type: 'range', min: 2000, max: 15000, step: 500 } },
    palette: { control: 'select', options: ['monochrome', 'primary', 'warm'] },
    fontSizeMin: { control: { type: 'range', min: 2, max: 30, step: 1 } },
    fontSizeMax: { control: { type: 'range', min: 20, max: 80, step: 1 } },
    variant: { control: 'radio', options: ['contrast', 'blur'] },
  },
  args: {
    speaker: speakers[6],
    speed: 1,
    scatterInterval: 1361,
    bgColorInterval: 8000,
    palette: 'monochrome',
    fontSizeMin: 10,
    fontSizeMax: 40,
    variant: 'contrast',
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createLetterScatter(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const ContrastStyle: Story = {
  args: { speaker: speakers[6], variant: 'contrast' },
};

export const BlurStyle: Story = {
  args: { speaker: speakers[8], variant: 'blur', palette: 'primary' },
};

export const LargeType: Story = {
  args: { fontSizeMin: 30, fontSizeMax: 70, scatterInterval: 600, palette: 'warm' },
};

import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createScreenFlicker } from './screen-flicker';
import { speakers } from '../../data/speakers';
import { PALETTES } from '../../utilities/color-palettes';
import { FONTS } from '../../utilities/font-stacks';

interface Args {
  speaker: Speaker;
  speed: number;
  flickerInterval: number;
  palette: string;
  fontStack: string;
}

const PALETTE_MAP: Record<string, string[]> = {
  monochrome: [...PALETTES.monochrome],
  primary: [...PALETTES.primary],
  warm: [...PALETTES.warm],
};

const FONT_MAP: Record<string, string[]> = {
  display: [...FONTS.display],
  elegant: [...FONTS.elegant],
};

function buildConfig(args: Args): PosterConfig {
  return {
    speed: args.speed,
    colors: PALETTE_MAP[args.palette] ?? [...PALETTES.warm],
    fonts: FONT_MAP[args.fontStack] ?? [...FONTS.display],
    intervals: { flicker: args.flickerInterval },
  };
}

const meta: Meta<Args> = {
  title: 'Posters/ScreenFlicker',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    flickerInterval: { control: { type: 'range', min: 100, max: 2000, step: 50 } },
    palette: { control: 'select', options: ['warm', 'primary', 'monochrome'] },
    fontStack: { control: 'select', options: ['display', 'elegant'] },
  },
  args: {
    speaker: speakers[4],
    speed: 1,
    flickerInterval: 500,
    palette: 'warm',
    fontStack: 'display',
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createScreenFlicker(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Rapid: Story = {
  args: { speed: 3, flickerInterval: 150 },
};

export const Elegant: Story = {
  args: { fontStack: 'elegant', palette: 'monochrome', flickerInterval: 800 },
};

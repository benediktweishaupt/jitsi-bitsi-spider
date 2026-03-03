import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createLetterChase } from './letter-chase';
import { speakers } from '../../data/speakers';
import { PALETTES } from '../../utilities/color-palettes';

interface Args {
  speaker: Speaker;
  speed: number;
  moveInterval: number;
  bgInterval: number;
  palette: string;
}

const PALETTE_MAP: Record<string, string[]> = {
  monochrome: [...PALETTES.monochrome],
  primary: [...PALETTES.primary],
  warm: [...PALETTES.warm],
};

function buildConfig(args: Args): PosterConfig {
  return {
    speed: args.speed,
    colors: PALETTE_MAP[args.palette] ?? [...PALETTES.primary],
    intervals: { move: args.moveInterval, background: args.bgInterval },
  };
}

const meta: Meta<Args> = {
  title: 'Posters/LetterChase',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    moveInterval: { control: { type: 'range', min: 200, max: 5000, step: 100 } },
    bgInterval: { control: { type: 'range', min: 1000, max: 10000, step: 500 } },
    palette: { control: 'select', options: ['primary', 'monochrome', 'warm'] },
  },
  args: {
    speaker: speakers[3],
    speed: 1,
    moveInterval: 1500,
    bgInterval: 4000,
    palette: 'primary',
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createLetterChase(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Fast: Story = {
  args: { speed: 2, moveInterval: 500 },
};

export const Warm: Story = {
  args: { palette: 'warm', bgInterval: 2000 },
};

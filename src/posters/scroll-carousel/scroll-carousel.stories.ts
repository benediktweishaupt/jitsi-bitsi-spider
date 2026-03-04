import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createScrollCarousel } from './scroll-carousel';
import { speakers } from '../../data/speakers';

interface Args {
  speaker: Speaker;
  speed: number;
  repositionInterval: number;
  blocksPerLayer: number;
}

function buildConfig(args: Args): PosterConfig {
  return {
    speed: args.speed,
    intervals: { reposition: args.repositionInterval },
    counts: { blocksPerLayer: args.blocksPerLayer },
  };
}

const meta: Meta<Args> = {
  title: 'Posters/ScrollCarousel',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    repositionInterval: { control: { type: 'range', min: 2000, max: 20000, step: 1000 } },
    blocksPerLayer: { control: { type: 'range', min: 3, max: 10, step: 1 } },
  },
  args: {
    speaker: speakers[11],
    speed: 1,
    repositionInterval: 10000,
    blocksPerLayer: 5,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createScrollCarousel(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Dense: Story = {
  args: { blocksPerLayer: 8, repositionInterval: 5000 },
};

export const Minimal: Story = {
  args: { blocksPerLayer: 3, repositionInterval: 15000 },
};

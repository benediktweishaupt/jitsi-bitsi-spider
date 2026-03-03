import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createTextExplosion } from './text-explosion';
import { speakers } from '../../data/speakers';

interface Args {
  speaker: Speaker;
  speed: number;
  emitInterval: number;
}

function buildConfig(args: Args): PosterConfig {
  return {
    speed: args.speed,
    intervals: { emit: args.emitInterval },
  };
}

const meta: Meta<Args> = {
  title: 'Posters/TextExplosion',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    emitInterval: { control: { type: 'range', min: 200, max: 3000, step: 100 } },
  },
  args: {
    speaker: speakers[0],
    speed: 1,
    emitInterval: 1200,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createTextExplosion(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Rapid: Story = {
  args: { speed: 2, emitInterval: 400 },
};

export const Slow: Story = {
  args: { speed: 0.5, emitInterval: 2400 },
};

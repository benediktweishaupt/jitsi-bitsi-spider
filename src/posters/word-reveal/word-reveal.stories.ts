import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createWordReveal } from './word-reveal';
import { speakers } from '../../data/speakers';

interface Args {
  speaker: Speaker;
  speed: number;
  revealInterval: number;
}

function buildConfig(args: Args): PosterConfig {
  return {
    speed: args.speed,
    intervals: { reveal: args.revealInterval },
  };
}

const meta: Meta<Args> = {
  title: 'Posters/WordReveal',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
    revealInterval: { control: { type: 'range', min: 100, max: 2000, step: 50 } },
  },
  args: {
    speaker: speakers[1],
    speed: 1,
    revealInterval: 600,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createWordReveal(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Rapid: Story = {
  args: { speed: 2, revealInterval: 200 },
};

export const Slow: Story = {
  args: { speed: 0.5, revealInterval: 1200 },
};

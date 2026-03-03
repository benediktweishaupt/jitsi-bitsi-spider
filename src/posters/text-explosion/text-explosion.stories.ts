import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createTextExplosion } from './text-explosion';
import { speakers } from '../../data/speakers';

interface TextExplosionArgs {
  speaker: Speaker;
  speed: number;
}

const meta: Meta<TextExplosionArgs> = {
  title: 'Posters/TextExplosion',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: {
      control: { type: 'range', min: 0.25, max: 4, step: 0.25 },
    },
  },
  args: {
    speaker: speakers[0],
    speed: 1,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createTextExplosion(container, args.speaker, { speed: args.speed });
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<TextExplosionArgs>;

export const Default: Story = {};

export const Fast: Story = {
  args: { speed: 3 },
};

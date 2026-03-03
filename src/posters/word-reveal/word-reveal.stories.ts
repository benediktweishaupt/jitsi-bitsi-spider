import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createWordReveal } from './word-reveal';
import { speakers } from '../../data/speakers';

interface WordRevealArgs {
  speaker: Speaker;
  speed: number;
}

const meta: Meta<WordRevealArgs> = {
  title: 'Posters/WordReveal',
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
    speaker: speakers[1], // Jutta Bauer
    speed: 1,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createWordReveal(container, args.speaker, { speed: args.speed });
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<WordRevealArgs>;

export const Default: Story = {};

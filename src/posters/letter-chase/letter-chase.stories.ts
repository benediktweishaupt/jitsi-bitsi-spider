import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createLetterChase } from './letter-chase';
import { speakers } from '../../data/speakers';

interface LetterChaseArgs {
  speaker: Speaker;
  speed: number;
}

const meta: Meta<LetterChaseArgs> = {
  title: 'Posters/LetterChase',
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
    speaker: speakers[3], // Studio Moniker
    speed: 1,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createLetterChase(container, args.speaker, { speed: args.speed });
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<LetterChaseArgs>;

export const Default: Story = {};

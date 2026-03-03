import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createStaticTypography } from './static-typography';
import { speakers } from '../../data/speakers';

interface Args {
  speaker: Speaker;
}

const meta: Meta<Args> = {
  title: 'Posters/StaticTypography',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
  },
  args: {
    speaker: speakers[12],
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createStaticTypography(container, args.speaker);
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const ShortName: Story = {
  args: { speaker: speakers[1] },
};

export const LongName: Story = {
  args: { speaker: speakers[2] },
};

import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createStaticTypography } from './static-typography';
import { speakers } from '../../data/speakers';

interface StaticTypographyArgs {
  speaker: Speaker;
}

const meta: Meta<StaticTypographyArgs> = {
  title: 'Posters/StaticTypography',
  tags: ['autodocs'],
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
  },
  args: {
    speaker: speakers[12], // J. Wenzel & W. Schwärzler
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createStaticTypography(container, args.speaker);
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<StaticTypographyArgs>;

export const Default: Story = {};

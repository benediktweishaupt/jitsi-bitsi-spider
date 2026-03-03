import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createLetterGrid } from './letter-grid';
import { speakers } from '../../data/speakers';
import { PALETTES } from '../../utilities/color-palettes';

interface LetterGridArgs {
  speaker: Speaker;
  speed: number;
  variant: 'mutiti' | 'krishnamurthy';
}

const meta: Meta<LetterGridArgs> = {
  title: 'Posters/LetterGrid',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    speed: {
      control: { type: 'range', min: 0.25, max: 4, step: 0.25 },
    },
    variant: {
      control: 'radio',
      options: ['mutiti', 'krishnamurthy'],
    },
  },
  args: {
    speaker: speakers[2], // Nontsikelelo Mutiti
    speed: 1,
    variant: 'mutiti',
  },
  render: (args) => {
    const container = document.createElement('div');

    const variantConfig = args.variant === 'mutiti'
      ? {
          animatedBackground: true,
          backgroundImage: 'img/nontsikelelo-mutiti/background.png',
          colors: [...PALETTES.monochrome],
        }
      : {
          animatedBackground: false,
          borderRadiusOptions: ['100%', '0'],
          colors: ['black'],
        };

    const cleanup = createLetterGrid(container, args.speaker, {
      speed: args.speed,
      ...variantConfig,
    });
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<LetterGridArgs>;

export const MutitiStyle: Story = {
  args: { speaker: speakers[2], variant: 'mutiti' },
};

export const KrishnamurthyStyle: Story = {
  args: { speaker: speakers[5], variant: 'krishnamurthy' },
};

import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createLetterScatter } from './letter-scatter';
import { speakers } from '../../data/speakers';
import { PALETTES } from '../../utilities/color-palettes';

interface LetterScatterArgs {
  speaker: Speaker;
  speed: number;
  variant: 'contrast' | 'blur';
}

const meta: Meta<LetterScatterArgs> = {
  title: 'Posters/LetterScatter',
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
      options: ['contrast', 'blur'],
    },
  },
  args: {
    speaker: speakers[6], // Lukas Feireiss
    speed: 1,
    variant: 'contrast',
  },
  render: (args) => {
    const container = document.createElement('div');
    const variantConfig = args.variant === 'blur'
      ? { blurBackground: true, colorBurn: true, colors: [...PALETTES.primary] }
      : { blurBackground: false, colorBurn: false, colors: [...PALETTES.monochrome] };

    const cleanup = createLetterScatter(container, args.speaker, {
      speed: args.speed,
      ...variantConfig,
    });
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<LetterScatterArgs>;

export const ContrastStyle: Story = {
  args: { speaker: speakers[6], variant: 'contrast' },
};

export const BlurStyle: Story = {
  args: { speaker: speakers[8], variant: 'blur' },
};

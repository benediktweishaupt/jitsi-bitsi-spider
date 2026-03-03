import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../../types/speaker';
import { createPhysicsBlobs } from './physics-blobs';
import { speakers } from '../../data/speakers';

interface Args {
  speaker: Speaker;
  blobCount: number;
  radiusMin: number;
  radiusMax: number;
}

function buildConfig(args: Args): PosterConfig {
  return {
    counts: { blobs: args.blobCount },
    ranges: { blobRadius: [args.radiusMin, args.radiusMax] },
  };
}

const meta: Meta<Args> = {
  title: 'Posters/PhysicsBlobs',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    blobCount: { control: { type: 'range', min: 3, max: 30, step: 1 } },
    radiusMin: { control: { type: 'range', min: 20, max: 100, step: 5 } },
    radiusMax: { control: { type: 'range', min: 60, max: 200, step: 5 } },
  },
  args: {
    speaker: speakers[10],
    blobCount: 12,
    radiusMin: 60,
    radiusMax: 120,
  },
  render: (args) => {
    const container = document.createElement('div');
    const cleanup = createPhysicsBlobs(container, args.speaker, buildConfig(args));
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const FewLarge: Story = {
  args: { blobCount: 5, radiusMin: 100, radiusMax: 180 },
};

export const ManySmall: Story = {
  args: { blobCount: 25, radiusMin: 20, radiusMax: 50 },
};

import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker } from '../../types/speaker';
import { createPhysicsBlobs } from './physics-blobs';
import { speakers } from '../../data/speakers';

interface PhysicsBlobsArgs {
  speaker: Speaker;
}

const meta: Meta<PhysicsBlobsArgs> = {
  title: 'Posters/PhysicsBlobs',
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
  },
  args: {
    speaker: speakers[10], // Emily Smith
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    const cleanup = createPhysicsBlobs(container, args.speaker);
    (container as any).__cleanup = cleanup;
    return container;
  },
};

export default meta;
type Story = StoryObj<PhysicsBlobsArgs>;

export const Default: Story = {};

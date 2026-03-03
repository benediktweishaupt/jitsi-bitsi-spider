import type { Meta, StoryObj } from '@storybook/html';
import type { PosterFactory } from '../types/speaker';
import { speakers } from '../data/speakers';
import { PALETTES } from '../utilities/color-palettes';
import { createTextExplosion } from '../posters/text-explosion/text-explosion';
import { createWordReveal } from '../posters/word-reveal/word-reveal';
import { createLetterGrid } from '../posters/letter-grid/letter-grid';
import { createLetterChase } from '../posters/letter-chase/letter-chase';
import { createScreenFlicker } from '../posters/screen-flicker/screen-flicker';
import { createLetterScatter } from '../posters/letter-scatter/letter-scatter';
import { createPhysicsBlobs } from '../posters/physics-blobs/physics-blobs';
import { createStaticTypography } from '../posters/static-typography/static-typography';

interface PosterEntry {
  label: string;
  factory: PosterFactory;
  speakerIndex: number;
  config?: Record<string, unknown>;
}

const POSTERS: PosterEntry[] = [
  { label: 'TextExplosion', factory: createTextExplosion, speakerIndex: 0 },
  { label: 'WordReveal', factory: createWordReveal, speakerIndex: 1 },
  { label: 'LetterGrid', factory: createLetterGrid, speakerIndex: 2, config: { animatedBackground: true, backgroundImage: 'img/nontsikelelo-mutiti/background.png', colors: [...PALETTES.monochrome] } },
  { label: 'LetterChase', factory: createLetterChase, speakerIndex: 3 },
  { label: 'ScreenFlicker', factory: createScreenFlicker, speakerIndex: 4 },
  { label: 'LetterScatter', factory: createLetterScatter, speakerIndex: 6 },
  { label: 'PhysicsBlobs', factory: createPhysicsBlobs, speakerIndex: 10 },
  { label: 'StaticTypography', factory: createStaticTypography, speakerIndex: 12 },
];

const meta: Meta = {
  title: 'Overview/Gallery',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const AllPosters: Story = {
  render: () => {
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 8px; background: #222; min-height: 100vh;';

    const cleanups: (() => void)[] = [];

    POSTERS.forEach((entry) => {
      const cell = document.createElement('div');
      cell.style.cssText = 'position: relative; aspect-ratio: 1; overflow: hidden;';

      const label = document.createElement('div');
      label.textContent = entry.label;
      label.style.cssText = 'position: absolute; bottom: 4px; left: 4px; z-index: 10; font: 10px/1 monospace; color: #999; pointer-events: none;';

      const posterContainer = document.createElement('div');
      posterContainer.style.cssText = 'width: 100%; height: 100%;';

      cell.appendChild(posterContainer);
      cell.appendChild(label);
      grid.appendChild(cell);

      const cleanup = entry.factory(posterContainer, speakers[entry.speakerIndex], entry.config);
      cleanups.push(cleanup);
    });

    (grid as any).__cleanup = () => cleanups.forEach((fn) => fn());
    return grid;
  },
};

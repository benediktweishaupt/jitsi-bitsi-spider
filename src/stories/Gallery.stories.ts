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

function createAboutSection(): HTMLElement {
  const about = document.createElement('div');
  about.style.cssText = 'max-width: 720px; margin: 0 auto; padding: 48px 24px 32px; font-family: system-ui, -apple-system, sans-serif; color: #ccc; line-height: 1.6;';

  about.innerHTML = `
    <h1 style="font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 8px;">Jitsi Bitsi Spider</h1>
    <p style="font-size: 14px; color: #777; margin: 0 0 24px;">Generative poster system for animated typographic posters</p>

    <p style="margin: 0 0 16px;">
      <em>Jitsi Bitsi Spider</em> was a lecture series at
      <strong style="color: #fff;">Kunsthochschule Weissensee</strong>, Berlin,
      initiated by <strong style="color: #fff;">Matthias Hubner</strong> in 2020.
      During the early months of the pandemic, guest speakers presented their work
      via Jitsi video calls &mdash; hence the name, a nod to the nursery rhyme and
      the open-source video platform.
    </p>

    <p style="margin: 0 0 16px;">
      Each speaker received a unique animated poster. Rather than designing each one
      from scratch, I built a generative system: feed it speaker data &mdash; name,
      date, caption, image &mdash; and it produces a different visual interpretation
      every time. 8 distinct poster patterns, 13 speakers, same data interface.
    </p>

    <p style="margin: 0 0 16px;">
      The posters explore kinetic typography, grid mutations, mouse-driven letter placement,
      screen flickering, scattered letterforms, canvas-based physics, and static typographic
      composition. Each pattern is a self-contained factory function with its own animation
      logic, color system, and timing &mdash; configurable through a shared
      <code style="background: #333; padding: 2px 6px; border-radius: 3px; font-size: 13px;">PosterConfig</code> interface.
    </p>

    <p style="margin: 0 0 16px;">
      Built with vanilla TypeScript, no framework. Zero runtime dependencies. Every poster
      is imperative DOM manipulation &mdash; elements are created, styled, and animated
      directly. The entire system runs in the browser with nothing but the standard Web API.
    </p>

    <p style="margin: 0 0 8px; color: #777; font-size: 13px;">
      Use the sidebar to explore each poster individually with Storybook controls,
      or scroll down to see all 8 running side by side.
    </p>

    <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;">
  `;

  return about;
}

function createPosterGrid(): { grid: HTMLElement; cleanups: (() => void)[] } {
  const cleanups: (() => void)[] = [];

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 0 8px 8px; max-width: 1400px; margin: 0 auto;';

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

  return { grid, cleanups };
}

const meta: Meta = {
  title: 'Overview/About',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const About: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'background: #222; min-height: 100vh;';

    wrapper.appendChild(createAboutSection());

    const { grid, cleanups } = createPosterGrid();
    wrapper.appendChild(grid);

    (wrapper as any).__cleanup = () => cleanups.forEach((fn) => fn());
    return wrapper;
  },
};

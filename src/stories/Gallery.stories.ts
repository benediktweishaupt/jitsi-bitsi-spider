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
  description: string;
  factory: PosterFactory;
  speakerIndex: number;
  config?: Record<string, unknown>;
}

const POSTERS: PosterEntry[] = [
  { label: 'TextExplosion', description: 'Speaker data wrapped in random HTML elements, accumulating on screen', factory: createTextExplosion, speakerIndex: 0 },
  { label: 'WordReveal', description: 'Word-by-word text reveal with parallax image', factory: createWordReveal, speakerIndex: 1 },
  { label: 'LetterGrid', description: 'Flex grid of letters with mutating sizes, colors, and border radii', factory: createLetterGrid, speakerIndex: 2, config: { animatedBackground: true, backgroundImage: 'img/nontsikelelo-mutiti/background.png', colors: [...PALETTES.monochrome] } },
  { label: 'LetterChase', description: 'Letters that follow the mouse cursor across a gradient canvas', factory: createLetterChase, speakerIndex: 3 },
  { label: 'ScreenFlicker', description: 'Rapid screen cycling with font and color switching', factory: createScreenFlicker, speakerIndex: 4 },
  { label: 'LetterScatter', description: 'Large scattered letterforms with optional blur and color burn', factory: createLetterScatter, speakerIndex: 6 },
  { label: 'PhysicsBlobs', description: 'Canvas-based blob physics with collision detection', factory: createPhysicsBlobs, speakerIndex: 10 },
  { label: 'StaticTypography', description: 'CSS-only typographic composition, no animation', factory: createStaticTypography, speakerIndex: 12 },
];

function createAboutSection(): HTMLElement {
  const about = document.createElement('div');
  about.style.cssText = 'max-width: 720px; margin: 0 auto; padding: 48px 24px 32px; font-family: system-ui, -apple-system, sans-serif; color: #ccc; line-height: 1.6;';

  const code = (text: string) => `<code style="background: #333; padding: 2px 6px; border-radius: 3px; font-size: 13px;">${text}</code>`;

  about.innerHTML = `
    <h1 style="font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 8px;">Jitsi Bitsi Spider</h1>
    <p style="font-size: 14px; color: #777; margin: 0 0 32px;">A component library of animated typographic poster patterns</p>

    <h2 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px;">What is this?</h2>
    <p style="margin: 0 0 16px;">
      A collection of 8 animated poster components. Each one takes structured speaker
      data &mdash; a name, date, caption, optional image &mdash; and turns it into a
      full-screen typographic animation. Same data in, different visual output.
    </p>

    <h2 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px;">How to use</h2>
    <p style="margin: 0 0 12px;">
      Every poster is a factory function with the same signature:
    </p>
    <pre style="background: #1a1a1a; border: 1px solid #333; border-radius: 4px; padding: 16px; margin: 0 0 16px; font-size: 13px; line-height: 1.5; overflow-x: auto; color: #ddd;">const cleanup = createLetterGrid(container, speaker, {
  colors: ['black', 'white'],
  speed: 1.5,
  intervals: { fast: 800, slow: 6000 },
});</pre>
    <p style="margin: 0 0 16px;">
      Pass a DOM container, a ${code('Speaker')} object, and optional
      ${code('PosterConfig')} overrides. The function builds the DOM, starts the
      animation, and returns a cleanup function that stops everything.
    </p>

    <h2 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px;">What you can configure</h2>
    <ul style="margin: 0 0 16px; padding-left: 20px;">
      <li style="margin-bottom: 6px;"><strong style="color: #fff;">Colors</strong> &mdash; color palette per poster (monochrome, primary, warm, or custom arrays)</li>
      <li style="margin-bottom: 6px;"><strong style="color: #fff;">Fonts</strong> &mdash; font stacks for posters that cycle typefaces (display, elegant)</li>
      <li style="margin-bottom: 6px;"><strong style="color: #fff;">Speed</strong> &mdash; global speed multiplier (0.25&ndash;4x)</li>
      <li style="margin-bottom: 6px;"><strong style="color: #fff;">Intervals</strong> &mdash; named timing values per poster (emit, flicker, scatter, reveal, ...)</li>
      <li style="margin-bottom: 6px;"><strong style="color: #fff;">Counts</strong> &mdash; blob count, chunk size, etc.</li>
      <li style="margin-bottom: 6px;"><strong style="color: #fff;">Ranges</strong> &mdash; font size range, blob radius range, etc.</li>
    </ul>
    <p style="margin: 0 0 16px;">
      Use the sidebar to explore each poster. Every story has Storybook controls that
      let you adjust these parameters in real time.
    </p>

    <h2 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px;">Technical details</h2>
    <p style="margin: 0 0 16px;">
      Vanilla TypeScript, zero runtime dependencies. Each poster is imperative DOM
      manipulation &mdash; no framework, no virtual DOM. All DOM queries are scoped
      to the container (never ${code('document')}), so multiple posters can coexist.
      Animations are managed by an ${code('IntervalManager')} that tracks intervals,
      timeouts, listeners, and rAF &mdash; calling ${code('cleanup()')} stops everything.
    </p>

    <p style="margin: 0 0 8px; color: #666; font-size: 13px;">
      Originally built for <em>Jitsi Bitsi Spider</em>, a lecture series at
      Kunsthochschule Weissensee initiated by Matthias Hubner (2020).
    </p>

    <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;">
  `;

  return about;
}

function createPosterGrid(): { section: HTMLElement; cleanups: (() => void)[] } {
  const cleanups: (() => void)[] = [];

  const section = document.createElement('div');
  section.style.cssText = 'max-width: 1400px; margin: 0 auto; padding: 0 8px 48px;';

  const heading = document.createElement('h2');
  heading.textContent = 'The 8 patterns';
  heading.style.cssText = 'font: 600 16px/1 system-ui, sans-serif; color: #fff; margin: 0 0 16px; padding: 0 4px;';
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;';
  section.appendChild(grid);

  POSTERS.forEach((entry) => {
    const cell = document.createElement('div');

    const posterContainer = document.createElement('div');
    posterContainer.style.cssText = 'width: 100%; aspect-ratio: 1; overflow: hidden;';

    const caption = document.createElement('div');
    caption.style.cssText = 'padding: 8px 0; font-family: system-ui, sans-serif;';
    caption.innerHTML = `
      <div style="font-size: 13px; font-weight: 600; color: #fff;">${entry.label}</div>
      <div style="font-size: 12px; color: #888; margin-top: 2px;">${entry.description}</div>
    `;

    cell.appendChild(posterContainer);
    cell.appendChild(caption);
    grid.appendChild(cell);

    const cleanup = entry.factory(posterContainer, speakers[entry.speakerIndex], entry.config);
    cleanups.push(cleanup);
  });

  return { section, cleanups };
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

    const { section, cleanups } = createPosterGrid();
    wrapper.appendChild(section);

    (wrapper as any).__cleanup = () => cleanups.forEach((fn) => fn());
    return wrapper;
  },
};

import type { Meta, StoryObj } from '@storybook/html';
import type { Speaker, PosterConfig } from '../types/speaker';
import type { Token } from '../types/layers';
import { speakers } from '../data/speakers';
import { extract, tokenize, sequence } from '../layers/content';
import { createElements, layout } from '../layers/layout';
import { drive } from '../layers/behavior';
import { IntervalManager, prefersReducedMotion } from '../utilities/animation';
import { changeFontSize, changeFlex, changeClass, changeBorderRadius, changeColorCss, changeFontColorCss, changeFontFamily, changeBoxRotation } from '../utilities/style-mutations';
import { getRandomItem, getRandomInt } from '../utilities/random';
import { PALETTES } from '../utilities/color-palettes';
import { FONTS } from '../utilities/font-stacks';
import { wrapInRandomElement } from '../utilities/text-transforms';
import { HTML_TAGS } from '../data/tags';

interface Args {
  speaker: Speaker;
  // Layer 1 — Content
  fields: string;
  tokenization: string;
  sequencing: string;
  // Layer 2 — Layout
  layoutStrategy: string;
  columns: number;
  elementTag: string;
  // Layer 3 — Behavior
  driverType: string;
  driverInterval: number;
  effect: string;
  // Style
  palette: string;
  fontStack: string;
  speed: number;
}

const PALETTE_MAP: Record<string, readonly string[]> = {
  monochrome: PALETTES.monochrome,
  primary: PALETTES.primary,
  warm: PALETTES.warm,
};

const FONT_MAP: Record<string, readonly string[]> = {
  display: FONTS.display,
  elegant: FONTS.elegant,
  system: ['system-ui', 'Arial', 'Helvetica'],
};

function buildTokens(args: Args): Token[] {
  const { speaker } = args;

  // Field selection
  const fieldMap: Record<string, Parameters<typeof extract>[1]> = {
    name: ['name'],
    caption: ['caption'],
    bio: ['bio'],
    date: ['date'],
    'name+bio': ['name', 'bio'],
    'name+caption': ['name', 'caption'],
    all: 'all',
  };
  let tokens = extract(speaker, fieldMap[args.fields] ?? 'all');

  // Tokenization
  const strategyMap: Record<string, Parameters<typeof tokenize>[1]> = {
    letter: 'letter',
    word: 'word',
    whole: 'whole',
    'chunk-3': { chunk: 3 },
    'chunk-5': { chunk: 5 },
  };
  tokens = tokenize(tokens, strategyMap[args.tokenization] ?? 'word');

  // Sequencing
  if (args.sequencing === 'repeat-3') {
    tokens = sequence(tokens, 'repeat', { times: 3 });
  } else if (args.sequencing === 'shuffle') {
    tokens = sequence(tokens, 'shuffle');
  } else if (args.sequencing === 'alternate-name') {
    const nameTokens = tokenize(extract(speaker, ['name']), 'letter');
    tokens = sequence(tokens, 'alternate', { with: nameTokens });
  }

  return tokens;
}

function buildPoster(args: Args): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('poster', 'playground');
  container.style.cssText = 'width: 100%; height: 100vh; overflow: hidden; position: relative; background: #111; color: #fff; font-family: system-ui;';

  const tokens = buildTokens(args);
  if (tokens.length === 0) {
    container.textContent = 'No tokens — try a different field or speaker.';
    return container;
  }

  const canvas = document.createElement('div');
  canvas.classList.add('playground__canvas');
  canvas.style.cssText = 'width: 100%; height: 100%; position: relative; overflow: hidden; container-type: size;';
  container.appendChild(canvas);

  // Layer 2 — create elements
  const tag = args.elementTag === 'random' ? { randomTag: HTML_TAGS as readonly string[] } : args.elementTag as 'div' | 'span' | 'p';
  const elements = createElements(tokens, tag, 'playground__token');

  // Apply base styles to elements
  const colors = [...(PALETTE_MAP[args.palette] ?? PALETTES.primary)];
  const fonts = [...(FONT_MAP[args.fontStack] ?? FONTS.display)];

  elements.forEach((el) => {
    el.style.padding = '4px 8px';
    el.style.color = getRandomItem(colors);
    el.style.fontFamily = getRandomItem(fonts);
  });

  // Layout
  const strat = args.layoutStrategy as Parameters<typeof layout>[2];
  layout(canvas, elements, strat, {
    columns: args.columns,
    rowClass: 'playground__row',
    layerClass: 'playground__layer',
    stackClass: 'playground__screen',
  });

  // Layer 3 — behavior
  if (!prefersReducedMotion() && args.driverType !== 'none') {
    const manager = new IntervalManager();
    const interval = args.driverInterval / (args.speed || 1);

    const effectFn = (target: HTMLElement) => {
      const sel = '.playground__token';
      switch (args.effect) {
        case 'mutate-font':
          changeFontSize(target, sel, 1, 20);
          changeFontFamily(target, sel, fonts);
          changeFontColorCss(target, sel, colors);
          break;
        case 'mutate-layout':
          changeFlex(target, sel, 200);
          changeBorderRadius(target, sel, ['0', '50%', '25%', '10px']);
          changeColorCss(target, sel, colors);
          break;
        case 'mutate-transform':
          changeBoxRotation(target, sel, -45, 45);
          changeFontSize(target, sel, 2, 15);
          break;
        case 'emit': {
          const token = tokens[getRandomInt(0, tokens.length - 1)];
          const el = document.createElement('div');
          el.classList.add('playground__token');
          el.style.color = getRandomItem(colors);
          el.style.fontFamily = getRandomItem(fonts);
          el.innerHTML = wrapInRandomElement(token.text, HTML_TAGS);
          canvas.insertBefore(el, canvas.firstChild);
          break;
        }
        case 'reposition':
          target.querySelectorAll<HTMLElement>(sel).forEach((el) => {
            el.style.position = 'absolute';
            el.style.left = `${getRandomInt(0, 90)}%`;
            el.style.top = `${getRandomInt(0, 90)}%`;
          });
          break;
        default:
          changeFontColorCss(target, sel, colors);
      }
    };

    if (args.driverType === 'timer') {
      drive(manager, canvas, { type: 'timer', interval }, effectFn);
    } else if (args.driverType === 'mouse') {
      drive(manager, canvas, { type: 'mouse', event: 'move' }, effectFn);
    } else if (args.driverType === 'scroll') {
      drive(manager, canvas, { type: 'scroll' }, effectFn);
    }

    manager.watchForRemoval(container);
    (container as any).__cleanup = () => manager.cleanup();
  }

  return container;
}

const meta: Meta<Args> = {
  title: 'Experimental/Playground',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    speaker: {
      control: 'select',
      options: speakers.map((s) => s.name),
      mapping: Object.fromEntries(speakers.map((s) => [s.name, s])),
    },
    fields: { control: 'select', options: ['name', 'caption', 'bio', 'date', 'name+bio', 'name+caption', 'all'] },
    tokenization: { control: 'select', options: ['letter', 'word', 'whole', 'chunk-3', 'chunk-5'] },
    sequencing: { control: 'select', options: ['none', 'repeat-3', 'shuffle', 'alternate-name'] },
    layoutStrategy: { control: 'select', options: ['flow', 'flex-grid', 'absolute-random', 'fullscreen-stack'] },
    columns: { control: { type: 'range', min: 2, max: 20, step: 1 } },
    elementTag: { control: 'select', options: ['div', 'span', 'p', 'random'] },
    driverType: { control: 'select', options: ['none', 'timer', 'mouse', 'scroll'] },
    driverInterval: { control: { type: 'range', min: 100, max: 5000, step: 100 } },
    effect: { control: 'select', options: ['mutate-font', 'mutate-layout', 'mutate-transform', 'emit', 'reposition'] },
    palette: { control: 'select', options: ['monochrome', 'primary', 'warm'] },
    fontStack: { control: 'select', options: ['display', 'elegant', 'system'] },
    speed: { control: { type: 'range', min: 0.25, max: 4, step: 0.25 } },
  },
  args: {
    speaker: speakers[0],
    fields: 'name',
    tokenization: 'letter',
    sequencing: 'none',
    layoutStrategy: 'flex-grid',
    columns: 6,
    elementTag: 'div',
    driverType: 'timer',
    driverInterval: 1000,
    effect: 'mutate-font',
    palette: 'primary',
    fontStack: 'display',
    speed: 1,
  },
  render: (args) => buildPoster(args),
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const LetterGridStyle: Story = {
  args: {
    fields: 'name',
    tokenization: 'letter',
    layoutStrategy: 'flex-grid',
    columns: 5,
    driverType: 'timer',
    driverInterval: 800,
    effect: 'mutate-layout',
    palette: 'monochrome',
  },
};

export const TextExplosionStyle: Story = {
  args: {
    fields: 'all',
    tokenization: 'word',
    layoutStrategy: 'flow',
    driverType: 'timer',
    driverInterval: 1200,
    effect: 'emit',
    elementTag: 'random',
  },
};

export const ScatteredLetters: Story = {
  args: {
    fields: 'name',
    tokenization: 'letter',
    layoutStrategy: 'absolute-random',
    driverType: 'timer',
    driverInterval: 1500,
    effect: 'reposition',
    palette: 'warm',
  },
};

export const FlickerStack: Story = {
  args: {
    fields: 'all',
    tokenization: 'word',
    sequencing: 'shuffle',
    layoutStrategy: 'fullscreen-stack',
    driverType: 'timer',
    driverInterval: 500,
    effect: 'mutate-font',
  },
};

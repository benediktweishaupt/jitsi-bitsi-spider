import type { Token } from '../../types/layers';
import { composePoster } from '../../layers/compose';
import { extract, sequence } from '../../layers/content';
import { changeFontFamily, changeFontColorCss, changeBoxShadow } from '../../utilities/style-mutations';
import { PALETTES } from '../../utilities/color-palettes';
import { FONTS } from '../../utilities/font-stacks';
import { formatDateAndTime } from '../../utilities/text-transforms';
import './screen-flicker.css';

const DEFAULT_FLICKER_INTERVAL = 500;

const SEL_SELECTED = '.screen-flicker__screen--selected';
const CLS_SELECTED = 'screen-flicker__screen--selected';

export const createScreenFlicker = composePoster({
  name: 'screen-flicker',

  content(speaker) {
    const { formattedDate, formattedTime } = formatDateAndTime(speaker.date, speaker.time);
    const caption = speaker.caption.en || speaker.caption.de;
    const captionWords = caption.split(' ');
    const captionChunks: Token[] = [];
    for (let i = 0; i < captionWords.length; i += 3) {
      captionChunks.push({ text: captionWords.slice(i, i + 3).join(' '), type: 'caption' });
    }

    const infoTokens: Token[] = [
      ...extract(speaker, ['meta']).slice(0, 1),
      { text: formattedDate || 'date tba', type: 'date' },
      { text: formattedTime || 'time tba', type: 'date' },
      ...captionChunks,
      { text: 'E n t e r', type: 'meta' },
    ];

    const nameTokens = sequence(
      extract(speaker, ['name']),
      'repeat',
      { times: infoTokens.length },
    );

    return sequence(infoTokens, 'alternate', { with: nameTokens });
  },

  render(container, tokens) {
    const stage = document.createElement('div');
    stage.classList.add('screen-flicker__stage');
    container.appendChild(stage);

    tokens.forEach((token, i) => {
      const screen = document.createElement('div');
      screen.classList.add('screen-flicker__screen');
      screen.dataset.screenIndex = String(i);
      screen.dataset.tokenType = token.type;
      screen.textContent = token.text;
      stage.appendChild(screen);
    });
  },

  staticFallback(container) {
    const first = container.querySelector('.screen-flicker__screen') as HTMLElement;
    if (first) first.classList.add(CLS_SELECTED);
  },

  animate(container, tokens, manager, config) {
    const speed = config.speed ?? 1;
    const flickerInterval = config.intervals?.flicker ?? DEFAULT_FLICKER_INTERVAL;
    const colors = config.colors ?? [...PALETTES.warm];
    const fonts = config.fonts ?? [...FONTS.display];
    const stage = container.querySelector('.screen-flicker__stage') as HTMLElement;

    let i = 0;

    manager.addInterval(() => {
      const prev = stage.querySelector(SEL_SELECTED);
      if (prev) prev.classList.remove(CLS_SELECTED);

      const idx = i % tokens.length;
      const active = stage.querySelector(`[data-screen-index="${idx}"]`) as HTMLElement;
      if (active) {
        active.classList.add(CLS_SELECTED);

        const textLen = active.textContent?.length || 1;
        const idealSize = Math.round((100 / (textLen ** 2)) * 20);

        if (i % 2 !== 1) {
          changeFontFamily(stage, SEL_SELECTED, fonts);
          changeBoxShadow(stage, SEL_SELECTED, colors);
        } else {
          active.style.fontSize = `${Math.max(idealSize, 2)}cqh`;
        }

        changeFontColorCss(stage, SEL_SELECTED, colors);
      }

      i++;
    }, flickerInterval / speed);
  },
});

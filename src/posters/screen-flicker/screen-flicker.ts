import type { PosterContext } from '../../utilities/poster-scaffold';
import { definePoster } from '../../utilities/poster-scaffold';
import { generateScreenTexts } from '../../utilities/text-transforms';
import { changeFontFamily, changeFontColorCss, changeBoxShadow } from '../../utilities/style-mutations';
import { PALETTES } from '../../utilities/color-palettes';
import { FONTS } from '../../utilities/font-stacks';
import './screen-flicker.css';

const INTERVAL_MS = 500;

const SEL_SELECTED = '.screen-flicker__screen--selected';
const CLS_SELECTED = 'screen-flicker__screen--selected';

export const createScreenFlicker = definePoster({
  name: 'screen-flicker',

  build({ container, speaker }: PosterContext) {
    const stage = document.createElement('div');
    stage.classList.add('screen-flicker__stage');
    container.appendChild(stage);

    const screenTexts = generateScreenTexts(speaker);

    screenTexts.forEach((text, i) => {
      const screen = document.createElement('div');
      screen.classList.add('screen-flicker__screen');
      screen.dataset.screenIndex = String(i);
      screen.textContent = text;
      stage.appendChild(screen);
    });
  },

  staticFallback({ container }: PosterContext) {
    const first = container.querySelector('.screen-flicker__screen') as HTMLElement;
    if (first) first.classList.add(CLS_SELECTED);
  },

  animate({ container, speaker, config }: PosterContext, manager) {
    const speed = config.speed ?? 1;
    const colors = config.colors ?? [...PALETTES.warm];
    const fonts = config.fonts ?? [...FONTS.display];
    const stage = container.querySelector('.screen-flicker__stage') as HTMLElement;
    const screenTexts = generateScreenTexts(speaker);

    let i = 0;

    manager.addInterval(() => {
      const prev = stage.querySelector(SEL_SELECTED);
      if (prev) prev.classList.remove(CLS_SELECTED);

      const idx = i % screenTexts.length;
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
    }, INTERVAL_MS / speed);
  },
});

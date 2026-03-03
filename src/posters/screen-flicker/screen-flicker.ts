import type { Speaker, PosterConfig, Cleanup } from '../../types/speaker';
import { IntervalManager, prefersReducedMotion } from '../../utilities/animation';
import { generateScreenTexts } from '../../utilities/text-transforms';
import { changeFontFamily, changeFontColorCss, changeBoxShadow } from '../../utilities/style-mutations';
import { PALETTES } from '../../utilities/color-palettes';
import { FONTS } from '../../utilities/font-stacks';
import './screen-flicker.css';

const INTERVAL_MS = 500;

export function createScreenFlicker(
  container: HTMLElement,
  speaker: Speaker,
  config?: PosterConfig,
): Cleanup {
  const manager = new IntervalManager();
  const speed = config?.speed ?? 1;
  const colors = config?.colors ?? [...PALETTES.warm];
  const fonts = config?.fonts ?? [...FONTS.display];

  container.classList.add('poster', 'screen-flicker');

  const stage = document.createElement('div');
  stage.classList.add('screen-flicker__stage');
  container.appendChild(stage);

  // Generate screens from speaker data
  const screenTexts = generateScreenTexts(speaker);

  screenTexts.forEach((text, i) => {
    const screen = document.createElement('div');
    screen.classList.add('screen-flicker__screen');
    screen.dataset.screenIndex = String(i);
    screen.textContent = text;
    stage.appendChild(screen);
  });

  const SEL_SELECTED = '.screen-flicker__screen--selected';
  const CLS_SELECTED = 'screen-flicker__screen--selected';

  // Static fallback
  if (prefersReducedMotion() && config?.reduceMotion !== false) {
    const first = stage.querySelector('.screen-flicker__screen') as HTMLElement;
    if (first) first.classList.add(CLS_SELECTED);
    return () => manager.cleanup();
  }

  let i = 0;

  manager.addInterval(() => {
    // Remove previous selection
    const prev = stage.querySelector(SEL_SELECTED);
    if (prev) prev.classList.remove(CLS_SELECTED);

    // Select next screen
    const idx = i % screenTexts.length;
    const active = stage.querySelector(`[data-screen-index="${idx}"]`) as HTMLElement;
    if (active) {
      active.classList.add(CLS_SELECTED);

      // Adjust font size based on text length
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

  manager.watchForRemoval(container);
  return () => manager.cleanup();
}

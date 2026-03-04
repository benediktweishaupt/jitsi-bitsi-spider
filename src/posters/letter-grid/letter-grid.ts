import { composePoster } from '../../layers/compose';
import { extract, tokenize } from '../../layers/content';
import { createElements, layout } from '../../layers/layout';
import { changeFlex, changeFontSize, changeClass, changeBorderRadius } from '../../utilities/style-mutations';
import { cssGradients } from '../../utilities/gradients';
import { PALETTES } from '../../utilities/color-palettes';
import './letter-grid.css';

const LETTER_CLASSES = ['letter-grid__letter--black', 'letter-grid__letter--white'] as const;
const DEFAULT_BORDER_RADIUS = ['25cqw', '25cqw', '25cqw', '100cqw', '50px', '10cqw', '20cqw', '10cqw', '0'];
const DEFAULT_FAST_INTERVAL = 1000;
const DEFAULT_SLOW_INTERVAL = 8000;

export const createLetterGrid = composePoster({
  name: 'letter-grid',

  content(speaker) {
    return tokenize(extract(speaker, ['name']), 'letter');
  },

  render(container, tokens, config) {
    const canvas = document.createElement('div');
    canvas.classList.add('letter-grid__canvas');
    if (config.animatedBackground) {
      canvas.classList.add('letter-grid__canvas--animated-bg');
    }
    if (config.backgroundImage) {
      canvas.style.backgroundImage = `url(${config.backgroundImage})`;
    }
    container.appendChild(canvas);

    const columns = config.counts?.chunkSize ?? Math.ceil(tokens.length / 3);
    const elements = createElements(tokens, 'div', 'letter-grid__letter');
    elements.forEach((el) => el.classList.add('letter-grid__letter--black'));

    layout(canvas, elements, 'flex-grid', { columns, rowClass: 'letter-grid__row' });
  },

  animate(container, _tokens, manager, config) {
    const speed = config.speed ?? 1;
    const fastInterval = config.intervals?.fast ?? DEFAULT_FAST_INTERVAL;
    const slowInterval = config.intervals?.slow ?? DEFAULT_SLOW_INTERVAL;
    const colors = config.colors ?? [...PALETTES.monochrome];
    const borderRadiusOptions = config.borderRadiusOptions ?? DEFAULT_BORDER_RADIUS;
    const [fontMin, fontMax] = config.ranges?.fontSize ?? [1, 40];

    const SEL_LETTER = '.letter-grid__letter';
    const SEL_ROW = '.letter-grid__row';

    manager.addInterval(() => {
      changeFlex(container, SEL_LETTER, 200);
      changeFlex(container, SEL_ROW, 100);
      changeClass(container, SEL_LETTER, [...LETTER_CLASSES], [...LETTER_CLASSES]);
      cssGradients(container, SEL_LETTER, colors);
    }, fastInterval / speed);

    manager.addInterval(() => {
      changeFontSize(container, SEL_LETTER, fontMin, fontMax);
      changeBorderRadius(container, SEL_LETTER, borderRadiusOptions);
    }, slowInterval / speed);
  },
});

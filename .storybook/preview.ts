import '../src/css/reset.css';
import '../src/css/base.css';

import type { Preview } from '@storybook/html';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Overview', 'Posters'],
      },
    },
  },
  decorators: [
    (storyFn) => {
      // Clean up previous poster if it exists
      const prev = document.querySelector('[data-poster-active]');
      if (prev && (prev as any).__cleanup) {
        (prev as any).__cleanup();
        prev.removeAttribute('data-poster-active');
      }

      const result = storyFn();
      if (result instanceof HTMLElement) {
        result.setAttribute('data-poster-active', 'true');
      }
      return result;
    },
  ],
};

export default preview;

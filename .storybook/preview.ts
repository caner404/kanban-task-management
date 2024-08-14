import type { Preview } from '@storybook/react';

import '../src/index.css';

import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'iphone14promax',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

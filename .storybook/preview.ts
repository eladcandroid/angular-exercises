import type { Preview } from '@storybook/angular'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      const storyResult = story();
      return {
        ...storyResult,
        template: `<div dir="rtl" style="padding: 1rem;">${storyResult.template || ''}</div>`,
      };
    },
  ],
};

export default preview;
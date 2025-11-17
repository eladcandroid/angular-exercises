import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { BookCardComponent } from './book-card';
import { MOCK_BOOKS } from '../mock-data';

const meta: Meta<BookCardComponent> = {
  title: 'Library/BookCard',
  component: BookCardComponent,
  tags: ['autodocs'],
  argTypes: {
    book: { control: 'object' },
    showActions: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
  args: {
    loanRequested: fn(),
  },
};

export default meta;
type Story = StoryObj<BookCardComponent>;

export const Default: Story = {
  args: {
    book: MOCK_BOOKS[0],
    showActions: true,
    compact: false,
  },
};

export const Unavailable: Story = {
  args: {
    book: MOCK_BOOKS[2],
    showActions: true,
    compact: false,
  },
};

export const WithoutActions: Story = {
  args: {
    book: MOCK_BOOKS[0],
    showActions: false,
    compact: false,
  },
};

export const Compact: Story = {
  args: {
    book: MOCK_BOOKS[3],
    showActions: true,
    compact: true,
  },
};

export const HighRating: Story = {
  args: {
    book: MOCK_BOOKS[6],
    showActions: true,
    compact: false,
  },
};

// Bonus: Accessibility Testing
export const AccessibilityTest: Story = {
  args: {
    book: MOCK_BOOKS[0],
    showActions: true,
    compact: false,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },
  },
};

// Bonus: Responsive Mobile View
export const MobileView: Story = {
  args: {
    book: MOCK_BOOKS[0],
    showActions: true,
    compact: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Bonus: Responsive Tablet View
export const TabletView: Story = {
  args: {
    book: MOCK_BOOKS[3],
    showActions: true,
    compact: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { BookFilterComponent } from './book-filter';
import { MOCK_CATEGORIES } from '../mock-data';

const meta: Meta<BookFilterComponent> = {
  title: 'Library/BookFilter',
  component: BookFilterComponent,
  tags: ['autodocs'],
  argTypes: {
    categories: { control: 'object' },
    selectedCategory: { control: 'text' },
    searchQuery: { control: 'text' },
  },
  args: {
    filterChange: fn(),
  },
};

export default meta;
type Story = StoryObj<BookFilterComponent>;

export const Default: Story = {
  args: {
    categories: MOCK_CATEGORIES,
    selectedCategory: '',
    searchQuery: '',
  },
};

export const WithCategorySelected: Story = {
  args: {
    categories: MOCK_CATEGORIES,
    selectedCategory: 'פנטזיה',
    searchQuery: '',
  },
};

export const WithSearchQuery: Story = {
  args: {
    categories: MOCK_CATEGORIES,
    selectedCategory: '',
    searchQuery: 'הארי פוטר',
  },
};

export const AllFiltersActive: Story = {
  args: {
    categories: MOCK_CATEGORIES,
    selectedCategory: 'מדע בדיוני',
    searchQuery: 'גלקסיה',
  },
};

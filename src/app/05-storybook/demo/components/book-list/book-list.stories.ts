import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { BookListComponent } from './book-list';
import { MOCK_BOOKS, createMockBooks } from '../mock-data';

const meta: Meta<BookListComponent> = {
  title: 'Library/BookList',
  component: BookListComponent,
  tags: ['autodocs'],
  argTypes: {
    books: { control: 'object' },
    layout: { control: 'radio', options: ['grid', 'list'] },
    loading: { control: 'boolean' },
  },
  args: {
    bookSelected: fn(),
    loanRequested: fn(),
  },
};

export default meta;
type Story = StoryObj<BookListComponent>;

export const GridLayout: Story = {
  args: {
    books: MOCK_BOOKS.slice(0, 6),
    layout: 'grid',
    loading: false,
  },
};

export const ListLayout: Story = {
  args: {
    books: MOCK_BOOKS.slice(0, 6),
    layout: 'list',
    loading: false,
  },
};

export const LoadingState: Story = {
  args: {
    books: MOCK_BOOKS.slice(0, 6),
    layout: 'grid',
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    books: [],
    layout: 'grid',
    loading: false,
  },
};

export const SingleBook: Story = {
  args: {
    books: [MOCK_BOOKS[0]],
    layout: 'grid',
    loading: false,
  },
};

export const ManyBooks: Story = {
  args: {
    books: createMockBooks(20),
    layout: 'grid',
    loading: false,
  },
};

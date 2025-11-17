import type { Meta, StoryObj } from '@storybook/angular';
import { LoanStatsComponent } from './loan-stats';
import { MOCK_LOAN_STATS, MOCK_BOOKS } from '../mock-data';

const meta: Meta<LoanStatsComponent> = {
  title: 'Library/LoanStats',
  component: LoanStatsComponent,
  tags: ['autodocs'],
  argTypes: {
    stats: { control: 'object' },
    showPopularBooks: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<LoanStatsComponent>;

export const NormalStats: Story = {
  args: {
    stats: MOCK_LOAN_STATS,
    showPopularBooks: true,
  },
};

export const ZeroStats: Story = {
  args: {
    stats: {
      totalLoans: 0,
      activeLoans: 0,
      overdueLoans: 0,
      returnedLoans: 0,
      popularBooks: [],
    },
    showPopularBooks: true,
  },
};

export const HighOverdue: Story = {
  args: {
    stats: {
      totalLoans: 100,
      activeLoans: 40,
      overdueLoans: 15,
      returnedLoans: 60,
      popularBooks: MOCK_BOOKS.slice(0, 3),
    },
    showPopularBooks: true,
  },
};

export const WithoutPopularBooks: Story = {
  args: {
    stats: MOCK_LOAN_STATS,
    showPopularBooks: false,
  },
};

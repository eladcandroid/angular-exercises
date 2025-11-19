import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import { BookFilterComponent } from './book-filter/book-filter';
import { BookListComponent } from './book-list/book-list';
import { LoanStatsComponent } from './loan-stats/loan-stats';
import { MOCK_BOOKS, MOCK_CATEGORIES, MOCK_LOAN_STATS } from './mock-data';

// Bonus: Component Composition Story
const meta: Meta = {
  title: 'Library/System Composition',
  decorators: [
    moduleMetadata({
      imports: [BookFilterComponent, BookListComponent, LoanStatsComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CompleteLibrarySystem: Story = {
  render: (args) => ({
    props: {
      // State signals
      books: signal(MOCK_BOOKS),
      categories: signal(MOCK_CATEGORIES),
      stats: signal(MOCK_LOAN_STATS),
      selectedCategory: signal(''),
      searchQuery: signal(''),

      // Actions
      onFilterChange: fn(),
      onBookSelected: fn(),
      onLoanRequested: fn(),
    },
    template: `
      <div dir="rtl" style="padding: 2rem; background: #f7fafc; min-height: 100vh;">
        <h1 style="text-align: center; color: #2d3748; margin-bottom: 2rem;">
          📚 מערכת ניהול ספרייה
        </h1>

        <!-- Statistics Panel -->
        <app-loan-stats
          [stats]="stats()"
          [showPopularBooks]="true"
          style="display: block; margin-bottom: 2rem;"
        />

        <!-- Filter Component -->
        <app-book-filter
          [categories]="categories()"
          [(selectedCategory)]="selectedCategory"
          [(searchQuery)]="searchQuery"
          (filterChange)="onFilterChange()"
          style="display: block; margin-bottom: 2rem;"
        />

        <!-- Book List -->
        <app-book-list
          [books]="books()"
          [layout]="'grid'"
          [loading]="false"
          (bookSelected)="onBookSelected($event)"
          (loanRequested)="onLoanRequested($event)"
        />
      </div>
    `,
  }),
};

export const WithFiltersApplied: Story = {
  render: (args) => ({
    props: {
      books: signal(MOCK_BOOKS.filter(b => b.category === 'פנטזיה')),
      categories: signal(MOCK_CATEGORIES),
      stats: signal(MOCK_LOAN_STATS),
      selectedCategory: signal('פנטזיה'),
      searchQuery: signal(''),
      onFilterChange: fn(),
      onBookSelected: fn(),
      onLoanRequested: fn(),
    },
    template: `
      <div dir="rtl" style="padding: 2rem; background: #f7fafc; min-height: 100vh;">
        <h1 style="text-align: center; color: #2d3748; margin-bottom: 2rem;">
          📚 מערכת ניהול ספרייה - סינון פעיל
        </h1>

        <app-loan-stats
          [stats]="stats()"
          [showPopularBooks]="true"
          style="display: block; margin-bottom: 2rem;"
        />

        <app-book-filter
          [categories]="categories()"
          [(selectedCategory)]="selectedCategory"
          [(searchQuery)]="searchQuery"
          (filterChange)="onFilterChange()"
          style="display: block; margin-bottom: 2rem;"
        />

        <app-book-list
          [books]="books()"
          [layout]="'grid'"
          [loading]="false"
          (bookSelected)="onBookSelected($event)"
          (loanRequested)="onLoanRequested($event)"
        />
      </div>
    `,
  }),
};

export const EmptyLibraryState: Story = {
  render: (args) => ({
    props: {
      books: signal([]),
      categories: signal(MOCK_CATEGORIES),
      stats: signal({
        totalLoans: 0,
        activeLoans: 0,
        overdueLoans: 0,
        returnedLoans: 0,
        popularBooks: [],
      }),
      selectedCategory: signal(''),
      searchQuery: signal(''),
      onFilterChange: fn(),
      onBookSelected: fn(),
      onLoanRequested: fn(),
    },
    template: `
      <div dir="rtl" style="padding: 2rem; background: #f7fafc; min-height: 100vh;">
        <h1 style="text-align: center; color: #2d3748; margin-bottom: 2rem;">
          📚 מערכת ניהול ספרייה - ריקה
        </h1>

        <app-loan-stats
          [stats]="stats()"
          [showPopularBooks]="true"
          style="display: block; margin-bottom: 2rem;"
        />

        <app-book-filter
          [categories]="categories()"
          [(selectedCategory)]="selectedCategory"
          [(searchQuery)]="searchQuery"
          (filterChange)="onFilterChange()"
          style="display: block; margin-bottom: 2rem;"
        />

        <app-book-list
          [books]="books()"
          [layout]="'grid'"
          [loading]="false"
          (bookSelected)="onBookSelected($event)"
          (loanRequested)="onLoanRequested($event)"
        />
      </div>
    `,
  }),
};

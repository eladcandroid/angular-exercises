import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { Book, BookCategory, LoanStats, BorrowerInfo } from '../../shared/models/library.models';
import { BookCardComponent } from './components/book-card/book-card';
import { BookFilterComponent } from './components/book-filter/book-filter';
import { LoanFormComponent } from './components/loan-form/loan-form';
import { BookListComponent } from './components/book-list/book-list';
import { LoanStatsComponent } from './components/loan-stats/loan-stats';
import { MOCK_BOOKS, MOCK_CATEGORIES, createMockLoanStats } from './components/mock-data';

@Component({
  selector: 'app-storybook-demo',
  imports: [
    BookCardComponent,
    BookFilterComponent,
    LoanFormComponent,
    BookListComponent,
    LoanStatsComponent,
  ],
  templateUrl: './storybook-demo.html',
  styleUrl: './storybook-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookDemoComponent {
  // State
  books = signal<Book[]>(MOCK_BOOKS);
  categories = signal<BookCategory[]>(MOCK_CATEGORIES);
  selectedCategory = signal<BookCategory | ''>('');
  searchQuery = signal('');
  selectedBook = signal<Book | null>(null);
  showLoanForm = signal(false);
  layout = signal<'grid' | 'list'>('grid');

  // Computed
  filteredBooks = computed(() => {
    let result = this.books();

    // Filter by category
    const category = this.selectedCategory();
    if (category) {
      result = result.filter(book => book.category === category);
    }

    // Filter by search query
    const query = this.searchQuery().toLowerCase();
    if (query) {
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    return result;
  });

  stats = computed((): LoanStats => {
    const total = this.books().length * 5; // Assume each book loaned 5 times on average
    return createMockLoanStats(total, 0.05);
  });

  // Methods
  onBookSelected(book: Book): void {
    this.selectedBook.set(book);
  }

  onLoanRequested(book: Book): void {
    this.selectedBook.set(book);
    this.showLoanForm.set(true);
  }

  onLoanSubmit(borrowerInfo: BorrowerInfo): void {
    console.log('Loan submitted:', {
      book: this.selectedBook(),
      borrower: borrowerInfo,
    });

    // Close form after success
    setTimeout(() => {
      this.showLoanForm.set(false);
      this.selectedBook.set(null);
    }, 2000);
  }

  onLoanCancel(): void {
    this.showLoanForm.set(false);
    this.selectedBook.set(null);
  }

  toggleLayout(): void {
    this.layout.update(l => (l === 'grid' ? 'list' : 'grid'));
  }
}

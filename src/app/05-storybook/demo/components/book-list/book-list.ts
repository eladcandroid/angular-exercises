import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../models/library.models';
import { BookCardComponent } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  // Inputs
  books = input.required<Book[]>();
  layout = input<'grid' | 'list'>('grid');
  loading = input(false);

  // Outputs
  bookSelected = output<Book>();
  loanRequested = output<Book>();

  onBookSelected(book: Book): void {
    this.bookSelected.emit(book);
  }

  onLoanRequested(book: Book): void {
    this.loanRequested.emit(book);
  }

  get isEmpty(): boolean {
    return this.books().length === 0;
  }
}

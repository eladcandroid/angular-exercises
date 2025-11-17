import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../../../shared/models/library.models';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  // Inputs
  book = input.required<Book>();
  showActions = input(true);
  compact = input(false);

  // Outputs
  loanRequested = output<Book>();

  onLoanClick(): void {
    if (this.book().available) {
      this.loanRequested.emit(this.book());
    }
  }

  getRatingStars(): string {
    const rating = this.book().rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    return stars;
  }
}

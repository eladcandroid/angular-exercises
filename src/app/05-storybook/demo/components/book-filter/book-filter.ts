import { Component, input, model, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookCategory } from '../../models/library.models';

@Component({
  selector: 'app-book-filter',
  imports: [FormsModule],
  templateUrl: './book-filter.html',
  styleUrl: './book-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFilterComponent {
  // Inputs
  categories = input.required<BookCategory[]>();

  // Two-way binding models
  selectedCategory = model<BookCategory | ''>('');
  searchQuery = model('');

  // Outputs
  filterChange = output<void>();

  onCategoryChange(): void {
    this.filterChange.emit();
  }

  onSearchChange(): void {
    this.filterChange.emit();
  }

  clearFilters(): void {
    this.selectedCategory.set('');
    this.searchQuery.set('');
    this.filterChange.emit();
  }

  hasActiveFilters(): boolean {
    return this.selectedCategory() !== '' || this.searchQuery() !== '';
  }
}

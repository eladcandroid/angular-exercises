import { Component, ChangeDetectionStrategy, model, input, computed } from '@angular/core';
import { FilterType, TaskStats } from '../../../../shared/models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
})
export class FilterBarComponent {
  // Two-way binding models
  filterType = model.required<FilterType>();
  searchQuery = model.required<string>();
  selectedCategory = model.required<string | null>();

  // Inputs
  categories = input.required<string[]>();
  stats = input.required<TaskStats>();

  // Computed signal
  hasActiveFilters = computed(() => {
    return this.searchQuery().trim().length > 0 || this.selectedCategory() !== null;
  });

  onFilterChange(filter: FilterType) {
    this.filterType.set(filter);
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value === '' ? null : value);
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set(null);
    this.filterType.set('all');
  }
}

import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { LoanStats } from '../../../../shared/models/library.models';

@Component({
  selector: 'app-loan-stats',
  templateUrl: './loan-stats.html',
  styleUrl: './loan-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanStatsComponent {
  // Inputs
  stats = input.required<LoanStats>();
  showPopularBooks = input(true);

  // Computed
  completionPercentage = computed(() => {
    const total = this.stats().totalLoans;
    if (total === 0) return 0;
    return Math.round((this.stats().returnedLoans / total) * 100);
  });

  overduePercentage = computed(() => {
    const active = this.stats().activeLoans;
    if (active === 0) return 0;
    return Math.round((this.stats().overdueLoans / active) * 100);
  });

  isOverdueWarning = computed(() => {
    return this.overduePercentage() > 20;
  });

  isEmpty = computed(() => {
    return this.stats().totalLoans === 0;
  });
}

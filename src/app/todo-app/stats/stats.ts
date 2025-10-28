import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { TaskStats } from '../../models/task.model';

@Component({
  selector: 'app-stats',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class StatsComponent {
  // Input
  stats = input.required<TaskStats>();

  // Computed signals
  completionColor = computed(() => {
    const rate = this.stats().completionRate;
    if (rate >= 75) return 'high';
    if (rate >= 50) return 'medium';
    if (rate >= 25) return 'low';
    return 'none';
  });

  displayStats = computed(() => {
    const stats = this.stats();
    return [
      {
        label: 'Total Tasks',
        value: stats.total,
        icon: '📋',
        color: 'blue'
      },
      {
        label: 'Active',
        value: stats.active,
        icon: '🔄',
        color: 'orange'
      },
      {
        label: 'Completed',
        value: stats.completed,
        icon: '✅',
        color: 'green'
      },
      {
        label: 'Completion Rate',
        value: `${stats.completionRate.toFixed(1)}%`,
        icon: '📊',
        color: this.completionColor()
      }
    ];
  });
}

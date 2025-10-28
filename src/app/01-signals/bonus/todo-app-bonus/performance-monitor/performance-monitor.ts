import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { PerformanceMetrics } from '../../../../shared/models/performance.model';

@Component({
  selector: 'app-performance-monitor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './performance-monitor.html',
  styleUrl: './performance-monitor.scss',
})
export class PerformanceMonitorComponent {
  metrics = input.required<PerformanceMetrics>();

  // Computed values for display
  computationTimeFormatted = computed(() => {
    const time = this.metrics().filterComputationTime;
    return time < 1 ? `${(time * 1000).toFixed(2)}μs` : `${time.toFixed(2)}ms`;
  });

  averageTimeFormatted = computed(() => {
    const time = this.metrics().averageTime;
    return time < 1 ? `${(time * 1000).toFixed(2)}μs` : `${time.toFixed(2)}ms`;
  });

  performanceColor = computed(() => {
    const time = this.metrics().filterComputationTime;
    if (time < 1) return 'excellent';
    if (time < 5) return 'good';
    if (time < 10) return 'fair';
    return 'poor';
  });

  performanceLabel = computed(() => {
    const color = this.performanceColor();
    switch (color) {
      case 'excellent':
        return 'מצוין';
      case 'good':
        return 'טוב';
      case 'fair':
        return 'סביר';
      case 'poor':
        return 'איטי';
      default:
        return '';
    }
  });

  performanceBarWidth = computed(() => {
    const time = this.metrics().filterComputationTime;
    // Map 0-20ms to 0-100%
    const percentage = Math.min((time / 20) * 100, 100);
    return `${percentage}%`;
  });
}

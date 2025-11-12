import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface AnalyticsData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-product-analytics',
  templateUrl: './product-analytics.html',
  styleUrl: './product-analytics.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAnalyticsComponent {
  protected readonly views = signal(15234);
  protected readonly purchases = signal(892);
  protected readonly stockLevel = signal(47);
  protected readonly conversionRate = signal(5.85);

  protected readonly monthlyData = signal<AnalyticsData[]>([
    { label: 'ינואר', value: 120, color: '#1976d2' },
    { label: 'פברואר', value: 95, color: '#2196f3' },
    { label: 'מרץ', value: 140, color: '#03a9f4' },
    { label: 'אפריל', value: 110, color: '#00bcd4' },
    { label: 'מאי', value: 160, color: '#009688' },
    { label: 'יוני', value: 135, color: '#4caf50' }
  ]);

  protected getBarHeight(value: number): number {
    const maxValue = Math.max(...this.monthlyData().map(d => d.value));
    return (value / maxValue) * 100;
  }
}

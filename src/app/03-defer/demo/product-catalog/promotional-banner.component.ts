import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-promotional-banner',
  templateUrl: './promotional-banner.component.html',
  styleUrl: './promotional-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionalBannerComponent {
  protected readonly isVisible = signal(true);
  protected readonly couponCode = signal('DEFER2024');
  protected readonly discountPercent = signal(15);

  protected closeBanner(): void {
    this.isVisible.set(false);
  }
}

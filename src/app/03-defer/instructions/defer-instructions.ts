import { Component, ChangeDetectionStrategy, AfterViewInit, signal } from '@angular/core';
import { CopyCodeDirective } from '../../shared/directives/copy-code.directive';

declare const Prism: any;

@Component({
  selector: 'app-defer-instructions',
  imports: [CopyCodeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './defer-instructions.html',
  styleUrl: './defer-instructions.scss',
})
export class DeferInstructionsComponent implements AfterViewInit {
  showProductListCode = signal(false);
  showProductDetailsCode = signal(false);
  showProductReviewsCode = signal(false);
  showRelatedProductsCode = signal(false);
  showProductAnalyticsCode = signal(false);
  showPromotionalBannerCode = signal(false);

  toggleProductListCode() {
    this.showProductListCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  toggleProductDetailsCode() {
    this.showProductDetailsCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  toggleProductReviewsCode() {
    this.showProductReviewsCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  toggleRelatedProductsCode() {
    this.showRelatedProductsCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  toggleProductAnalyticsCode() {
    this.showProductAnalyticsCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  togglePromotionalBannerCode() {
    this.showPromotionalBannerCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  ngAfterViewInit() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}

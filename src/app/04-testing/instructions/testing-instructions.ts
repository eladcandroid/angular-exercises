import { Component, ChangeDetectionStrategy, AfterViewInit, signal } from '@angular/core';

declare const Prism: any;

@Component({
  selector: 'app-testing-instructions',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testing-instructions.html',
  styleUrl: './testing-instructions.scss',
})
export class TestingInstructionsComponent implements AfterViewInit {
  showProductListCode = signal(false);
  showShoppingCartCode = signal(false);

  toggleProductListCode() {
    this.showProductListCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  toggleShoppingCartCode() {
    this.showShoppingCartCode.update(v => !v);
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

import { Component, ChangeDetectionStrategy, AfterViewInit, signal } from '@angular/core';
import { CopyCodeDirective } from '../../shared/directives/copy-code.directive';

declare const Prism: any;

@Component({
  selector: 'app-storybook-instructions',
  imports: [CopyCodeDirective],
  templateUrl: './storybook-instructions.html',
  styleUrl: './storybook-instructions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookInstructionsComponent implements AfterViewInit {
  // Signals for collapsible code sections
  protected showBookModelsCode = signal(false);
  protected showBookCardCode = signal(false);
  protected showBookFilterCode = signal(false);
  protected showLoanFormCode = signal(false);
  protected showBookListCode = signal(false);
  protected showLoanStatsCode = signal(false);

  // Toggle functions
  protected toggleBookModelsCode(): void {
    this.showBookModelsCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  protected toggleBookCardCode(): void {
    this.showBookCardCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  protected toggleBookFilterCode(): void {
    this.showBookFilterCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  protected toggleLoanFormCode(): void {
    this.showLoanFormCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  protected toggleBookListCode(): void {
    this.showBookListCode.update(v => !v);
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  protected toggleLoanStatsCode(): void {
    this.showLoanStatsCode.update(v => !v);
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

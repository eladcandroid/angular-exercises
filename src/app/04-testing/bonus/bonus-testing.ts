import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

declare const Prism: any;

@Component({
  selector: 'app-bonus-testing',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bonus-testing.html',
  styleUrl: './bonus-testing.scss',
})
export class BonusTestingComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}

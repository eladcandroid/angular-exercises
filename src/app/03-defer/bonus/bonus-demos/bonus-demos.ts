import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateRefDemoComponent } from './template-ref-demo';
import { MultipleTriggersDemoComponent } from './multiple-triggers-demo';
import { NestedDeferDemoComponent } from './nested-defer-demo';
import { PerformanceMonitoringComponent } from './performance-monitoring';
import { ConditionalPrefetchComponent } from './conditional-prefetch';
import { BundleAnalysisComponent } from './bundle-analysis';

@Component({
  selector: 'app-bonus-demos',
  imports: [
    TemplateRefDemoComponent,
    MultipleTriggersDemoComponent,
    NestedDeferDemoComponent,
    PerformanceMonitoringComponent,
    ConditionalPrefetchComponent,
    BundleAnalysisComponent
  ],
  templateUrl: './bonus-demos.html',
  styleUrl: './bonus-demos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BonusDemosComponent {}

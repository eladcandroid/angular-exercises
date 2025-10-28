import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateRefDemoComponent } from './template-ref-demo.component';
import { MultipleTriggersDemoComponent } from './multiple-triggers-demo.component';
import { NestedDeferDemoComponent } from './nested-defer-demo.component';
import { PerformanceMonitoringComponent } from './performance-monitoring.component';
import { ConditionalPrefetchComponent } from './conditional-prefetch.component';
import { BundleAnalysisComponent } from './bundle-analysis.component';

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
  templateUrl: './bonus-demos.component.html',
  styleUrl: './bonus-demos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BonusDemosComponent {}

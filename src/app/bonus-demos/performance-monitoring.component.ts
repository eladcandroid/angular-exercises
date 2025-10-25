import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { HeavyComponent } from './heavy.component';

@Component({
  selector: 'app-performance-monitoring',
  imports: [HeavyComponent],
  template: `
    <section class="demo-section">
      <h2>בונוס 4: Performance Monitoring</h2>
      <p class="description">מדידת זמן טעינה בזמן אמת של קומפוננטות נדחות</p>

      <div class="monitoring-area">
        @defer (on viewport) {
          <app-heavy-component />
          <p class="load-complete">הקומפוננטה נטענה!</p>
        } @placeholder {
          <div class="placeholder">
            <p>גלול/י למטה למדידת זמן הטעינה...</p>
          </div>
        } @loading {
          <div class="loading-monitor">
            <div class="spinner"></div>
            <p>טוען קומפוננטה...</p>
          </div>
        }
      </div>

      <div class="info-panel">
        <p><strong>💡 שימו לב:</strong> קומפוננטה זו נטענת עם טעינה נדחית ויוצרת bundle נפרד. בפרויקט אמיתי ניתן להוסיף מדידת performance עם performance.now()</p>
      </div>
    </section>
  `,
  styles: [`
    .demo-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-top: 4px solid #00bcd4;
    }
    h2 { color: #1976d2; margin-bottom: 1rem; }
    .description { color: #616161; margin-bottom: 2rem; line-height: 1.6; }
    .monitoring-area { min-height: 200px; }
    .placeholder {
      background: #f5f5f5;
      padding: 3rem;
      text-align: center;
      border-radius: 8px;
      border: 2px dashed #bdbdbd;
    }
    .loading-monitor {
      background: #fff3e0;
      padding: 3rem;
      text-align: center;
      border-radius: 8px;
      border: 2px solid #ff9800;
    }
    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 1rem;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #ff9800;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .loading-time {
      color: #e65100;
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 0.5rem;
    }
    .results {
      background: #e8f5e9;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 2rem;
      border: 2px solid #4caf50;
    }
    .results h4 {
      color: #2e7d32;
      margin: 0 0 1rem 0;
    }
    .metric {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: white;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    .metric .label {
      color: #424242;
      font-weight: 600;
    }
    .metric .value {
      color: #1976d2;
      font-weight: 700;
    }
    .metric .value.fast {
      color: #4caf50;
    }
    .metric .value.slow {
      color: #f44336;
    }
    .info-panel {
      background: #e3f2fd;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      border-right: 4px solid #2196f3;
      margin-top: 1rem;
    }
    .info-panel p {
      margin: 0;
      color: #424242;
      line-height: 1.6;
    }
    .load-complete {
      color: #2e7d32;
      font-weight: 600;
      margin-top: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceMonitoringComponent {}

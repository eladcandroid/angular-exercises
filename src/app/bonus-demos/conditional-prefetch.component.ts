import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-conditional-prefetch',
  template: `
    <section class="demo-section">
      <h2>בונוס 5: Conditional Prefetching</h2>
      <p class="description">הורדת קוד מראש רק למשתמשים עם חיבור מהיר (4G)</p>

      <div class="connection-info">
        <h4>מידע על החיבור שלך:</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">סוג חיבור:</span>
            <span class="value">{{ connectionType() }}</span>
          </div>
          <div class="info-item">
            <span class="label">חיבור מהיר:</span>
            <span class="value" [class.yes]="isFastConnection()" [class.no]="!isFastConnection()">
              {{ isFastConnection() ? 'כן ✓' : 'לא ✗' }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">Prefetch מופעל:</span>
            <span class="value" [class.yes]="isFastConnection()">
              {{ isFastConnection() ? 'כן (חוסך זמן!)' : 'לא (חוסך נתונים)' }}
            </span>
          </div>
        </div>
      </div>

      <div class="content-area">
        @defer (on viewport; prefetch when isFastConnection()) {
          <div class="loaded-content">
            <div class="success-badge">✓ נטען!</div>
            <h4>תוכן שנטען עם Conditional Prefetch</h4>
            <p>אם החיבור מהיר (4G), הקוד הורד מראש ברקע, וכשגללת - התוכן הוצג מיד!</p>
            <p>אם החיבור איטי, הקוד לא הורד מראש כדי לחסוך בנתונים.</p>
            <div class="tech-note">
              <strong>טכנית:</strong> השתמשנו ב-<code>navigator.connection?.effectiveType</code>
            </div>
          </div>
        } @placeholder {
          <div class="placeholder">
            <p>גלול/י למטה לטעינת התוכן...</p>
            <p class="hint">
              {{ isFastConnection() ?
                'הקוד כבר הורד מראש ברקע! 🚀' :
                'הקוד יורד רק עכשיו (חוסך נתונים) 📡' }}
            </p>
          </div>
        }
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
      border-top: 4px solid #4caf50;
    }
    h2 { color: #1976d2; margin-bottom: 1rem; }
    .description { color: #616161; margin-bottom: 2rem; line-height: 1.6; }
    .connection-info {
      background: #e3f2fd;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 2px solid #2196f3;
    }
    .connection-info h4 {
      color: #1976d2;
      margin: 0 0 1rem 0;
    }
    .info-grid {
      display: grid;
      gap: 1rem;
    }
    .info-item {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .info-item .label {
      color: #424242;
      font-weight: 600;
    }
    .info-item .value {
      color: #1976d2;
      font-weight: 700;
    }
    .info-item .value.yes {
      color: #4caf50;
    }
    .info-item .value.no {
      color: #f44336;
    }
    .content-area {
      min-height: 200px;
    }
    .placeholder {
      background: #f5f5f5;
      padding: 3rem;
      text-align: center;
      border-radius: 8px;
      border: 2px dashed #bdbdbd;
    }
    .hint {
      margin-top: 1rem;
      color: #757575;
      font-style: italic;
      font-size: 0.875rem;
    }
    .loaded-content {
      background: #e8f5e9;
      padding: 2rem;
      border-radius: 8px;
      border: 2px solid #4caf50;
    }
    .success-badge {
      background: #4caf50;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    .tech-note {
      background: #fff9c4;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
      border-right: 4px solid #fbc02d;
    }
    .tech-note code {
      background: #fff;
      padding: 0.25rem 0.5rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #c62828;
    }
    h4 { color: #424242; margin: 0.5rem 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionalPrefetchComponent {
  protected readonly isFastConnection = signal(this.checkConnection());
  protected readonly connectionType = signal(this.getConnectionType());

  private checkConnection(): boolean {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      return conn?.effectiveType === '4g';
    }
    return true; // Default to true if API not available
  }

  private getConnectionType(): string {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      return conn?.effectiveType || 'לא ידוע';
    }
    return 'לא נתמך בדפדפן';
  }
}

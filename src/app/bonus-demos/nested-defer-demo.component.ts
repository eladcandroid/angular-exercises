import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nested-defer-demo',
  template: `
    <section class="demo-section">
      <h2>בונוס 3: Nested Defer</h2>
      <p class="description">טעינה נדחית מקוננת - הרמה הראשונה נטענת ב-viewport, הרמה השנייה ב-interaction</p>

      <div class="outer-area">
        @defer (on viewport) {
          <div class="level-1">
            <div class="success-badge">✓ רמה 1 נטענה (Viewport)</div>
            <h4>תוכן רמה ראשונה</h4>
            <p>תוכן זה נטען כשהאזור נכנס לאזור הנראה</p>

            @defer (on interaction) {
              <div class="level-2">
                <div class="success-badge secondary">✓ רמה 2 נטענה (Interaction)</div>
                <h5>תוכן מקונן - רמה שנייה</h5>
                <p>תוכן זה נטען רק אחרי לחיצה על הכפתור</p>
                <div class="nested-info">
                  <p><strong>שימו לב:</strong> טעינה נדחית מקוננת מאפשרת טעינה הדרגתית ומדויקת יותר</p>
                </div>
              </div>
            } @placeholder {
              <button class="show-more-btn">📄 הצג/י מפרט מלא</button>
            }
          </div>
        } @placeholder (minimum 300ms) {
          <div class="placeholder">
            <p>גלול/י למטה לטעינת התוכן...</p>
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
      border-top: 4px solid #ff5722;
    }
    h2 { color: #1976d2; margin-bottom: 1rem; }
    .description { color: #616161; margin-bottom: 2rem; line-height: 1.6; }
    .outer-area { min-height: 200px; }
    .placeholder {
      background: #f5f5f5;
      padding: 3rem;
      text-align: center;
      border-radius: 8px;
      border: 2px dashed #bdbdbd;
    }
    .level-1 {
      background: #fff3e0;
      padding: 2rem;
      border-radius: 8px;
      border: 2px solid #ff9800;
    }
    .level-2 {
      background: #e1f5fe;
      padding: 1.5rem;
      border-radius: 8px;
      border: 2px solid #03a9f4;
      margin-top: 1rem;
      animation: slideDown 0.3s ease-out;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .success-badge {
      background: #ff9800;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1rem;
      font-weight: 600;
      font-size: 0.875rem;
    }
    .success-badge.secondary {
      background: #03a9f4;
    }
    .show-more-btn {
      background: #1976d2;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      margin-top: 1rem;
      transition: all 0.3s ease;
    }
    .show-more-btn:hover {
      background: #1565c0;
      transform: translateY(-2px);
    }
    .nested-info {
      background: #b3e5fc;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    h4, h5 { color: #424242; margin: 0.5rem 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedDeferDemoComponent {}

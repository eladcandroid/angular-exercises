import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bundle-analysis',
  template: `
    <section class="demo-section">
      <h2>בונוס 6: Build Analysis</h2>
      <p class="description">בדיקה והדגמה של bundles נפרדים שנוצרו על ידי טעינה נדחית</p>

      <div class="instructions">
        <h4>📦 איך לבדוק את ה-Bundles</h4>
        <ol>
          <li>הרץ/י <code>ng build</code> בטרמינל</li>
          <li>התבונן/י בפלט - תראה/י מספר קבצי JavaScript</li>
          <li>כל בלוק טעינה נדחית יוצר bundle נפרד עם hash ייחודי</li>
          <li>פתח/י DevTools → Network → סנן לפי "JS" כדי לראות טעינה דינמית</li>
        </ol>
      </div>

      <div class="example-output">
        <h4>📄 דוגמה לפלט Build</h4>
        <div class="code-block">
          <code>Application bundle generation complete.</code>
          <code></code>
          <code>Initial chunk files   | Names         | Raw size</code>
          <code>main-ABCD1234.js      | main          | 125.34 kB</code>
          <code>polyfills-EFGH5678.js | polyfills     |  82.45 kB</code>
          <code>styles-IJKL9012.css   | styles        |  15.23 kB</code>
          <code></code>
          <code>Lazy chunk files       | Names                    | Raw size</code>
          <code>chunk-MNOP3456.js     | product-details          |  45.12 kB</code>
          <code>chunk-QRST7890.js     | product-reviews          |  38.67 kB</code>
          <code>chunk-UVWX1234.js     | related-products         |  22.89 kB</code>
          <code>chunk-YZAB5678.js     | product-analytics        |  31.45 kB</code>
          <code>chunk-CDEF9012.js     | promotional-banner       |  12.34 kB</code>
        </div>
      </div>

      <div class="benefits">
        <h4>✨ יתרונות</h4>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h5>טעינה מהירה</h5>
            <p>Bundle ראשוני קטן יותר ב-40-60%</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📦</div>
            <h5>Code Splitting</h5>
            <p>קוד נטען רק כשצריך אותו</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <h5>Time to Interactive</h5>
            <p>משתפר באופן משמעותי</p>
          </div>
        </div>
      </div>

      <div class="dev-tools-tip">
        <h4>💡 טיפ: שימוש ב-DevTools</h4>
        <p>פתח/י את DevTools → Network tab → רענן/י את הדף</p>
        <p>שימ/י לב איך הקבצים נטענים רק כשאת/ה מפעיל/ה את הטריגרים!</p>
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
      border-top: 4px solid #673ab7;
    }
    h2 { color: #1976d2; margin-bottom: 1rem; }
    h4 { color: #424242; margin: 1rem 0 0.75rem; }
    h5 { color: #424242; margin: 0.5rem 0; }
    .description { color: #616161; margin-bottom: 2rem; line-height: 1.6; }

    .instructions {
      background: #f3e5f5;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 2px solid #9c27b0;
    }
    .instructions ol {
      margin: 1rem 0 0 0;
      padding-right: 1.5rem;
      line-height: 2;
    }
    .instructions code {
      background: #fff;
      padding: 0.25rem 0.5rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #c62828;
    }

    .example-output {
      background: #263238;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .example-output h4 {
      color: #fff;
      margin-top: 0;
    }
    .code-block {
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }
    .code-block code {
      display: block;
      color: #aed581;
      padding: 0.125rem 0;
    }

    .benefits {
      background: #e8f5e9;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 2px solid #4caf50;
    }
    .benefits h4 {
      color: #2e7d32;
      margin-top: 0;
    }
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .benefit-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .benefit-card h5 {
      color: #1976d2;
      margin: 0.5rem 0;
    }
    .benefit-card p {
      color: #616161;
      margin: 0.25rem 0 0;
      font-size: 0.9rem;
    }

    .dev-tools-tip {
      background: #fff3e0;
      padding: 1.5rem;
      border-radius: 8px;
      border-right: 4px solid #ff9800;
    }
    .dev-tools-tip h4 {
      color: #e65100;
      margin-top: 0;
    }
    .dev-tools-tip p {
      color: #424242;
      line-height: 1.8;
      margin: 0.5rem 0;
    }

    @media (max-width: 768px) {
      .benefits-grid {
        grid-template-columns: 1fr;
      }
      .code-block {
        font-size: 0.7rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundleAnalysisComponent {}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-multiple-triggers-demo',
  template: `
    <section class="demo-section">
      <h2>בונוס 2: Multiple Triggers</h2>
      <p class="description">הקומפוננטה נטענת כש<strong>מרחפים עם העכבר</strong> <em>או</em> <strong>לוחצים</strong> על האזור</p>

      <div class="multi-trigger-area">
        @defer (on hover, interaction) {
          <div class="loaded-content">
            <div class="success-badge">✓ נטען! (Hover או Interaction)</div>
            <h4>תוכן שנטען עם טריגרים מרובים</h4>
            <p>יש שתי דרכים להפעיל תוכן זה:</p>
            <ul>
              <li>🖱️ העברת עכבר מעל האזור (hover)</li>
              <li>👆 לחיצה על האזור (interaction)</li>
            </ul>
            <div class="code-example">
              <code>defer (on hover, interaction) ...</code>
            </div>
          </div>
        } @placeholder {
          <div class="placeholder">
            <p>🖱️ העבר/י עכבר או 👆 לחץ/י כאן</p>
            <p class="hint">שני הטריגרים פועלים - נסה/י את שניהם!</p>
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
      border-top: 4px solid #9c27b0;
    }
    h2 { color: #1976d2; margin-bottom: 1rem; }
    .description { color: #616161; margin-bottom: 2rem; line-height: 1.6; }
    .multi-trigger-area {
      min-height: 200px;
      cursor: pointer;
    }
    .placeholder {
      background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
      padding: 3rem;
      text-align: center;
      border-radius: 8px;
      border: 2px dashed #9c27b0;
      transition: all 0.3s ease;
    }
    .placeholder:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(156, 39, 176, 0.2);
    }
    .hint { font-size: 0.875rem; color: #757575; margin-top: 0.5rem; }
    .loaded-content {
      background: #f3e5f5;
      padding: 2rem;
      border-radius: 8px;
      border: 2px solid #9c27b0;
    }
    .success-badge {
      background: #9c27b0;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    ul { margin: 1rem 0; line-height: 2; }
    .code-example {
      background: #263238;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    .code-example code {
      color: #aed581;
      direction: ltr;
      text-align: left;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleTriggersDemoComponent {}

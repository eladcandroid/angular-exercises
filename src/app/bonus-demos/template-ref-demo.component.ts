import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-template-ref-demo',
  template: `
    <section class="demo-section">
      <h2>בונוס 1: Template Reference Variables</h2>
      <p class="description">הקומפוננטה נטענת כש<strong>כותרת אחרת</strong> נכנסת לאזור הנראה (לא האזור של הקומפוננטה עצמה)</p>

      <div #triggerElement class="trigger-element">
        <h3>🎯 כותרת טריגר - גלול/י לכאן!</h3>
        <p>כאשר אלמנט זה נכנס לאזור הנראה, הקומפוננטה למטה תיטען</p>
      </div>

      <div class="content-area">
        @defer (on viewport(triggerElement)) {
          <div class="loaded-content">
            <div class="success-badge">✓ נטען בהצלחה!</div>
            <h4>תוכן שנטען באמצעות Template Reference Variable</h4>
            <p>שימו לב: התוכן נטען כש-#triggerElement נכנס לאזור הנראה, לא כשהאזור הזה נכנס</p>
            <div class="code-example">
              <code>&lt;div #triggerElement&gt;...&lt;/div&gt;</code>
              <code>defer (on viewport(triggerElement)) ...</code>
            </div>
          </div>
        } @placeholder {
          <div class="placeholder">
            <p>👆 גלול/י עד שהכותרת הטריגר תיכנס לאזור הנראה...</p>
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
      border-top: 4px solid #2196f3;
    }
    h2 { color: #1976d2; margin-bottom: 1rem; }
    .description { color: #616161; margin-bottom: 2rem; line-height: 1.6; }
    .trigger-element {
      background: linear-gradient(135deg, #fff9c4 0%, #ffecb3 100%);
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      border: 3px dashed #ffa000;
      margin-bottom: 2rem;
    }
    .trigger-element h3 { color: #e65100; margin: 0 0 0.5rem 0; }
    .content-area { min-height: 200px; }
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
    .placeholder {
      background: #f5f5f5;
      padding: 3rem;
      text-align: center;
      border-radius: 8px;
      border: 2px dashed #bdbdbd;
    }
    .code-example {
      background: #263238;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    .code-example code {
      color: #aed581;
      display: block;
      margin: 0.25rem 0;
      direction: ltr;
      text-align: left;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateRefDemoComponent {}

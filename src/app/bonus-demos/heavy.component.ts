import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-heavy-component',
  template: `
    <div class="heavy-content">
      <div class="success-badge">✓ קומפוננטה נטענה!</div>
      <h4>קומפוננטה "כבדה" לדוגמה</h4>
      <p>קומפוננטה זו מדמה טעינת תוכן כבד</p>
    </div>
  `,
  styles: [`
    .heavy-content {
      background: #e3f2fd;
      padding: 2rem;
      border-radius: 8px;
      border: 2px solid #2196f3;
    }
    .success-badge {
      background: #2196f3;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    h4 { color: #424242; margin: 0.5rem 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeavyComponent {
  constructor() {
    // Simulate loading delay
    setTimeout(() => {
      // Component loaded
    }, 100);
  }
}

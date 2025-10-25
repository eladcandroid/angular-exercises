import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
}

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReviewsComponent {
  protected readonly Math = Math; // Expose Math to template

  protected readonly reviews = signal<Review[]>([
    {
      id: 1,
      author: 'דניאל כהן',
      rating: 5,
      date: '2024-10-15',
      content: 'מחשב מדהים! ביצועים מעולים ועיצוב יפהפה. שווה כל שקל.'
    },
    {
      id: 2,
      author: 'שרה לוי',
      rating: 4,
      date: '2024-10-10',
      content: 'מוצר איכותי, אבל המחיר קצת גבוה. בכל מקרה מרוצה מהרכישה.'
    },
    {
      id: 3,
      author: 'יוסי מזרחי',
      rating: 5,
      date: '2024-10-05',
      content: 'הטוב ביותר בשוק! המסך פשוט מושלם ומהירות העבודה מדהימה.'
    },
    {
      id: 4,
      author: 'מיכל אברהם',
      rating: 4,
      date: '2024-09-28',
      content: 'מחשב מצוין לעבודה מהבית. קל למדי ובעל חיי סוללה טובים.'
    },
    {
      id: 5,
      author: 'עידו ישראלי',
      rating: 5,
      date: '2024-09-20',
      content: 'בחירה מושלמת למעצבים גרפיים. כרטיס המסך חזק מאוד!'
    },
    {
      id: 6,
      author: 'רונית דוד',
      rating: 3,
      date: '2024-09-15',
      content: 'טוב בסך הכל, אבל יש חום מתפתח בזמן עומס. נראה לי שמאווררים לא מספיק חזקים.'
    },
    {
      id: 7,
      author: 'אלון גבאי',
      rating: 5,
      date: '2024-09-10',
      content: 'הגאדג\'ט הטוב ביותר שקניתי! ממליץ בחום.'
    }
  ]);

  protected readonly averageRating = signal(4.4);

  protected readonly reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  protected onSubmitReview(): void {
    if (this.reviewForm.valid) {
      console.log('ביקורת חדשה:', this.reviewForm.value);
      this.reviewForm.reset({ rating: 5 });
    }
  }

  protected getStars(rating: number): string[] {
    return Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆');
  }
}

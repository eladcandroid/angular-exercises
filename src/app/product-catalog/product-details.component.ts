import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface ProductDetail {
  name: string;
  value: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  protected readonly productName = signal('מחשב נייד Dell XPS 15');
  protected readonly fullDescription = signal(
    'מחשב נייד מתקדם המיועד למקצוענים ויוצרי תוכן. כולל מסך InfinityEdge בגודל 15.6 אינץ\' ברזולוציית 4K, מעבד Intel Core i7 מהדור ה-13, 32GB זיכרון RAM, וכרטיס מסך NVIDIA RTX 4050. המשקל הקל והעיצוב האלגנטי הופכים אותו לבחירה מושלמת לעבודה ניידת.'
  );

  protected readonly images = signal([
    'https://placehold.co/400x300/1976d2/ffffff?text=Image+1',
    'https://placehold.co/400x300/1565c0/ffffff?text=Image+2',
    'https://placehold.co/400x300/0d47a1/ffffff?text=Image+3',
    'https://placehold.co/400x300/1e88e5/ffffff?text=Image+4'
  ]);

  protected readonly specifications = signal<ProductDetail[]>([
    { name: 'מעבד', value: 'Intel Core i7-13700H (14 ליבות)' },
    { name: 'זיכרון RAM', value: '32GB DDR5' },
    { name: 'כרטיס מסך', value: 'NVIDIA GeForce RTX 4050 (6GB)' },
    { name: 'אחסון', value: 'SSD 1TB NVMe' },
    { name: 'מסך', value: '15.6" 4K OLED Touch' },
    { name: 'מערכת הפעלה', value: 'Windows 11 Pro' },
    { name: 'משקל', value: '1.86 ק"ג' },
    { name: 'סוללה', value: 'עד 12 שעות' }
  ]);

  protected readonly priceBreakdown = signal([
    { item: 'מחיר בסיסי', amount: 5999 },
    { item: 'שדרוג ל-32GB RAM', amount: 600 },
    { item: 'שדרוג ל-4K OLED', amount: 400 },
    { item: 'אחריות מורחבת 3 שנים', amount: 0 }
  ]);

  protected readonly totalPrice = signal(6999);
}

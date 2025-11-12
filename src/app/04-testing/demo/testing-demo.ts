import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProductListComponent } from './product-list/product-list';
import { Product } from '../../shared/models/shop.models';

@Component({
  selector: 'app-testing-demo',
  imports: [ProductListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testing-demo.html',
  styleUrl: './testing-demo.scss',
})
export class TestingDemoComponent {
  products = signal<Product[]>([
    {
      id: 1,
      name: 'מחשב נייד Dell XPS',
      price: 4500,
      category: 'מחשבים',
      inStock: true,
      description: 'מחשב נייד עם מעבד Intel i7',
    },
    {
      id: 2,
      name: 'עכבר אלחוטי Logitech',
      price: 120,
      category: 'אביזרים',
      inStock: true,
      description: 'עכבר ארגונומי עם Bluetooth',
    },
    {
      id: 3,
      name: 'מקלדת מכנית',
      price: 350,
      category: 'אביזרים',
      inStock: false,
      description: 'מקלדת מכנית עם תאורה RGB',
    },
    {
      id: 4,
      name: 'מסך 27 אינץ',
      price: 1200,
      category: 'מסכים',
      inStock: true,
      description: 'מסך 4K עם HDR',
    },
    {
      id: 5,
      name: 'אוזניות Sony',
      price: 450,
      category: 'אביזרים',
      inStock: true,
      description: 'אוזניות עם ביטול רעשים',
    },
    {
      id: 6,
      name: 'כרטיס מסך RTX 4070',
      price: 3200,
      category: 'רכיבים',
      inStock: false,
      description: 'כרטיס מסך לגיימינג',
    },
  ]);

  categoryFilter = signal<string>('');
  loading = signal<boolean>(false);

  filterByCategory(category: string) {
    this.categoryFilter.set(category);
  }

  clearFilter() {
    this.categoryFilter.set('');
  }

  toggleLoading() {
    this.loading.set(!this.loading());
  }
}

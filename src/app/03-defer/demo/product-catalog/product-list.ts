import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ProductDetailsComponent } from './product-details';
import { ProductReviewsComponent } from './product-reviews';
import { RelatedProductsComponent } from './related-products';
import { ProductAnalyticsComponent } from './product-analytics';
import { PromotionalBannerComponent } from './promotional-banner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailsComponent,
    ProductReviewsComponent,
    RelatedProductsComponent,
    ProductAnalyticsComponent,
    PromotionalBannerComponent
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  // Product data
  protected readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'מחשב נייד Dell XPS 15',
      price: 6999,
      image: 'https://placehold.co/300x200/1976d2/ffffff?text=Laptop',
      description: 'מחשב נייד מתקדם עם מסך 15.6 אינץ\' ומעבד Intel Core i7',
      category: 'מחשבים',
      inStock: true
    },
    {
      id: 2,
      name: 'אוזניות Sony WH-1000XM5',
      price: 1299,
      image: 'https://placehold.co/300x200/388e3c/ffffff?text=Headphones',
      description: 'אוזניות אלחוטיות עם מיטוב רעשים מתקדם',
      category: 'אודיו',
      inStock: true
    },
    {
      id: 3,
      name: 'טאבלט Samsung Galaxy Tab S9',
      price: 3499,
      image: 'https://placehold.co/300x200/f57c00/ffffff?text=Tablet',
      description: 'טאבלט פרימיום עם מסך AMOLED 11 אינץ\'',
      category: 'טאבלטים',
      inStock: true
    },
    {
      id: 4,
      name: 'מקלדת מכנית Logitech MX Keys',
      price: 599,
      image: 'https://placehold.co/300x200/7b1fa2/ffffff?text=Keyboard',
      description: 'מקלדת אלחוטית מקצועית עם תאורה אינטליגנטית',
      category: 'אביזרים',
      inStock: true
    },
    {
      id: 5,
      name: 'מסך LG UltraWide 34"',
      price: 2899,
      image: 'https://placehold.co/300x200/d32f2f/ffffff?text=Monitor',
      description: 'מסך רחב 21:9 ברזולוציה QHD',
      category: 'מסכים',
      inStock: false
    },
    {
      id: 6,
      name: 'עכבר Logitech MX Master 3S',
      price: 449,
      image: 'https://placehold.co/300x200/0288d1/ffffff?text=Mouse',
      description: 'עכבר ארגונומי מתקדם למקצוענים',
      category: 'אביזרים',
      inStock: true
    },
    {
      id: 7,
      name: 'רמקול JBL Charge 5',
      price: 699,
      image: 'https://placehold.co/300x200/c2185b/ffffff?text=Speaker',
      description: 'רמקול Bluetooth עמיד במים עם סוללה חזקה',
      category: 'אודיו',
      inStock: true
    },
    {
      id: 8,
      name: 'מצלמת רשת Logitech Brio',
      price: 899,
      image: 'https://placehold.co/300x200/00796b/ffffff?text=Webcam',
      description: 'מצלמת רשת 4K UHD עם HDR',
      category: 'אביזרים',
      inStock: true
    },
    {
      id: 9,
      name: 'כונן SSD Samsung 990 PRO',
      price: 799,
      image: 'https://placehold.co/300x200/5d4037/ffffff?text=SSD',
      description: 'כונן SSD NVMe בנפח 2TB',
      category: 'אחסון',
      inStock: true
    },
    {
      id: 10,
      name: 'נתב Wi-Fi 6 ASUS',
      price: 1199,
      image: 'https://placehold.co/300x200/455a64/ffffff?text=Router',
      description: 'נתב Wi-Fi 6 מתקדם עם כיסוי מרבי',
      category: 'רשת',
      inStock: true
    }
  ]);

  // State for custom trigger (analytics)
  protected showAnalytics = signal(false);
  protected userIsAdmin = signal(true);

  // Toggle analytics display
  protected toggleAnalytics(): void {
    this.showAnalytics.update(value => !value);
  }
}

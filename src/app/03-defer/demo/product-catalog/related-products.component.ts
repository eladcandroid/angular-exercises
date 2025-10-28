import { Component, ChangeDetectionStrategy, signal, input } from '@angular/core';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedProductsComponent {
  category = input<string>('מחשבים');

  protected readonly relatedProducts = signal<RelatedProduct[]>([
    {
      id: 11,
      name: 'מחשב נייד HP Pavilion',
      price: 4999,
      image: 'https://placehold.co/200x150/9c27b0/ffffff?text=HP'
    },
    {
      id: 12,
      name: 'מחשב נייד Lenovo ThinkPad',
      price: 5799,
      image: 'https://placehold.co/200x150/673ab7/ffffff?text=Lenovo'
    },
    {
      id: 13,
      name: 'מחשב נייד ASUS ZenBook',
      price: 6499,
      image: 'https://placehold.co/200x150/3f51b5/ffffff?text=ASUS'
    },
    {
      id: 14,
      name: 'מחשב נייד Acer Swift',
      price: 4299,
      image: 'https://placehold.co/200x150/2196f3/ffffff?text=Acer'
    },
    {
      id: 15,
      name: 'מחשב נייד MSI Gaming',
      price: 7999,
      image: 'https://placehold.co/200x150/03a9f4/ffffff?text=MSI'
    }
  ]);
}

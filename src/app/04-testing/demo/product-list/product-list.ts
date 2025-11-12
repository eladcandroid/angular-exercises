import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../shared/models/shop.models';

@Component({
  selector: 'app-product-list',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent {
  products = input.required<Product[]>();
  categoryFilter = input<string>('');
  loading = input<boolean>(false);

  title = computed(() => {
    const category = this.categoryFilter();
    return category ? `מוצרים בקטגוריה: ${category}` : 'כל המוצרים';
  });

  visibleProducts = computed(() => {
    const filter = this.categoryFilter();
    if (!filter) return this.products();
    return this.products().filter((p) => p.category === filter);
  });

  productCount = computed(() => this.visibleProducts().length);
}

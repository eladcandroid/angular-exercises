import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, Product } from '../../../shared/models/shop.models';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private items = signal<CartItem[]>([]);

  // Computed signals
  cartItems = computed(() => this.items());

  totalItems = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));

  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  isEmpty = computed(() => this.items().length === 0);

  constructor() {
    // Effect לשמירה ב-localStorage
    effect(() => {
      const cartData = this.items();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cartData));
      }
    });

    // Load from localStorage on init
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.items.set(parsed);
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
        }
      }
    }
  }

  addItem(product: Product, quantity: number = 1) {
    this.items.update((items) => {
      const existingItem = items.find((i) => i.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...items, { product, quantity }];
    });
  }

  removeItem(productId: number) {
    this.items.update((items) => items.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this.items.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  clear() {
    this.items.set([]);
  }

  getItemQuantity(productId: number): number {
    const item = this.items().find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  }
}

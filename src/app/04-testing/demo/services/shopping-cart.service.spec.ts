import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { Product } from '../../../shared/models/shop.models';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  const mockProduct1: Product = {
    id: 1,
    name: 'מוצר בדיקה 1',
    price: 100,
    category: 'בדיקות',
    inStock: true,
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'מוצר בדיקה 2',
    price: 200,
    category: 'בדיקות',
    inStock: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

    service = TestBed.inject(ShoppingCartService);
  });

  afterEach(() => {
    // Clean up localStorage after each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should start with empty cart', () => {
      expect(service.isEmpty()).toBe(true);
      expect(service.totalItems()).toBe(0);
      expect(service.cartItems().length).toBe(0);
    });
  });

  describe('Adding Items', () => {
    it('should add item to cart', () => {
      service.addItem(mockProduct1);

      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].product).toEqual(mockProduct1);
      expect(service.cartItems()[0].quantity).toBe(1);
    });

    it('should add multiple items to cart', () => {
      service.addItem(mockProduct1);
      service.addItem(mockProduct2);

      expect(service.cartItems().length).toBe(2);
      expect(service.totalItems()).toBe(2);
    });

    it('should increment quantity when adding existing item', () => {
      service.addItem(mockProduct1);
      service.addItem(mockProduct1);

      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].quantity).toBe(2);
      expect(service.totalItems()).toBe(2);
    });

    it('should add specific quantity', () => {
      service.addItem(mockProduct1, 5);

      expect(service.cartItems()[0].quantity).toBe(5);
      expect(service.totalItems()).toBe(5);
    });

    it('should add to existing quantity', () => {
      service.addItem(mockProduct1, 3);
      service.addItem(mockProduct1, 2);

      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].quantity).toBe(5);
    });

    it('should mark cart as not empty after adding item', () => {
      expect(service.isEmpty()).toBe(true);
      service.addItem(mockProduct1);
      expect(service.isEmpty()).toBe(false);
    });
  });

  describe('Removing Items', () => {
    beforeEach(() => {
      service.addItem(mockProduct1);
      service.addItem(mockProduct2);
    });

    it('should remove item from cart', () => {
      service.removeItem(mockProduct1.id);

      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].product.id).toBe(mockProduct2.id);
    });

    it('should mark cart as empty when last item removed', () => {
      service.removeItem(mockProduct1.id);
      service.removeItem(mockProduct2.id);

      expect(service.isEmpty()).toBe(true);
      expect(service.cartItems().length).toBe(0);
    });

    it('should do nothing when removing non-existent item', () => {
      const initialLength = service.cartItems().length;
      service.removeItem(999);

      expect(service.cartItems().length).toBe(initialLength);
    });
  });

  describe('Updating Quantity', () => {
    beforeEach(() => {
      service.addItem(mockProduct1, 3);
    });

    it('should update item quantity', () => {
      service.updateQuantity(mockProduct1.id, 5);

      expect(service.cartItems()[0].quantity).toBe(5);
      expect(service.totalItems()).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      service.updateQuantity(mockProduct1.id, 0);

      expect(service.cartItems().length).toBe(0);
      expect(service.isEmpty()).toBe(true);
    });

    it('should remove item when quantity is negative', () => {
      service.updateQuantity(mockProduct1.id, -1);

      expect(service.cartItems().length).toBe(0);
    });

    it('should not affect other items when updating', () => {
      service.addItem(mockProduct2, 2);
      service.updateQuantity(mockProduct1.id, 10);

      const product2Item = service.cartItems().find((i) => i.product.id === mockProduct2.id);
      expect(product2Item?.quantity).toBe(2);
    });
  });

  describe('Computed Signals', () => {
    it('should calculate total items correctly', () => {
      service.addItem(mockProduct1, 3);
      service.addItem(mockProduct2, 2);

      expect(service.totalItems()).toBe(5);
    });

    it('should calculate total price correctly', () => {
      service.addItem(mockProduct1, 2); // 2 * 100 = 200
      service.addItem(mockProduct2, 1); // 1 * 200 = 200
      // Total = 400

      expect(service.totalPrice()).toBe(400);
    });

    it('should update total price when quantity changes', () => {
      service.addItem(mockProduct1, 1); // 100
      expect(service.totalPrice()).toBe(100);

      service.updateQuantity(mockProduct1.id, 3); // 300
      expect(service.totalPrice()).toBe(300);
    });

    it('should return 0 for empty cart totals', () => {
      expect(service.totalItems()).toBe(0);
      expect(service.totalPrice()).toBe(0);
    });
  });

  describe('Cart Operations', () => {
    it('should clear cart', () => {
      service.addItem(mockProduct1);
      service.addItem(mockProduct2);

      service.clear();

      expect(service.isEmpty()).toBe(true);
      expect(service.cartItems().length).toBe(0);
      expect(service.totalItems()).toBe(0);
      expect(service.totalPrice()).toBe(0);
    });

    it('should get item quantity by product id', () => {
      service.addItem(mockProduct1, 5);

      expect(service.getItemQuantity(mockProduct1.id)).toBe(5);
    });

    it('should return 0 for non-existent item quantity', () => {
      expect(service.getItemQuantity(999)).toBe(0);
    });
  });

  describe('localStorage Integration', () => {
    it('should save to localStorage when adding item', () => {
      if (typeof localStorage === 'undefined') {
        return; // Skip in environments without localStorage
      }

      service.addItem(mockProduct1);

      // Flush effects to trigger localStorage save
      TestBed.flushEffects();

      const stored = localStorage.getItem('cart');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.length).toBe(1);
      expect(parsed[0].product.id).toBe(mockProduct1.id);
    });

    it('should save to localStorage when removing item', () => {
      if (typeof localStorage === 'undefined') return;

      service.addItem(mockProduct1);
      service.addItem(mockProduct2);
      TestBed.flushEffects();

      service.removeItem(mockProduct1.id);
      TestBed.flushEffects();

      const stored = localStorage.getItem('cart');
      const parsed = JSON.parse(stored!);
      expect(parsed.length).toBe(1);
      expect(parsed[0].product.id).toBe(mockProduct2.id);
    });

    it('should save to localStorage when updating quantity', () => {
      if (typeof localStorage === 'undefined') return;

      service.addItem(mockProduct1, 2);
      TestBed.flushEffects();

      service.updateQuantity(mockProduct1.id, 10);
      TestBed.flushEffects();

      const stored = localStorage.getItem('cart');
      const parsed = JSON.parse(stored!);
      expect(parsed[0].quantity).toBe(10);
    });

    it('should clear localStorage when cart is cleared', () => {
      if (typeof localStorage === 'undefined') return;

      service.addItem(mockProduct1);
      TestBed.flushEffects();

      service.clear();
      TestBed.flushEffects();

      const stored = localStorage.getItem('cart');
      const parsed = JSON.parse(stored!);
      expect(parsed.length).toBe(0);
    });

    it('should load cart from localStorage on creation', () => {
      if (typeof localStorage === 'undefined') return;

      // Prepare localStorage
      const cartData = [
        { product: mockProduct1, quantity: 3 },
        { product: mockProduct2, quantity: 2 },
      ];
      localStorage.setItem('cart', JSON.stringify(cartData));

      // Create new service instance
      const newService = new ShoppingCartService();

      expect(newService.cartItems().length).toBe(2);
      expect(newService.totalItems()).toBe(5);
      expect(newService.getItemQuantity(mockProduct1.id)).toBe(3);
    });
  });

  describe('Signal Reactivity', () => {
    it('should update computed values immediately', () => {
      expect(service.totalItems()).toBe(0);
      expect(service.isEmpty()).toBe(true);

      service.addItem(mockProduct1);

      // No need for async or tick - signals are synchronous!
      expect(service.totalItems()).toBe(1);
      expect(service.isEmpty()).toBe(false);
    });

    it('should maintain reactivity across multiple operations', () => {
      service.addItem(mockProduct1, 2);
      expect(service.totalPrice()).toBe(200);

      service.addItem(mockProduct2, 1);
      expect(service.totalPrice()).toBe(400);

      service.removeItem(mockProduct1.id);
      expect(service.totalPrice()).toBe(200);

      service.clear();
      expect(service.totalPrice()).toBe(0);
    });
  });
});

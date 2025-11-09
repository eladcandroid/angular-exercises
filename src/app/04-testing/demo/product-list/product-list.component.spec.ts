import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Product } from '../../../shared/models/shop.models';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'מחשב נייד',
      price: 3500,
      category: 'מחשבים',
      inStock: true,
    },
    {
      id: 2,
      name: 'עכבר',
      price: 50,
      category: 'אביזרים',
      inStock: false,
    },
    {
      id: 3,
      name: 'מקלדת',
      price: 150,
      category: 'אביזרים',
      inStock: true,
    },
  ];

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Product Display', () => {
    it('should display all products', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.detectChanges();

      const productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(3);
    });

    it('should display product details correctly', () => {
      fixture.componentRef.setInput('products', [mockProducts[0]]);
      fixture.detectChanges();

      const productCard = fixture.nativeElement.querySelector('.product-card');
      expect(productCard.querySelector('h3')?.textContent).toBe('מחשב נייד');
      expect(productCard.querySelector('.price')?.textContent).toBe('₪3500');
      expect(productCard.querySelector('.category')?.textContent).toBe('מחשבים');
    });

    it('should display empty state when no products', () => {
      fixture.componentRef.setInput('products', []);
      fixture.detectChanges();

      const emptyState = fixture.nativeElement.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toBe('אין מוצרים להצגה');
    });
  });

  describe('Filtering', () => {
    it('should filter products by category', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', 'אביזרים');
      fixture.detectChanges();

      const productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(2);
      expect(productCards[0].querySelector('h3')?.textContent).toBe('עכבר');
      expect(productCards[1].querySelector('h3')?.textContent).toBe('מקלדת');
    });

    it('should show all products when no filter', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', '');
      fixture.detectChanges();

      const productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(3);
    });

    it('should show empty state when filter matches no products', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', 'לא קיים');
      fixture.detectChanges();

      const emptyState = fixture.nativeElement.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('should display loading state', () => {
      fixture.componentRef.setInput('products', []);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const loading = fixture.nativeElement.querySelector('.loading');
      expect(loading).toBeTruthy();
      expect(loading.textContent).toBe('טוען מוצרים...');
    });

    it('should not display products when loading', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(0);

      const loading = fixture.nativeElement.querySelector('.loading');
      expect(loading).toBeTruthy();
    });

    it('should hide loading and show products when loaded', () => {
      // Start with loading
      fixture.componentRef.setInput('products', []);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      let loading = fixture.nativeElement.querySelector('.loading');
      expect(loading).toBeTruthy();

      // Finish loading
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      loading = fixture.nativeElement.querySelector('.loading');
      expect(loading).toBeFalsy();

      const productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(3);
    });
  });

  describe('Out of Stock', () => {
    it('should mark out-of-stock products', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.detectChanges();

      const productCards = fixture.nativeElement.querySelectorAll('.product-card');
      const outOfStockCard = productCards[1]; // עכבר is out of stock

      expect(outOfStockCard.classList.contains('out-of-stock')).toBe(true);
    });

    it('should display out-of-stock badge', () => {
      fixture.componentRef.setInput('products', [mockProducts[1]]); // עכבר
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      expect(badge).toBeTruthy();
      expect(badge.textContent).toBe('אזל מהמלאי');
    });

    it('should not display badge for in-stock products', () => {
      fixture.componentRef.setInput('products', [mockProducts[0]]); // מחשב נייד
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      expect(badge).toBeFalsy();
    });
  });

  describe('Computed Signals', () => {
    it('should compute title without filter', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', '');
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('h2');
      expect(title.textContent).toBe('כל המוצרים');
    });

    it('should compute title with category filter', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', 'מחשבים');
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('h2');
      expect(title.textContent).toBe('מוצרים בקטגוריה: מחשבים');
    });

    it('should update title when filter changes', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', 'מחשבים');
      fixture.detectChanges();

      let title = fixture.nativeElement.querySelector('h2');
      expect(title.textContent).toBe('מוצרים בקטגוריה: מחשבים');

      fixture.componentRef.setInput('categoryFilter', 'אביזרים');
      fixture.detectChanges();

      title = fixture.nativeElement.querySelector('h2');
      expect(title.textContent).toBe('מוצרים בקטגוריה: אביזרים');
    });

    it('should count visible products correctly', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', '');
      fixture.detectChanges();

      const summary = fixture.nativeElement.querySelector('.summary');
      expect(summary.textContent).toContain('3');
    });

    it('should count filtered products correctly', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', 'אביזרים');
      fixture.detectChanges();

      const summary = fixture.nativeElement.querySelector('.summary');
      expect(summary.textContent).toContain('2');
    });
  });

  describe('Signal Reactivity', () => {
    it('should update when products change', () => {
      fixture.componentRef.setInput('products', [mockProducts[0]]);
      fixture.detectChanges();

      let productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(1);

      fixture.componentRef.setInput('products', mockProducts);
      fixture.detectChanges();

      productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(3);
    });

    it('should maintain filter when products change', () => {
      fixture.componentRef.setInput('products', mockProducts);
      fixture.componentRef.setInput('categoryFilter', 'מחשבים');
      fixture.detectChanges();

      let productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(1);

      // Add more products with same category
      const newProducts = [
        ...mockProducts,
        { id: 4, name: 'טאבלט', price: 2000, category: 'מחשבים', inStock: true },
      ];

      fixture.componentRef.setInput('products', newProducts);
      fixture.detectChanges();

      productCards = fixture.nativeElement.querySelectorAll('.product-card');
      expect(productCards.length).toBe(2); // Now 2 products in 'מחשבים' category
    });
  });
});

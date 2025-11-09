import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProductApiService } from './product-api.service';
import { Product, SearchFilters } from '../../../shared/models/shop.models';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpTesting: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    name: 'מוצר בדיקה',
    price: 100,
    category: 'בדיקות',
    inStock: true,
  };

  const mockProducts: Product[] = [
    mockProduct,
    {
      id: 2,
      name: 'מוצר 2',
      price: 200,
      category: 'אלקטרוניקה',
      inStock: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Must be first!
        provideHttpClientTesting(), // Override with testing version
      ],
    });

    service = TestBed.inject(ProductApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests
    httpTesting.verify();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('GET Requests', () => {
    it('should fetch all products', (done) => {
      service.getProducts().subscribe({
        next: (products) => {
          expect(products).toEqual(mockProducts);
          expect(products.length).toBe(2);
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products');
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });

    it('should fetch single product by id', (done) => {
      service.getProduct(1).subscribe({
        next: (product) => {
          expect(product).toEqual(mockProduct);
          expect(product.id).toBe(1);
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });

    it('should handle different product IDs', (done) => {
      service.getProduct(42).subscribe({
        next: (product) => {
          expect(product.id).toBe(42);
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/42');
      expect(req.request.method).toBe('GET');
      req.flush({ ...mockProduct, id: 42 });
    });
  });

  describe('POST Requests', () => {
    it('should search products with filters', (done) => {
      const filters: SearchFilters = {
        query: 'laptop',
        category: 'electronics',
        minPrice: 100,
        maxPrice: 1000,
      };

      service.searchProducts(filters).subscribe({
        next: (products) => {
          expect(products).toEqual(mockProducts);
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/search');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(filters);
      req.flush(mockProducts);
    });

    it('should create new product', (done) => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'מוצר חדש',
        price: 300,
        category: 'חדש',
        inStock: true,
      };

      const createdProduct: Product = { id: 3, ...newProduct };

      service.createProduct(newProduct).subscribe({
        next: (product) => {
          expect(product).toEqual(createdProduct);
          expect(product.id).toBeDefined();
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProduct);
      req.flush(createdProduct);
    });
  });

  describe('PATCH Requests', () => {
    it('should update product', (done) => {
      const updates: Partial<Product> = {
        price: 150,
        inStock: false,
      };

      const updatedProduct: Product = {
        ...mockProduct,
        ...updates,
      };

      service.updateProduct(1, updates).subscribe({
        next: (product) => {
          expect(product).toEqual(updatedProduct);
          expect(product.price).toBe(150);
          expect(product.inStock).toBe(false);
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updates);
      req.flush(updatedProduct);
    });

    it('should handle partial updates', (done) => {
      const updates: Partial<Product> = { price: 500 };

      service.updateProduct(1, updates).subscribe({
        next: (product) => {
          expect(product.price).toBe(500);
          // Other fields should remain unchanged
          expect(product.name).toBe(mockProduct.name);
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/1');
      req.flush({ ...mockProduct, price: 500 });
    });
  });

  describe('DELETE Requests', () => {
    it('should delete product', (done) => {
      service.deleteProduct(1).subscribe({
        next: () => {
          expect(true).toBe(true); // Success
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle delete for different IDs', (done) => {
      service.deleteProduct(99).subscribe({
        next: () => {
          done();
        },
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products/99');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 error when getting product', (done) => {
      service.getProduct(999).subscribe({
        next: () => done.fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
          done();
        },
      });

      const req = httpTesting.expectOne('/api/products/999');
      req.flush('Product not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });

    it('should handle 500 server error', (done) => {
      service.getProducts().subscribe({
        next: () => done.fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          done();
        },
      });

      const req = httpTesting.expectOne('/api/products');
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should handle 400 bad request on create', (done) => {
      const invalidProduct = {
        name: '',
        price: -1,
        category: '',
        inStock: true,
      };

      service.createProduct(invalidProduct).subscribe({
        next: () => done.fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(400);
          done();
        },
      });

      const req = httpTesting.expectOne('/api/products');
      req.flush('Invalid product data', {
        status: 400,
        statusText: 'Bad Request',
      });
    });

    it('should handle network error', (done) => {
      service.getProducts().subscribe({
        next: () => done.fail('Expected error'),
        error: (error) => {
          expect(error.error).toBeTruthy();
          done();
        },
      });

      const req = httpTesting.expectOne('/api/products');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('Multiple Requests', () => {
    it('should handle multiple simultaneous requests', (done) => {
      let completedRequests = 0;
      const checkDone = () => {
        completedRequests++;
        if (completedRequests === 2) done();
      };

      service.getProducts().subscribe({
        next: (products) => {
          expect(products.length).toBe(2);
          checkDone();
        },
        error: done.fail,
      });

      service.getProduct(1).subscribe({
        next: (product) => {
          expect(product.id).toBe(1);
          checkDone();
        },
        error: done.fail,
      });

      const requests = httpTesting.match((req) => req.url.startsWith('/api/products'));
      expect(requests.length).toBe(2);

      requests[0].flush(mockProducts);
      requests[1].flush(mockProduct);
    });

    it('should handle sequential requests', (done) => {
      service.getProduct(1).subscribe({
        next: (product) => {
          expect(product.id).toBe(1);

          // Make second request after first completes
          service.updateProduct(1, { price: 200 }).subscribe({
            next: (updated) => {
              expect(updated.price).toBe(200);
              done();
            },
            error: done.fail,
          });

          const updateReq = httpTesting.expectOne('/api/products/1');
          expect(updateReq.request.method).toBe('PATCH');
          updateReq.flush({ ...product, price: 200 });
        },
        error: done.fail,
      });

      const getReq = httpTesting.expectOne('/api/products/1');
      expect(getReq.request.method).toBe('GET');
      getReq.flush(mockProduct);
    });
  });

  describe('Request Headers and Options', () => {
    it('should use correct content type for POST', (done) => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'Test',
        price: 100,
        category: 'Test',
        inStock: true,
      };

      service.createProduct(newProduct).subscribe({
        next: () => done(),
        error: done.fail,
      });

      const req = httpTesting.expectOne('/api/products');
      expect(req.request.headers.get('Content-Type')).toContain('application/json');
      req.flush({ id: 1, ...newProduct });
    });
  });
});

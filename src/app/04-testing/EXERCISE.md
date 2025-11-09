# תרגיל: בדיקות יחידה (Unit Testing) ב-Angular 20 עם Jest 🧪

## תיאור כללי

תרגיל מקיף זה נועד ללמד אתכם כיצד לכתוב בדיקות יחידה מודרניות ב-Angular 20 באמצעות **Jest**. התרגיל מכסה בדיקות של standalone components, signals, reactive forms, HTTP services, ופעולות אסינכרוניות - הכל בהקשר של אפליקציית קניות מקוונת.

**תרחיש:** אתם בונים אפליקציית קניות מקוונת עם קטלוג מוצרים, עגלת קניות, חיפוש ופילטרים, והזדהות משתמשים. לכל תכונה תכתבו בדיקות מקיפות שמבטיחות שהקוד עובד כמו שצריך.

**משך זמן משוער:** 4-5 שעות
**רמת קושי:** ביניים-מתקדמת
**טכנולוגיות:** Angular 20, Jest, Signals, Zoneless, Standalone Components, TypeScript

---

## 🎯 מטרות הלמידה

בסיום התרגיל תדעו לכתוב בדיקות עבור:

- ✅ **Standalone Components** עם signals ו-modern control flow
- ✅ **Signals** - signal(), computed(), effect()
- ✅ **HTTP Services** עם provideHttpClient/provideHttpClientTesting
- ✅ **Reactive Forms** עם validators מותאמים
- ✅ **Async Operations** עם fakeAsync, tick, waitForAsync
- ✅ **Zoneless Applications** עם provideExperimentalZonelessChangeDetection
- ✅ **Integration Tests** - בדיקות של flows מלאים
- ✅ **Test-Driven Development (TDD)** - כתיבת בדיקות לפני הקוד

---

## 💡 למה Jest ולא Karma?

### Karma הוצא משימוש (Deprecated)

מאז Angular 16, **Karma** הוצא משימוש. הסיבות:

- 🐌 **איטי** - דורש הרצת דפדפן לכל בדיקה
- 📦 **כבד** - תלוי בהרבה חבילות
- 🚫 **חסר תכונות מודרניות** - אין snapshot testing, parallel execution

### למה Jest?

- ⚡ **מהיר פי 10** - הרצה מקבילית של בדיקות
- 📸 **Snapshot Testing** - בדיקות קלות של UI
- 🎯 **Developer Experience** - תצוגה ברורה, watch mode מעולה
- 🔧 **Zero Config** - עובד out-of-the-box
- 🌍 **תקן בתעשייה** - משמש ב-React, Vue, Node.js

### דוגמת התקנה

```bash
# התקנת Jest
npm install --save-dev jest @types/jest jest-preset-angular

# הרצת בדיקות
npm test                # הרצה רגילה
npm run test:watch      # watch mode
npm run test:coverage   # דוח כיסוי
```

---

## 🏗️ מבנה בדיקה בסיסי

### אנטומיה של בדיקה

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ProductListComponent', () => {
  // 1. משתני בדיקה
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  // 2. Setup - רץ לפני כל בדיקה
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  // 3. בדיקה אינדיבידואלית
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

**מושגי מפתח:**

- **describe()** - מקבץ בדיקות קשורות (test suite)
- **beforeEach()** - קוד setup שרץ לפני כל בדיקה
- **it()** - בדיקה בודדת
- **expect()** - assertion על מה שצריך להיות נכון

**מה זה TestBed?**
- כלי עזר לבדיקות של Angular
- יוצר components בסביבת בדיקה מבודדת
- מספק dependency injection לבדיקות

**מה זה ComponentFixture?**
- wrapper סביב component לבדיקות
- מספק גישה ל:
  - `componentInstance` - מחלקת הקומפוננטה
  - `nativeElement` - ה-DOM האמיתי
  - `debugElement` - wrapper של Angular עם כלי עזר
  - `detectChanges()` - הפעלת change detection ידנית

---

## 📋 דרישות התרגיל

### חלק א': בדיקות בסיסיות (קל)

#### 1. ProductListComponent - בדיקת קומפוננטה עם Signals

צור/י קומפוננטה שמציגה רשימת מוצרים עם סינון.

**הקומפוננטה:**

```typescript
// product-list.component.ts
import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../shared/models/shop.models';

@Component({
  selector: 'app-product-list',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-list">
      <h2>{{ title() }}</h2>

      @if (loading()) {
        <div class="loading">טוען מוצרים...</div>
      } @else {
        @for (product of visibleProducts(); track product.id) {
          <div class="product-card" [class.out-of-stock]="!product.inStock">
            <h3>{{ product.name }}</h3>
            <p class="price">₪{{ product.price }}</p>
            <p class="category">{{ product.category }}</p>
            @if (!product.inStock) {
              <span class="badge">אזל מהמלאי</span>
            }
          </div>
        } @empty {
          <p class="empty-state">אין מוצרים להצגה</p>
        }
      }

      <div class="summary">
        סה"כ {{ productCount() }} מוצרים
      </div>
    </div>
  `
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
    return this.products().filter(p => p.category === filter);
  });

  productCount = computed(() => this.visibleProducts().length);
}
```

**הבדיקות שצריך לכתוב:**

```typescript
// product-list.component.spec.ts
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
      inStock: true
    },
    {
      id: 2,
      name: 'עכבר',
      price: 50,
      category: 'אביזרים',
      inStock: false
    },
    {
      id: 3,
      name: 'מקלדת',
      price: 150,
      category: 'אביזרים',
      inStock: true
    }
  ];

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // TODO: בדוק שהקומפוננטה נוצרה
  });

  it('should display all products', () => {
    // TODO: הגדר input של products
    // TODO: קרא ל-detectChanges()
    // TODO: בדוק שמספר ה-product-card שווה למספר המוצרים
  });

  it('should filter products by category', () => {
    // TODO: הגדר products ו-categoryFilter
    // TODO: בדוק שרק מוצרים מהקטגוריה המסוננת מוצגים
  });

  it('should display loading state', () => {
    // TODO: הגדר loading=true
    // TODO: בדוק שאלמנט .loading מוצג
  });

  it('should display empty state when no products', () => {
    // TODO: הגדר מערך ריק של products
    // TODO: בדוק שהמסר "אין מוצרים להצגה" מוצג
  });

  it('should mark out-of-stock products', () => {
    // TODO: בדוק שמוצרים שאזלו מהמלאי מקבלים class .out-of-stock
  });

  it('should compute title based on category filter', () => {
    // TODO: בדוק שהכותרת משתנה כשיש פילטר קטגוריה
  });

  it('should count visible products correctly', () => {
    // TODO: בדוק שהספירה נכונה עם ובלי פילטר
  });
});
```

**טיפים:**

- השתמשו ב-`componentRef.setInput()` להגדרת signal inputs
- זכרו לקרוא ל-`fixture.detectChanges()` אחרי שינוי inputs
- השתמשו ב-`querySelector` למציאת אלמנטים ב-DOM
- בדקו גם את התוכן (`textContent`) וגם את המבנה (מספר אלמנטים)

---

#### 2. ShoppingCartService - בדיקת Service עם Signals

צור/י service לניהול עגלת קניות.

**ה-Service:**

```typescript
// shopping-cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, Product } from '../../../shared/models/shop.models';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private items = signal<CartItem[]>([]);

  // Computed signals
  cartItems = computed(() => this.items());

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.items().reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0
    )
  );

  isEmpty = computed(() => this.items().length === 0);

  constructor() {
    // Effect לשמירה ב-localStorage
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.items()));
    });
  }

  addItem(product: Product, quantity: number = 1) {
    this.items.update(items => {
      const existingItem = items.find(i => i.product.id === product.id);

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...items, { product, quantity }];
    });
  }

  removeItem(productId: number) {
    this.items.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number) {
    this.items.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  clear() {
    this.items.set([]);
  }
}
```

**הבדיקות שצריך לכתוב:**

```typescript
// shopping-cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { Product } from '../../../shared/models/shop.models';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  const mockProduct: Product = {
    id: 1,
    name: 'מוצר בדיקה',
    price: 100,
    category: 'בדיקות',
    inStock: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    // TODO
  });

  it('should start with empty cart', () => {
    // TODO: בדוק ש-isEmpty() מחזיר true
    // TODO: בדוק ש-totalItems() שווה ל-0
  });

  it('should add item to cart', () => {
    // TODO: הוסף מוצר לעגלה
    // TODO: בדוק שהמוצר נוסף
    // TODO: בדוק שהכמות נכונה
  });

  it('should increment quantity when adding existing item', () => {
    // TODO: הוסף אותו מוצר פעמיים
    // TODO: בדוק שהכמות עלתה ל-2
    // TODO: בדוק שיש רק פריט אחד ברשימה
  });

  it('should remove item from cart', () => {
    // TODO: הוסף מוצר והסר אותו
    // TODO: בדוק שהעגלה ריקה
  });

  it('should update item quantity', () => {
    // TODO: הוסף מוצר ועדכן כמות
    // TODO: בדוק שהכמות התעדכנה
  });

  it('should calculate total items correctly', () => {
    // TODO: הוסף מספר מוצרים עם כמויות שונות
    // TODO: בדוק שסך הכמות נכון
  });

  it('should calculate total price correctly', () => {
    // TODO: הוסף מוצרים ובדוק חישוב מחיר
  });

  it('should clear cart', () => {
    // TODO: הוסף מוצרים ונקה
    // TODO: בדוק שהעגלה ריקה
  });

  it('should save to localStorage', () => {
    // TODO: הוסף מוצר
    // TODO: הפעל TestBed.flushEffects()
    // TODO: בדוק שהנתונים נשמרו ב-localStorage
  });
});
```

**טיפים:**

- Signals הם **סינכרוניים** - אין צורך ב-async/await
- השתמשו ב-`TestBed.flushEffects()` לבדיקת effects
- זכרו לנקות localStorage לפני ואחרי כל בדיקה
- computed signals מתעדכנים אוטומטית

---

### חלק ב': בדיקות HTTP (בינוני)

#### 3. ProductApiService - בדיקת HTTP Requests

צור/י service לשליפת מוצרים מ-API.

**ה-Service:**

```typescript
// product-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, SearchFilters } from '../../../shared/models/shop.models';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private http = inject(HttpClient);
  private apiUrl = '/api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  searchProducts(filters: SearchFilters): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}/search`, filters);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

**הבדיקות שצריך לכתוב:**

```typescript
// product-api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { ProductApiService } from './product-api.service';
import { Product } from '../../../shared/models/shop.models';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),           // חובה להיות ראשון!
        provideHttpClientTesting()     // override עם testing version
      ]
    });

    service = TestBed.inject(ProductApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // וודא שאין בקשות תלויות
    httpTesting.verify();
  });

  it('should fetch all products', () => {
    // TODO: קרא ל-getProducts()
    // TODO: השתמש ב-httpTesting.expectOne() לתפיסת הבקשה
    // TODO: בדוק שה-method הוא GET
    // TODO: השתמש ב-flush() לשליחת תשובה מדומה
    // TODO: בדוק שהנתונים התקבלו נכון
  });

  it('should fetch single product by id', () => {
    // TODO: קרא ל-getProduct(1)
    // TODO: בדוק שה-URL נכון (/api/products/1)
    // TODO: שלח תשובה מדומה
  });

  it('should search products with filters', () => {
    // TODO: קרא ל-searchProducts() עם filters
    // TODO: בדוק שזו בקשת POST
    // TODO: בדוק שה-body מכיל את הפילטרים
  });

  it('should create new product', () => {
    // TODO: קרא ל-createProduct()
    // TODO: בדוק את ה-request body
  });

  it('should update product', () => {
    // TODO: קרא ל-updateProduct()
    // TODO: בדוק שזו בקשת PATCH
  });

  it('should delete product', () => {
    // TODO: קרא ל-deleteProduct()
    // TODO: בדוק שזו בקשת DELETE
  });

  it('should handle HTTP error', () => {
    // TODO: סמלץ שגיאת שרת
    // TODO: השתמש ב-flush() עם status 500
    // TODO: בדוק שהשגיאה נתפסה
  });
});
```

**טיפים:**

- **סדר חשוב!** `provideHttpClient()` חייב להיות לפני `provideHttpClientTesting()`
- `expectOne()` תופס בקשה אחת - הבדיקה נכשלת אם יש יותר/פחות
- `flush()` שולח תשובה מדומה
- `verify()` מוודא שכל הבקשות טופלו

---

### חלק ג': Reactive Forms (בונוס - קשה)

#### 4. LoginFormComponent - בדיקת טפסים עם Validation

צור/י טופס התחברות עם validations מותאמים.

**הקומפוננטה:**

```typescript
// login-form.component.ts
import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { LoginCredentials } from '../../../../shared/models/shop.models';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>אימייל</label>
        <input type="email" formControlName="email" />
        @if (email?.errors?.['required'] && email?.touched) {
          <span class="error">שדה חובה</span>
        }
        @if (email?.errors?.['email']) {
          <span class="error">אימייל לא תקין</span>
        }
      </div>

      <div>
        <label>סיסמה</label>
        <input type="password" formControlName="password" />
        @if (password?.errors?.['required'] && password?.touched) {
          <span class="error">שדה חובה</span>
        }
        @if (password?.errors?.['minlength']) {
          <span class="error">סיסמה חייבת להכיל לפחות 8 תווים</span>
        }
        @if (password?.errors?.['weakPassword']) {
          <span class="error">סיסמה חלשה מדי</span>
        }
      </div>

      <button type="submit" [disabled]="form.invalid">התחבר</button>
    </form>
  `
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  loginSubmit = output<LoginCredentials>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      this.passwordStrengthValidator
    ]]
  });

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  // Custom validator
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);

    if (!hasNumber || !hasLetter) {
      return { weakPassword: true };
    }

    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginSubmit.emit(this.form.value as LoginCredentials);
    }
  }
}
```

**הבדיקות שצריך לכתוב:**

```typescript
// login-form.component.spec.ts
describe('LoginFormComponent', () => {
  // TODO: הגדר component ו-fixture

  it('should be invalid when empty', () => {
    // TODO
  });

  it('should validate email format', () => {
    // TODO: בדוק שאימייל לא תקין מחזיר שגיאה
    // TODO: בדוק שאימייל תקין עובר
  });

  it('should validate password min length', () => {
    // TODO
  });

  it('should validate password strength', () => {
    // TODO: בדוק שסיסמה בלי מספרים נכשלת
    // TODO: בדוק שסיסמה בלי אותיות נכשלת
    // TODO: בדוק שסיסמה עם שניהם עוברת
  });

  it('should emit loginSubmit when form is valid', () => {
    // TODO: השתמש ב-jest.fn() כ-spy
    // TODO: הגדר form values
    // TODO: קרא ל-onSubmit()
    // TODO: בדוק שה-output נקרא עם הערכים הנכונים
  });

  it('should not emit when form is invalid', () => {
    // TODO
  });

  it('should display error messages', () => {
    // TODO: סמן שדות כ-touched
    // TODO: בדוק שהודעות השגיאה מוצגות
  });
});
```

**טיפים:**

- טפסים הם **סינכרוניים** - אין צורך ב-detectChanges לבדיקת validation
- השתמשו ב-`jest.fn()` ליצירת spy functions
- בדקו גם את הלוגיקה וגם את ה-UI

---

#### 5. SearchFilterComponent - בדיקות Async עם Debounce

צור/י קומפוננטת חיפוש עם debouncing.

**הקומפוננטה:**

```typescript
// search-filter.component.ts
import { Component, output, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debouncedSignal } from '../../../../shared/utils/signal-utils';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule],
  template: `
    <div class="search-filter">
      <input
        type="text"
        [(ngModel)]="searchInput"
        placeholder="חפש מוצרים..."
        class="search-input"
      />

      @if (isSearching()) {
        <span class="searching">מחפש...</span>
      }

      <p class="results-count">
        נמצאו {{ resultsCount() }} תוצאות
      </p>
    </div>
  `
})
export class SearchFilterComponent implements OnInit {
  searchInput = signal('');
  debouncedSearch = debouncedSignal(this.searchInput, 300);
  isSearching = signal(false);
  resultsCount = signal(0);

  searchChange = output<string>();

  ngOnInit() {
    // כשהחיפוש המ-debounced משתנה, שלח אירוע
    effect(() => {
      const query = this.debouncedSearch();
      this.isSearching.set(false);
      this.searchChange.emit(query);
    });
  }

  performSearch(query: string) {
    this.isSearching.set(true);
    this.searchInput.set(query);
  }
}
```

**הבדיקות שצריך לכתוב:**

```typescript
// search-filter.component.spec.ts
import { fakeAsync, tick } from '@angular/core/testing';

describe('SearchFilterComponent', () => {
  // TODO: setup

  it('should debounce search input', fakeAsync(() => {
    // TODO: קרא ל-performSearch()
    // TODO: בדוק שלא נשלח searchChange מיד
    // TODO: tick(300) - המתן לסיום ה-debounce
    // TODO: בדוק ש-searchChange נשלח
  }));

  it('should show searching indicator', fakeAsync(() => {
    // TODO: בדוק שמוצג "מחפש..." בזמן ה-debounce
  }));

  it('should cancel previous search', fakeAsync(() => {
    // TODO: קרא ל-performSearch() פעמיים
    // TODO: בדוק שרק החיפוש האחרון נשלח
  }));
});
```

**טיפים:**

- `fakeAsync()` - יוצר "fake async zone" שבו אפשר לשלוט בזמן
- `tick(ms)` - מקדם את הזמן ב-ms מילישניות
- שימושי לבדיקת setTimeout, setInterval, debounce

---

#### 6. Cart Integration Tests - בדיקות אינטגרציה

צור/י בדיקות שבודקות flow מלא של הוספת מוצר לעגלה.

```typescript
// cart-integration.spec.ts
describe('Shopping Cart Integration', () => {
  let productList: ProductListComponent;
  let cartService: ShoppingCartService;
  let apiService: ProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ShoppingCartService,
        ProductApiService
      ]
    });

    cartService = TestBed.inject(ShoppingCartService);
    apiService = TestBed.inject(ProductApiService);
  });

  it('should complete full purchase flow', fakeAsync(() => {
    // TODO: 1. טען מוצרים מה-API
    // TODO: 2. הוסף מוצר לעגלה
    // TODO: 3. עדכן כמות
    // TODO: 4. בדוק מחיר כולל
    // TODO: 5. השלם רכישה
  }));

  it('should handle out-of-stock products', () => {
    // TODO: בדוק שאי אפשר להוסיף מוצר שאזל מהמלאי
  });

  it('should persist cart across page reloads', () => {
    // TODO: הוסף מוצרים
    // TODO: צור service חדש (מדמה reload)
    // TODO: בדוק שהעגלה נטענה מ-localStorage
  });
});
```

---

## 🧪 Zoneless Testing

Angular 20 תומך ב-**Zoneless** mode - אפליקציות בלי zone.js.

### הגדרת Zoneless

```typescript
// main.ts
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // ...
  ]
});
```

### בדיקות Zoneless

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideExperimentalZonelessChangeDetection()
    ]
  });
});

it('should update automatically without detectChanges', () => {
  component.count.set(5);
  // ב-zoneless, אין צורך ב-fixture.detectChanges()!
  // ה-UI מתעדכן אוטומטית

  expect(fixture.nativeElement.textContent).toContain('5');
});
```

**הבדלים עיקריים:**

- ✅ פחות `detectChanges()` ידניים
- ✅ Signals גורמים לעדכונים אוטומטיים
- ⚠️ צריך להיזהר עם async operations

---

## 📊 Best Practices

### 1. בדוק התנהגות, לא מימוש

**❌ רע:**
```typescript
it('should call loadProducts', () => {
  spyOn(component, 'loadProducts');
  component.ngOnInit();
  expect(component.loadProducts).toHaveBeenCalled();
});
```

**✅ טוב:**
```typescript
it('should display products after initialization', () => {
  fixture.detectChanges();
  const products = fixture.nativeElement.querySelectorAll('.product');
  expect(products.length).toBeGreaterThan(0);
});
```

### 2. שמות בדיקות תיאוריים

**❌ רע:** `it('should work', ...)`
**✅ טוב:** `it('should display error message when login fails with invalid credentials', ...)`

### 3. ארגון עם describe

```typescript
describe('ProductListComponent', () => {
  describe('Initialization', () => {
    it('should load products on init', ...);
    it('should set loading state', ...);
  });

  describe('Filtering', () => {
    it('should filter by category', ...);
    it('should filter by price range', ...);
  });

  describe('Error Handling', () => {
    it('should display error when API fails', ...);
  });
});
```

### 4. נקו אחרי עצמכם

```typescript
afterEach(() => {
  httpTesting.verify();
  localStorage.clear();
  sessionStorage.clear();
});
```

### 5. השתמשו ב-Signals לפשטות

**עם Signals:**
```typescript
it('should update count', () => {
  service.increment();
  expect(service.count()).toBe(1);
});
```

**בלי Signals (RxJS):**
```typescript
it('should update count', fakeAsync(() => {
  service.increment();
  tick();
  service.count$.subscribe(count => {
    expect(count).toBe(1);
  });
}));
```

---

## 🎯 סיכום

### מה למדתם

✅ הגדרת Jest ב-Angular 20
✅ בדיקות standalone components עם signals
✅ בדיקות modern control flow (@if, @for, @switch)
✅ בדיקות HTTP services
✅ בדיקות reactive forms ו-validators מותאמים
✅ בדיקות async operations
✅ בדיקות zoneless applications
✅ integration tests
✅ best practices ו-TDD

### Checklist בדיקות

לכל קומפוננטה/service:

- [ ] נוצר בהצלחה
- [ ] Inputs מעובדים נכון
- [ ] Outputs שולחים ערכים נכונים
- [ ] Template מתרנדר נכון
- [ ] אינטראקציות משתמש עובדות
- [ ] מצבי שגיאה מטופלים
- [ ] מצבי loading מוצגים
- [ ] בקשות HTTP נכונות
- [ ] Validation של טפסים עובד
- [ ] Validators מותאמים פועלים

### זכרו

- **בדקו התנהגות, לא מימוש**
- **שמות בדיקות תיאוריים**
- **ארגנו עם describe blocks**
- **התחילו פשוט, הוסיפו מורכבות**
- **Signals מפשטים בדיקות**

בהצלחה! 🧪✨

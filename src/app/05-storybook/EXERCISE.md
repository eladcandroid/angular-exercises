# תרגיל: Storybook ב-Angular 20 - בניית ספריית קומפוננטות 📚

## תיאור כללי

ברוכים הבאים לתרגיל המקיף של Storybook! בתרגיל זה תלמדו לבנות ולתעד קומפוננטות Angular באמצעות Storybook - כלי הפיתוח המוביל לבניית Design Systems.

**תרחיש**: ספרייה ציבורית מקומית מבקשת לפתוח מערכת לניהול השאלות ספרים. אתם צריכים לבנות את ה-UI Components ולתעד אותם כך שכל הצוות (מפתחים, מעצבים, QA) יוכלו להבין ולהשתמש בהם.

**משך זמן משוער**: 3-4 שעות
**רמת קושי**: ביניים-מתקדמת
**טכנולוגיות**: Storybook 8, Angular 20, CSF 3.0, Signals

---

## 🎯 מטרות הלמידה

בסיום התרגיל תדעו:

- ✅ להגדיר **stories** עם CSF (Component Story Format) 3.0
- ✅ להשתמש ב-**args** ו-**argTypes** לשליטה בקומפוננטות
- ✅ ליצור **interactive controls** דינמיים
- ✅ להשתמש ב-**actions addon** למעקב אחר events
- ✅ לכתוב **play functions** לבדיקות אוטומטיות
- ✅ ל**compose** stories מורכבות
- ✅ לתעד **נגישות** (Accessibility)
- ✅ ליצור **responsive stories**
- ✅ להשתמש ב-**decorators** ו-**loaders**

---

## 💡 מה זה Storybook ולמה זה חשוב?

### מהו Storybook?

**Storybook** הוא סביבת פיתוח UI המאפשרת לפתח ולתעד קומפוננטות בבידוד, ללא צורך להריץ את כל האפליקציה.

### היתרונות

🧱 **פיתוח מהיר יותר**
פיתחו קומפוננטות בלי צורך בניווט באפליקציה או מילוי טפסים.

📖 **תיעוד חי ואוטומטי**
התיעוד תמיד מעודכן ומשקף את המצב האמיתי של הקומפוננטה.

🧪 **בדיקות ויזואליות**
בדקו את כל המצבים האפשריים של הקומפוננטה במקום אחד.

♿ **נגישות מובנית**
a11y addon בודק אוטומטית נגישות ומזהה בעיות.

🎨 **Design System**
בסיס לבניית ספריית קומפוננטות עקבית ומתועדת.

👥 **שיתוף פעולה**
שפה משותפת בין מפתחים, מעצבים, ומנהלי מוצר.

### מי משתמש ב-Storybook?

- **GitHub** - כל ה-UI Components
- **Airbnb** - Design System
- **Slack** - Component Library
- **Microsoft** - Fluent UI
- **IBM** - Carbon Design System

Storybook הוא התקן בתעשייה עבור React, Vue, Angular ועוד.

---

## 🏗️ מבנה התרגיל

התרגיל כולל **5 קומפוננטות** מוכנות מראש:

1. **BookCardComponent** - הצגת כרטיס ספר בודד
2. **BookFilterComponent** - סינון ספרים לפי קטגוריה וחיפוש
3. **LoanFormComponent** - טופס השאלת ספר עם ולידציה
4. **BookListComponent** - רשימת ספרים עם מצבי תצוגה שונים
5. **LoanStatsComponent** - פאנל סטטיסטיקות השאלות

**המשימה שלכם**: לכתוב **stories** עבור כל קומפוננטה!

הקומפוננטות עצמן כבר מוכנות (קוד TypeScript/HTML/CSS). אתם צריכים רק ליצור קבצי `.stories.ts` שמציגים את המצבים השונים של הקומפוננטה.

---

## 📘 מה זה CSF 3.0?

**Component Story Format (CSF)** הוא פורמט סטנדרטי לכתיבת stories ב-Storybook.

### מבנה בסיסי

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { BookCardComponent } from './book-card';

// Meta - הגדרות כלליות לכל ה-stories של הקומפוננטה
const meta: Meta<BookCardComponent> = {
  title: 'Library/BookCard',
  component: BookCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BookCardComponent>;

// Story - מצב ספציפי אחד של הקומפוננטה
export const Default: Story = {
  args: {
    book: {
      id: 1,
      title: 'הארי פוטר ואבן החכמים',
      author: 'ג.ק. רולינג',
      // ... שאר השדות
    }
  }
};
```

### חלקי ה-Story

#### Meta (default export)
```typescript
const meta: Meta<BookCardComponent> = {
  title: 'Library/BookCard',           // מיקום בעץ הניווט
  component: BookCardComponent,         // הקומפוננטה עצמה
  tags: ['autodocs'],                   // tags מיוחדים
  argTypes: { /* הגדרות controls */ }, // אפשרויות שליטה
  decorators: [ /* wrappers */ ],       // עיטורים
  parameters: { /* הגדרות */ },         // פרמטרים נוספים
};
```

#### Story (named export)
```typescript
export const MyStory: Story = {
  args: {
    // כל ה-inputs של הקומפוננטה
    prop1: 'value',
    prop2: true,
  },
  play: async ({ canvasElement }) => {
    // בדיקות אוטומטיות (אופציונלי)
  }
};
```

---

## 📋 דרישות התרגיל

### חלק א': Stories בסיסיות (קל) ⭐

#### 1. BookCardComponent - כרטיס ספר

**מטרה**: ליצור stories שמציגות מצבים שונים של כרטיס ספר.

הקומפוננטה `BookCardComponent` מקבלת:
- **Input**: `book` (חובה) - אובייקט Book
- **Input**: `showActions` (ברירת מחדל: true) - האם להציג כפתורי פעולה
- **Input**: `compact` (ברירת מחדל: false) - תצוגה קומפקטית
- **Output**: `loanRequested` - נשלח כשלוחצים על "השאל"

**צרו את ה-stories הבאות**:

```typescript
// ✅ Default - ספר זמין רגיל
export const Default: Story = {
  args: {
    book: {
      id: 1,
      title: 'הארי פוטר ואבן החכמים',
      author: 'ג.ק. רולינג',
      isbn: '9789655521234',
      category: 'פנטזיה',
      publishYear: 1997,
      pages: 309,
      available: true,
      rating: 4.8,
    },
    showActions: true,
    compact: false,
  }
};

// ✅ Unavailable - ספר שאינו זמין
// ✅ Compact - תצוגה קומפקטית
// ✅ WithoutActions - ללא כפתורים
// ✅ HighRating - ספר עם דירוג מושלם (5.0)
```

**טיפים**:
- השתמשו ב-`argTypes` כדי להפוך את `showActions` ו-`compact` לבני שינוי
- הוסיפו `action` ל-`loanRequested` כדי לראות מתי הוא נשלח
- השתמשו ב-`decorator` כדי להגביל את רוחב הכרטיס (max-width: 300px)

---

#### 2. BookFilterComponent - סינון ספרים

**מטרה**: ליצור controls אינטראקטיביים לסינון.

הקומפוננטה מקבלת:
- **Input**: `categories` (חובה) - רשימת קטגוריות
- **Model**: `selectedCategory` - הקטגוריה שנבחרה (two-way binding)
- **Model**: `searchQuery` - טקסט חיפוש (two-way binding)
- **Output**: `filterChange` - נשלח כשהסינון משתנה

**צרו את ה-stories הבאות**:

```typescript
// ✅ Default - מצב ריק
export const Default: Story = {
  args: {
    categories: [
      'מדע בדיוני',
      'מתח',
      'רומנטיקה',
      'ביוגרפיה',
      'היסטוריה',
      'פנטזיה',
      'מדע'
    ],
    selectedCategory: '',
    searchQuery: '',
  }
};

// ✅ WithSelectedCategory - עם קטגוריה נבחרת
// ✅ WithSearchQuery - עם טקסט חיפוש
// ✅ AllFiltersActive - שני הסינונים יחד
```

**טיפים**:
- הוסיפו `control: 'select'` ל-`selectedCategory` ב-argTypes
- הוסיפו `control: 'text'` ל-`searchQuery`
- הוסיפו action ל-`filterChange`

---

### חלק ב': Stories מתקדמות (בינוני) ⭐⭐

#### 3. LoanFormComponent - טופס השאלה

**מטרה**: להציג מצבי טופס שונים כולל ולידציה.

הקומפוננטה מקבלת:
- **Input**: `book` (חובה) - הספר להשאלה
- **Input**: `disabled` (ברירת מחדל: false) - ביטול הטופס
- **Output**: `loanSubmit` - נשלח כששולחים את הטופס
- **Output**: `cancel` - נשלח כשמבטלים

**צרו את ה-stories הבאות**:

```typescript
// ✅ EmptyForm - טופס ריק
export const EmptyForm: Story = {
  args: {
    book: mockBook,
    disabled: false,
  }
};

// ✅ FilledForm - טופס מלא
// ✅ WithValidationErrors - עם שגיאות
// ✅ DisabledState - טופס מבוטל
```

**טיפים**:
- השתמשו ב-`render` function כדי להגדיר ערכים ראשוניים לשדות
- תעדו את כללי הולידציה ב-`parameters.docs`
- הוסיפו actions לשני ה-outputs

---

#### 4. BookListComponent - רשימת ספרים

**מטרה**: להציג layouts שונים ומצבי טעינה.

הקומפוננטה מקבלת:
- **Input**: `books` (חובה) - מערך ספרים
- **Input**: `layout` (ברירת מחדל: 'grid') - 'grid' או 'list'
- **Input**: `loading` (ברירת מחדל: false) - מצב טעינה
- **Output**: `bookSelected` - נשלח כשבוחרים ספר
- **Output**: `loanRequested` - נשלח כשרוצים להשאיל

**צרו את ה-stories הבאות**:

```typescript
// ✅ GridLayout - תצוגת רשת (ברירת מחדל)
export const GridLayout: Story = {
  args: {
    books: MOCK_BOOKS.slice(0, 6),
    layout: 'grid',
    loading: false,
  }
};

// ✅ ListLayout - תצוגת רשימה
// ✅ LoadingState - מצב טעינה עם skeleton
// ✅ EmptyState - ללא ספרים
// ✅ SingleBook - ספר אחד בלבד
// ✅ ManyBooks - 20 ספרים (גלילה)
```

**טיפים**:
- צרו helper function: `createMockBooks(count: number)`
- השתמשו ב-`decorator` להגבלת גובה (max-height) ב-ManyBooks
- הוסיפו `argTypes` עם `control: 'select'` ל-layout

---

#### 5. LoanStatsComponent - סטטיסטיקות

**מטרה**: להציג וריאציות של נתונים סטטיסטיים.

הקומפוננטה מקבלת:
- **Input**: `stats` (חובה) - אובייקט LoanStats
- **Input**: `showPopularBooks` (ברירת מחדל: true) - הצגת ספרים פופולריים

**צרו את ה-stories הבאות**:

```typescript
// ✅ NormalStats - סטטיסטיקות רגילות
export const NormalStats: Story = {
  args: {
    stats: {
      totalLoans: 150,
      activeLoans: 23,
      overdueLoans: 3,
      returnedLoans: 124,
      popularBooks: MOCK_BOOKS.slice(0, 3),
    },
    showPopularBooks: true,
  }
};

// ✅ ZeroStats - אין השאלות
// ✅ HighOverdue - אזהרה - הרבה איחורים
// ✅ WithoutPopularBooks - ללא רשימת ספרים פופולריים
```

**טיפים**:
- בצעו computed signal ל-percentage של overdue
- הוסיפו CSS class מיוחד כש-overdue גבוה (warning state)
- השתמשו ב-color coding (אדום לאזהרה)

---

### חלק ג': תכונות מתקדמות (מתקדם) ⭐⭐⭐

#### 6. Play Functions - בדיקות אוטומטיות

**מטרה**: ליצור story שבודקת אינטראקציה אוטומטית.

צרו story ל-`LoanFormComponent` שמבצעת:

```typescript
import { within, userEvent, expect } from '@storybook/test';

export const InteractiveLoanFlow: Story = {
  args: {
    book: mockBook,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // מלא את שם הלווה
    const nameInput = canvas.getByLabelText('שם מלא');
    await userEvent.type(nameInput, 'יוסי כהן');

    // מלא אימייל
    const emailInput = canvas.getByLabelText('אימייל');
    await userEvent.type(emailInput, 'yossi@example.com');

    // שלח את הטופס
    const submitBtn = canvas.getByRole('button', { name: /השאל/i });
    await userEvent.click(submitBtn);

    // ודא שה-action נקרא
    // (זה ייבדק ב-Actions panel)
  }
};
```

**טיפים**:
- השתמשו ב-`@storybook/test` (כבר מותקן)
- `within` מאפשר query בתוך canvas
- `userEvent` מדמה אינטראקציות אמיתיות
- הרצת ה-play מתבצעת אוטומטית כשפותחים את ה-story

---

#### 7. Accessibility Testing - בדיקת נגישות

**מטרה**: לוודא שהקומפוננטות נגישות.

צרו story שבודקת:
- **Focus management** - סדר tab נכון
- **ARIA labels** - תוויות לעיוורים
- **Keyboard navigation** - ניווט ב-keyboard
- **Color contrast** - ניגודיות צבעים

```typescript
export const AccessibleBookCard: Story = {
  args: {
    book: mockBook,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // בדוק שיש ARIA label
    const loanBtn = canvas.getByRole('button', { name: /השאל את הספר/i });
    expect(loanBtn).toHaveAttribute('aria-label');

    // בדוק keyboard navigation
    loanBtn.focus();
    await userEvent.keyboard('{Enter}');
  }
};
```

**טיפים**:
- פתחו את ה-**Accessibility addon** בפאנל התחתון
- Storybook יריץ בדיקות אוטומטיות ויראה אזהרות
- תקנו כל בעיה שמתגלה

---

#### 8. Component Composition - הרכבה

**מטרה**: ליצור story מורכב שמשלב מספר קומפוננטות.

צרו story שמשלב:
- `BookFilterComponent` (למעלה)
- `LoanStatsComponent` (צד)
- `BookListComponent` (מרכז)

```typescript
export const CompleteLibraryView: Story = {
  render: (args) => ({
    props: {
      books: signal(MOCK_BOOKS),
      selectedCategory: signal<BookCategory | ''>(''),
      searchQuery: signal(''),
      stats: computed(() => calculateStats(this.books())),
      filteredBooks: computed(() => filterBooks(
        this.books(),
        this.selectedCategory(),
        this.searchQuery()
      )),
    },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 300px; gap: 20px;">
        <div>
          <app-book-filter
            [categories]="categories"
            [(selectedCategory)]="selectedCategory"
            [(searchQuery)]="searchQuery">
          </app-book-filter>

          <app-book-list
            [books]="filteredBooks()"
            layout="grid">
          </app-book-list>
        </div>

        <app-loan-stats
          [stats]="stats()">
        </app-loan-stats>
      </div>
    `,
  }),
};
```

**טיפים**:
- השתמשו ב-`render` function לשליטה מלאה בתבנית
- צרו signals ו-computed כדי לחבר בין הקומפוננטות
- זו דוגמה ל-Container component

---

## 🎨 Addons חשובים

### 📊 Controls
**מה זה עושה**: מאפשר לשנות props בזמן אמת דרך הממשק.

```typescript
argTypes: {
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
  },
  disabled: {
    control: 'boolean',
  },
  title: {
    control: 'text',
  },
}
```

### 🎬 Actions
**מה זה עושה**: מציג לוג של כל ה-events שנפלטים מהקומפוננטה.

```typescript
argTypes: {
  loanRequested: {
    action: 'loan requested',
  },
}
```

### 📖 Docs
**מה זה עושה**: יוצר תיעוד אוטומטי מה-props וה-stories.

```typescript
const meta: Meta<MyComponent> = {
  tags: ['autodocs'], // מפעיל תיעוד אוטומטי
};
```

### ♿ Accessibility (a11y)
**מה זה עושה**: בודק אוטומטית בעיות נגישות.

- פותחים את ה-Accessibility tab
- רואים רשימת בעיות ואזהרות
- מקבלים הסברים והמלצות לתיקון

### 🎭 Interactions
**מה זה עושה**: מריץ ומציג play functions.

- מאפשר debug של play functions
- מציג כל step
- מאפשר להריץ מחדש

---

## 🧪 Best Practices

### ✅ דוגמאות טובות

#### שימוש ב-Args
```typescript
// ✅ טוב - כל ה-props ב-args
export const MyStory: Story = {
  args: {
    title: 'כותרת',
    enabled: true,
  }
};
```

```typescript
// ❌ לא טוב - הגדרה ישירה בתבנית
export const MyStory: Story = {
  render: () => ({
    template: `<my-component title="כותרת" [enabled]="true" />`
  })
};
```

#### שמות Story תיאוריים
```typescript
// ✅ טוב - שם שמתאר את המצב
export const UnavailableBook: Story = { /* ... */ };
export const LoadingState: Story = { /* ... */ };
export const WithValidationErrors: Story = { /* ... */ };
```

```typescript
// ❌ לא טוב - שמות כלליים
export const Story1: Story = { /* ... */ };
export const Test: Story = { /* ... */ };
export const Example: Story = { /* ... */ };
```

#### Story אחד = מצב אחד
```typescript
// ✅ טוב - כל story מצב אחד
export const EmptyForm: Story = { args: { /* empty */ } };
export const FilledForm: Story = { args: { /* filled */ } };
export const WithErrors: Story = { args: { /* errors */ } };
```

```typescript
// ❌ לא טוב - story אחד עם הרבה מצבים
export const AllStates: Story = {
  render: () => ({
    template: `
      <my-form />
      <my-form [filled]="true" />
      <my-form [errors]="true" />
    `
  })
};
```

---

## 🎯 סיכום ו-Checklist

### מה למדתם

- ✅ **CSF 3.0** - פורמט סטנדרטי לכתיבת stories
- ✅ **Args & ArgTypes** - שליטה דינמית בקומפוננטות
- ✅ **Controls & Actions** - ממשק אינטראקטיבי
- ✅ **Play Functions** - בדיקות אוטומטיות
- ✅ **Accessibility** - נגישות מובנית
- ✅ **Composition** - הרכבת קומפוננטות

### Checklist סופי

**Stories בסיסיות**:
- [ ] BookCardComponent - 5 stories (Default, Unavailable, Compact, WithoutActions, HighRating)
- [ ] BookFilterComponent - 4 stories (Default, WithSelectedCategory, WithSearchQuery, AllFiltersActive)

**Stories מתקדמות**:
- [ ] LoanFormComponent - 4 stories (EmptyForm, FilledForm, WithValidationErrors, DisabledState)
- [ ] BookListComponent - 6 stories (GridLayout, ListLayout, LoadingState, EmptyState, SingleBook, ManyBooks)
- [ ] LoanStatsComponent - 4 stories (NormalStats, ZeroStats, HighOverdue, WithoutPopularBooks)

**תכונות מתקדמות** (בונוס):
- [ ] Play function אחד לפחות ל-LoanFormComponent
- [ ] בדיקת נגישות עם a11y addon
- [ ] Story composition אחד (CompleteLibraryView)

**כללי**:
- [ ] כל story עם שם תיאורי
- [ ] Actions מוגדרים לכל ה-outputs
- [ ] ArgTypes עם controls שימושיים
- [ ] Decorators למקרים הנדרשים
- [ ] תיעוד אוטומטי מופעל (autodocs tag)

---

## 🚀 הרצת Storybook

```bash
# התחלת Storybook
npm run storybook

# build לסביבת production
npm run build-storybook
```

Storybook יפתח בכתובת: `http://localhost:6006`

---

## 📚 משאבים נוספים

- [Storybook Docs](https://storybook.js.org/docs)
- [Angular & Storybook](https://storybook.js.org/docs/angular/get-started/introduction)
- [Component Story Format 3.0](https://storybook.js.org/blog/component-story-format-3-0/)
- [Play Functions Guide](https://storybook.js.org/docs/angular/writing-stories/play-function)
- [Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y)

---

**בהצלחה! 📚✨**

זכרו: הקומפוננטות כבר מוכנות - אתם רק צריכים לכתוב את ה-stories שמתעדות אותן.
זוהי הזדמנות נהדרת ללמוד כיצד לבנות ספריית קומפוננטות מקצועית!

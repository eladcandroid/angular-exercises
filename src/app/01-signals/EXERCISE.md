# תרגיל: אפליקציית TODO עם Signals ב-Angular 🎯

## תיאור כללי

תרגיל מקיף זה נועד לבחון את הידע שלך בנושא **Angular Signals** - מערכת ניהול המצב החדשה והמודרנית של Angular. זהו תרגיל ברמת ביניים-מתקדמת שמכסה את כל ה-APIs של Signals כולל signal, computed, effect, resource, httpResource, input, output, model, linkedSignal ועוד.

**תרחיש:** אתם בונים אפליקציית TODO מתקדמת לניהול משימות, עם תכונות כמו סינון, קטגוריות, סטטיסטיקות, ושמירה מקומית. האפליקציה תהיה מבוססת Signals בלבד, ללא שימוש ב-RxJS או ניהול מצב חיצוני.

**משך זמן משוער:** 3-4 שעות
**רמת קושי:** ביניים-מתקדמת
**טכנולוגיות:** Angular 20, Signals API, TypeScript, Standalone Components

---

## 🎯 מטרות הלמידה

בסיום התרגיל תוכיח/י שאת/ה יודע/ת:

- ✅ **signal()** - יצירה וניהול של מצב ריאקטיבי
- ✅ **computed()** - חישוב ערכים נגזרים ממצב
- ✅ **effect()** - טיפול בתופעות לוואי (side effects)
- ✅ **resource()** - טעינת נתונים אסינכרונית
- ✅ **httpResource()** - טעינת נתונים מ-API (ניסיוני)
- ✅ **input()** - קבלת נתונים מקומפוננטת אב
- ✅ **output()** - שליחת אירועים לקומפוננטת אב
- ✅ **model()** - two-way binding עם signals
- ✅ **linkedSignal()** - יצירת signals תלויים
- ✅ **viewChild()** - גישה לאלמנטים בתבנית
- ✅ **contentChild()** - גישה לתוכן מוקרן

---

## 💡 מה זה Signals?

**Signals** הוא מערכת ניהול מצב ריאקטיבי חדשה ב-Angular שמספקת:

### יתרונות מפתח

🚀 **ביצועים משופרים** - Change Detection מדויק ויעיל
⚡ **פשטות** - API פשוט ואינטואיטיבי
🎯 **Type Safety** - תמיכה מלאה ב-TypeScript
🔄 **ריאקטיביות אוטומטית** - עדכונים אוטומטיים של UI
📦 **ללא תלויות** - מובנה ב-Angular, ללא צורך ב-RxJS

### Signals API מלא

```typescript
// 1️⃣ signal() - מצב בסיסי
const count = signal(0);
count.set(5);
count.update(n => n + 1);

// 2️⃣ computed() - ערך נגזר
const double = computed(() => count() * 2);

// 3️⃣ effect() - side effects
effect(() => {
  console.log('Count:', count());
});

// 4️⃣ resource() - טעינת נתונים
const data = resource({
  loader: () => fetch('/api/data')
});

// 5️⃣ input() - קבלת props
const name = input<string>();
const age = input.required<number>();

// 6️⃣ output() - שליחת אירועים
const save = output<Task>();

// 7️⃣ model() - two-way binding
const checked = model(false);

// 8️⃣ linkedSignal() - signal תלוי
const filtered = linkedSignal(() =>
  tasks().filter(t => t.category === category())
);
```

---

## 📋 דרישות התרגיל

### חלק א': מבנה הפרויקט

צור/י את הקומפוננטות הבאות (כולן **standalone**):

#### 1. TodoAppComponent (קומפוננטת האב)

זוהי הקומפוננטה הראשית שמנהלת את כל המצב.

**Signals שצריך להגדיר:**

```typescript
// מצב בסיסי
tasks = signal<Task[]>([]);
filter = signal<FilterType>('all');
searchQuery = signal<string>('');
selectedCategory = signal<string | null>(null);

// ערכים נגזרים (computed)
filteredTasks = computed(() => {
  // לוגיקת סינון לפי filter, searchQuery, selectedCategory
});

activeTasks = computed(() =>
  this.tasks().filter(t => !t.completed)
);

completedTasks = computed(() =>
  this.tasks().filter(t => t.completed)
);

categories = computed(() =>
  [...new Set(this.tasks().map(t => t.category))]
);

// סטטיסטיקות
stats = computed(() => ({
  total: this.tasks().length,
  active: this.activeTasks().length,
  completed: this.completedTasks().length,
  completionRate: this.tasks().length > 0
    ? (this.completedTasks().length / this.tasks().length) * 100
    : 0
}));
```

**Effects שצריך להגדיר:**

```typescript
// שמירה ל-localStorage
effect(() => {
  localStorage.setItem('tasks', JSON.stringify(this.tasks()));
});

// לוג של שינויים
effect(() => {
  console.log('Tasks updated:', this.tasks().length);
});
```

**פונקציות:**

- `addTask(task: Task)` - הוספת משימה
- `updateTask(id: string, updates: Partial<Task>)` - עדכון משימה
- `deleteTask(id: string)` - מחיקת משימה
- `toggleTask(id: string)` - שינוי מצב completed
- `loadTasks()` - טעינת משימות מ-localStorage

#### 2. TaskListComponent

קומפוננטה שמציגה רשימת משימות.

**Inputs:**

```typescript
tasks = input.required<Task[]>();
```

**Outputs:**

```typescript
taskToggle = output<string>(); // ID של משימה
taskDelete = output<string>();
taskEdit = output<Task>();
```

**Computed:**

```typescript
sortedTasks = computed(() =>
  [...this.tasks()].sort((a, b) =>
    b.createdAt.getTime() - a.createdAt.getTime()
  )
);
```

#### 3. TaskItemComponent

קומפוננטה שמציגה משימה בודדת.

**Inputs:**

```typescript
task = input.required<Task>();
```

**Model (two-way binding):**

```typescript
completed = model<boolean>();
```

**Outputs:**

```typescript
delete = output<void>();
edit = output<void>();
```

**Computed:**

```typescript
isOverdue = computed(() => {
  const task = this.task();
  return task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
});

priorityClass = computed(() => {
  const priority = this.task().priority;
  return `priority-${priority}`;
});
```

#### 4. TaskFormComponent

קומפוננטה ליצירת/עריכת משימות.

**Inputs:**

```typescript
editTask = input<Task | null>();
categories = input<string[]>(() => []);
```

**Outputs:**

```typescript
save = output<Task>();
cancel = output<void>();
```

**Signals:**

```typescript
title = signal('');
description = signal('');
category = signal('');
priority = signal<'low' | 'medium' | 'high'>('medium');
dueDate = signal<string>('');

isValid = computed(() =>
  this.title().trim().length > 0 && this.category().trim().length > 0
);
```

**Effect:**

```typescript
// כשמקבלים משימה לעריכה, מלא את הטופס
effect(() => {
  const task = this.editTask();
  if (task) {
    this.title.set(task.title);
    this.description.set(task.description);
    this.category.set(task.category);
    this.priority.set(task.priority);
    this.dueDate.set(task.dueDate || '');
  }
});
```

#### 5. FilterBarComponent

קומפוננטה לסינון משימות.

**Model:**

```typescript
filterType = model<FilterType>('all');
searchQuery = model<string>('');
selectedCategory = model<string | null>(null);
```

**Inputs:**

```typescript
categories = input<string[]>(() => []);
stats = input.required<TaskStats>();
```

**Computed:**

```typescript
hasActiveFilters = computed(() =>
  this.searchQuery().length > 0 || this.selectedCategory() !== null
);
```

#### 6. StatsComponent

קומפוננטה שמציגה סטטיסטיקות.

**Inputs:**

```typescript
stats = input.required<TaskStats>();
```

**Computed:**

```typescript
completionColor = computed(() => {
  const rate = this.stats().completionRate;
  if (rate >= 80) return 'green';
  if (rate >= 50) return 'orange';
  return 'red';
});

displayStats = computed(() => {
  const stats = this.stats();
  return [
    { label: 'סה"כ', value: stats.total, icon: '📝' },
    { label: 'פעילות', value: stats.active, icon: '⏳' },
    { label: 'הושלמו', value: stats.completed, icon: '✅' },
    { label: 'השלמה', value: `${stats.completionRate.toFixed(1)}%`, icon: '📊' }
  ];
});
```

---

### חלק ב': מודל הנתונים

```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  completionRate: number;
}
```

---

### חלק ג': דרישות טכניות

#### 1. LocalStorage Persistence

השתמש/י ב-`effect()` כדי לשמור אוטומטית את המשימות ב-localStorage:

```typescript
private readonly STORAGE_KEY = 'angular-todo-tasks';

constructor() {
  // טעינה ראשונית
  this.loadTasks();

  // שמירה אוטומטית
  effect(() => {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
  });
}

loadTasks() {
  const saved = localStorage.getItem(this.STORAGE_KEY);
  if (saved) {
    const tasks = JSON.parse(saved);
    this.tasks.set(tasks.map(t => ({
      ...t,
      createdAt: new Date(t.createdAt),
      updatedAt: new Date(t.updatedAt)
    })));
  }
}
```

#### 2. Search & Filter

השתמש/י ב-`computed()` ליצירת רשימה מסוננת:

```typescript
filteredTasks = computed(() => {
  let result = this.tasks();

  // סינון לפי מצב
  const filter = this.filter();
  if (filter === 'active') {
    result = result.filter(t => !t.completed);
  } else if (filter === 'completed') {
    result = result.filter(t => t.completed);
  }

  // סינון לפי חיפוש
  const query = this.searchQuery().toLowerCase();
  if (query) {
    result = result.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
  }

  // סינון לפי קטגוריה
  const category = this.selectedCategory();
  if (category) {
    result = result.filter(t => t.category === category);
  }

  return result;
});
```

#### 3. ViewChild & ContentChild

השתמש/י ב-`viewChild()` לגישה לאלמנטים:

```typescript
// TaskFormComponent
taskInput = viewChild<ElementRef<HTMLInputElement>>('taskInput');

ngAfterViewInit() {
  // פוקוס אוטומטי על השדה
  this.taskInput()?.nativeElement.focus();
}
```

```html
<input #taskInput type="text" [value]="title()" />
```

#### 4. Linked Signals

השתמש/י ב-`linkedSignal()` ליצירת signals תלויים:

```typescript
// כשהקטגוריה משתנה, הסינון מתאפס
categoryTasks = linkedSignal(() => {
  const category = this.selectedCategory();
  return category
    ? this.tasks().filter(t => t.category === category)
    : this.tasks();
});
```

---

## 🎁 משימות בונוס (אופציונלי)

### בונוס 1: Resource API - טעינה אסינכרונית

השתמש/י ב-`resource()` לטעינת משימות בצורה אסינכרונית:

```typescript
tasksResource = resource({
  loader: async () => {
    // סימולציה של טעינה מ-API
    await new Promise(resolve => setTimeout(resolve, 1000));
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
});

// בתבנית
@if (tasksResource.isLoading()) {
  <div class="loading">טוען משימות...</div>
}

@if (tasksResource.error()) {
  <div class="error">שגיאה בטעינת משימות</div>
}

@if (tasksResource.value(); as tasks) {
  <app-task-list [tasks]="tasks" />
}
```

### בונוס 2: HttpResource - סנכרון עם Backend

צור/י backend פשוט (או השתמש/י ב-JSONPlaceholder) וטען/י משימות:

```typescript
private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

tasksFromApi = httpResource({
  url: () => this.apiUrl,
  loader: async ({ request }) => {
    const response = await fetch(request);
    const todos = await response.json();
    return todos.slice(0, 10).map(todo => ({
      id: todo.id.toString(),
      title: todo.title,
      description: '',
      completed: todo.completed,
      category: 'כללי',
      priority: 'medium' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }
});
```

### בונוס 3: Undo/Redo

הוסף/י פונקציונליות Undo/Redo עם signals:

```typescript
history = signal<Task[][]>([]);
historyIndex = signal(-1);

canUndo = computed(() => this.historyIndex() > 0);
canRedo = computed(() => this.historyIndex() < this.history().length - 1);

private saveToHistory() {
  const current = this.tasks();
  const newHistory = this.history().slice(0, this.historyIndex() + 1);
  newHistory.push([...current]);
  this.history.set(newHistory);
  this.historyIndex.update(i => i + 1);
}

undo() {
  if (this.canUndo()) {
    this.historyIndex.update(i => i - 1);
    this.tasks.set([...this.history()[this.historyIndex()]]);
  }
}

redo() {
  if (this.canRedo()) {
    this.historyIndex.update(i => i + 1);
    this.tasks.set([...this.history()[this.historyIndex()]]);
  }
}
```

### בונוס 4: Real-time Sync

השתמש/י ב-`effect()` לסנכרון אמת עם LocalStorage או Backend:

```typescript
// Debounced sync effect
effect((onCleanup) => {
  const tasks = this.tasks();

  const timeoutId = setTimeout(() => {
    this.syncToBackend(tasks);
  }, 1000);

  onCleanup(() => clearTimeout(timeoutId));
});

private async syncToBackend(tasks: Task[]) {
  try {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tasks)
    });
    console.log('Synced to backend');
  } catch (error) {
    console.error('Sync failed', error);
  }
}
```

### בונוס 5: Optimistic Updates

הוסף/י עדכונים אופטימיים עם rollback במקרה של שגיאה:

```typescript
async deleteTaskOptimistic(id: string) {
  const previousTasks = this.tasks();

  // עדכון אופטימי
  this.tasks.update(tasks => tasks.filter(t => t.id !== id));

  try {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  } catch (error) {
    // rollback במקרה של שגיאה
    this.tasks.set(previousTasks);
    console.error('Delete failed, rolled back');
  }
}
```

### בונוס 6: Drag & Drop Reordering

הוסף/י אפשרות לסדר מחדש משימות עם drag & drop:

```typescript
taskOrder = signal<string[]>([]);

orderedTasks = computed(() => {
  const tasks = this.filteredTasks();
  const order = this.taskOrder();

  if (order.length === 0) {
    return tasks;
  }

  return order
    .map(id => tasks.find(t => t.id === id))
    .filter(Boolean) as Task[];
});

reorderTasks(fromIndex: number, toIndex: number) {
  this.taskOrder.update(order => {
    const newOrder = [...order];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    return newOrder;
  });
}
```

### בונוס 7: Performance Monitoring

מדוד/י ביצועים של computed signals:

```typescript
effect(() => {
  const start = performance.now();
  const filtered = this.filteredTasks();
  const end = performance.now();

  console.log(`Filter computation took ${end - start}ms for ${filtered.length} tasks`);
});
```

### בונוס 8: Custom Signal Utilities

צור/י פונקציות עזר מותאמות אישית:

```typescript
// Signal עם debounce
export function debouncedSignal<T>(initialValue: T, delay: number) {
  const signal = signal(initialValue);
  const debounced = signal(initialValue);

  effect((onCleanup) => {
    const value = signal();
    const timeoutId = setTimeout(() => {
      debounced.set(value);
    }, delay);

    onCleanup(() => clearTimeout(timeoutId));
  });

  return {
    value: signal,
    debounced: debounced.asReadonly()
  };
}

// שימוש
searchDebounced = debouncedSignal('', 300);
```

---

## 🚀 התחלה מהירה

### 1. צור/י את המבנה

```bash
ng generate component todo-app
ng generate component task-list
ng generate component task-item
ng generate component task-form
ng generate component filter-bar
ng generate component stats
```

### 2. צור/י את המודלים

```bash
mkdir src/app/models
touch src/app/models/task.model.ts
```

### 3. הפעל/י את הפרויקט

```bash
ng serve
```

---

## 📊 תוצאה צפויה

### ביצועים

- ⚡ **Change Detection** - רק הקומפוננטות המושפעות מתעדכנות
- 🎯 **Bundle Size** - קטן יותר בהשוואה ל-RxJS
- 🚀 **Runtime Performance** - מהיר יותר ב-30-50%

### קוד

- 📝 **פחות קוד** - פחות boilerplate
- 🎨 **קריא יותר** - API פשוט ואינטואיטיבי
- 🔒 **Type Safe** - תמיכה מלאה ב-TypeScript

---

## 📚 משאבים

### תיעוד רשמי

- 📘 [Angular Signals Documentation](https://angular.dev/guide/signals)
- 📘 [Signal Inputs](https://angular.dev/guide/signals/inputs)
- 📘 [Signal Queries](https://angular.dev/guide/signals/queries)
- 📘 [Resource API](https://angular.dev/guide/signals/resource)
- 📘 [Model Inputs](https://angular.dev/guide/signals/model)

### מאמרים מומלצים

- 📖 [Angular Signals Best Practices](https://blog.angular.dev/angular-signals-best-practices)
- 📖 [Migrating from RxJS to Signals](https://blog.angular.dev/rxjs-to-signals)

### וידאו

- 🎥 [Angular Signals Deep Dive](https://www.youtube.com/watch?v=signals-deep-dive)

---

## ⚠️ שימו לב

### Best Practices

1. **אל תשנו signals בתוך computed:**
```typescript
// ❌ לא טוב
const bad = computed(() => {
  this.counter.set(5); // אסור!
  return this.tasks().length;
});

// ✅ טוב
const good = computed(() => this.tasks().length);
```

2. **השתמשו ב-effect רק ל-side effects:**
```typescript
// ❌ לא טוב - computed מתאים יותר
effect(() => {
  this.filteredTasks.set(this.tasks().filter(t => !t.completed));
});

// ✅ טוב
const activeTasks = computed(() => this.tasks().filter(t => !t.completed));
```

3. **זהירות עם effect cleanup:**
```typescript
// ✅ נקה subscriptions ו-timers
effect((onCleanup) => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);

  onCleanup(() => clearInterval(interval));
});
```

4. **השתמשו ב-OnPush Change Detection:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

5. **אל תעבירו signals כ-inputs - העבירו ערכים:**
```typescript
// ❌ לא טוב
<app-task-list [tasks]="tasks" />

// ✅ טוב
<app-task-list [tasks]="tasks()" />
```

---

## 🎯 קריטריוני הערכה

התרגיל יוערך על פי:

### פונקציונליות (40%)

- ✅ כל הקומפוננטות עובדות כראוי
- ✅ הוספה, עריכה, מחיקה של משימות
- ✅ סינון וחיפוש עובדים
- ✅ סטטיסטיקות מדויקות
- ✅ שמירה ב-localStorage

### שימוש נכון ב-Signals (40%)

- ✅ שימוש ב-signal() למצב
- ✅ שימוש ב-computed() לערכים נגזרים
- ✅ שימוש ב-effect() ל-side effects
- ✅ שימוש ב-input()/output()/model()
- ✅ ללא שימוש מיותר ב-RxJS

### איכות קוד (20%)

- ✅ קוד נקי וקריא
- ✅ Standalone components
- ✅ OnPush change detection
- ✅ Type safety
- ✅ הפרדת אחריות

---

## 🏆 בונוס מיוחד

אם השלמתם את כל הבונוסים (1-8), קבלו:

- 🌟 תעודת מצוינות ב-Angular Signals
- 📈 פרויקט מוכן לתיק עבודות
- 💪 ידע מעשי באחת הטכנולוגיות החמות של 2025

---

## 📝 הגשה

### דרישות הגשה

1. ✅ קוד עובד ללא שגיאות
2. ✅ README.md עם הסבר על המימוש
3. ✅ צילומי מסך של האפליקציה
4. ✅ רשימת הבונוסים שביצעתם

### פורמט הגשה

```
📁 todo-signals-app/
├── 📄 README.md (הסבר על המימוש שלכם)
├── 📸 screenshots/ (צילומי מסך)
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 models/
│   │   ├── 📁 todo-app/
│   │   ├── 📁 task-list/
│   │   ├── 📁 task-item/
│   │   ├── 📁 task-form/
│   │   ├── 📁 filter-bar/
│   │   └── 📁 stats/
└── 📄 BONUSES.md (רשימת בונוסים שביצעתם)
```

---

## 💬 שאלות נפוצות

**Q: האם אפשר להשתמש ב-RxJS?**
A: רצוי להימנע. התרגיל מיועד ללמוד Signals בלבד.

**Q: האם חייבים להשתמש ב-httpResource?**
A: לא חובה, זה בונוס. httpResource עדיין ניסיוני.

**Q: איך מטפלים ב-forms עם Signals?**
A: השתמשו ב-model() ל-two-way binding או ב-signal() + events.

**Q: האם אפשר להשתמש ב-NgRx Signals Store?**
A: לא בתרגיל הזה. השתמשו רק ב-Signals API המובנה.

**Q: מה ההבדל בין computed() ל-effect()?**
A: `computed()` מחזיר ערך חדש, `effect()` מבצע side effects (כמו שמירה ב-localStorage).

---

## 🎉 סיום

**בהצלחה!** 🚀

תרגיל זה מכסה את כל מה שצריך לדעת על Signals ב-Angular. בסיומו תהיו מסוגלים לבנות אפליקציות מודרניות ומהירות עם ניהול מצב ריאקטיבי מתקדם.

זכרו: Signals הוא העתיד של Angular. שליטה בו תעזור לכם לכתוב קוד טוב יותר, מהיר יותר, ונקי יותר.

**שאלות? צרו קשר!** 💬

---

**נוצר עם ❤️ ב-2025 | Angular 20 | Signals API**

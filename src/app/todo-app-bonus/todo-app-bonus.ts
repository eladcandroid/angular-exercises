import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  resource,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, FilterType, TaskStats } from '../models/task.model';
import {
  PerformanceMetrics,
  SyncState,
  DataSource,
} from '../models/performance.model';
import { debouncedSignal } from '../utils/signal-utils';
import { BonusControlPanelComponent } from './bonus-control-panel/bonus-control-panel';
import { PerformanceMonitorComponent } from './performance-monitor/performance-monitor';
import { SyncStatusComponent } from './sync-status/sync-status';
import { DragDropTaskListComponent } from './drag-drop-task-list/drag-drop-task-list';
import { TaskListComponent } from '../todo-app/task-list/task-list';
import { TaskFormComponent } from '../todo-app/task-form/task-form';
import { FilterBarComponent } from '../todo-app/filter-bar/filter-bar';
import { StatsComponent } from '../todo-app/stats/stats';

@Component({
  selector: 'app-todo-app-bonus',
  imports: [
    BonusControlPanelComponent,
    PerformanceMonitorComponent,
    SyncStatusComponent,
    DragDropTaskListComponent,
    TaskListComponent,
    TaskFormComponent,
    FilterBarComponent,
    StatsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-app-bonus.html',
  styleUrl: './todo-app-bonus.scss',
})
export class TodoAppBonusComponent {
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'angular-todo-tasks-bonus';
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';

  // Feature toggles
  useResource = signal(false);
  useHttpResource = signal(false);
  enableSync = signal(false);
  enableOptimistic = signal(false);
  enableDragDrop = signal(false);
  showPerformance = signal(true);

  // Basic state signals
  tasks = signal<Task[]>([]);
  filter = signal<FilterType>('all');
  selectedCategory = signal<string | null>(null);
  editingTask = signal<Task | null>(null);
  showForm = signal(false);

  // Data source
  dataSource = signal<DataSource>('localStorage');
  syncState = signal<SyncState>({
    status: 'idle',
    lastSync: null,
    error: null,
  });

  // Undo/Redo (Bonus 3)
  history = signal<Task[][]>([]);
  historyIndex = signal(-1);

  // Drag & Drop (Bonus 6)
  taskOrder = signal<string[]>([]);

  // Debounced search (Bonus 8)
  private searchSignal = debouncedSignal('', 300);
  searchQuery = this.searchSignal.value;
  searchDebounced = this.searchSignal.debounced;

  // Performance metrics (Bonus 7)
  performanceMetrics = signal<PerformanceMetrics>({
    filterComputationTime: 0,
    tasksProcessed: 0,
    recomputationCount: 0,
    averageTime: 0,
    lastUpdate: new Date(),
  });

  // Resource API (Bonus 1) - async loading from localStorage
  tasksResource = resource({
    loader: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const tasks = JSON.parse(saved);
        return tasks.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
        })) as Task[];
      }
      return [];
    },
  });

  // Computed signals
  filteredTasks = computed(() => {
    let result = this.useResource() && this.tasksResource.value()
      ? this.tasksResource.value()!
      : this.tasks();

    // Filter by status
    const filterType = this.filter();
    if (filterType === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filterType === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Filter by search query (debounced)
    const query = this.searchDebounced().toLowerCase();
    if (query) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    const category = this.selectedCategory();
    if (category) {
      result = result.filter((t) => t.category === category);
    }

    return result;
  });

  orderedTasks = computed(() => {
    const tasks = this.filteredTasks();
    const order = this.taskOrder();

    if (!this.enableDragDrop() || order.length === 0) {
      return tasks;
    }

    // Return tasks in the custom order, followed by any new tasks not in the order
    const orderedTasks = order
      .map((id) => tasks.find((t) => t.id === id))
      .filter(Boolean) as Task[];

    const newTasks = tasks.filter((t) => !order.includes(t.id));

    return [...orderedTasks, ...newTasks];
  });

  activeTasks = computed(() => this.tasks().filter((t) => !t.completed));

  completedTasks = computed(() => this.tasks().filter((t) => t.completed));

  categories = computed(() =>
    [...new Set(this.tasks().map((t) => t.category))].sort()
  );

  stats = computed<TaskStats>(() => {
    const total = this.tasks().length;
    const active = this.activeTasks().length;
    const completed = this.completedTasks().length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, active, completed, completionRate };
  });

  canUndo = computed(() => this.historyIndex() > 0);
  canRedo = computed(() => this.historyIndex() < this.history().length - 1);

  constructor() {
    // Load tasks from localStorage initially
    this.loadTasks();

    // Auto-save to localStorage
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(
          tasks.map((t) => ({
            ...t,
            createdAt: t.createdAt.toISOString(),
            updatedAt: t.updatedAt.toISOString(),
          }))
        )
      );
    });

    // Real-time sync effect (Bonus 4)
    effect((onCleanup) => {
      if (!this.enableSync()) return;

      const tasks = this.tasks();
      this.syncState.update((state) => ({ ...state, status: 'syncing' }));

      const timeoutId = setTimeout(() => {
        this.syncToBackend(tasks);
      }, 1000);

      onCleanup(() => clearTimeout(timeoutId));
    });

    // Load from resource when enabled
    effect(() => {
      if (this.useResource() && this.tasksResource.value()) {
        const resourceTasks = this.tasksResource.value();
        if (resourceTasks) {
          this.tasks.set(resourceTasks);
        }
      }
    });

    // Load from HTTP resource when enabled (Bonus 2)
    effect(() => {
      if (this.useHttpResource()) {
        this.loadFromApi();
      }
    });

    // Update task order when drag & drop is enabled
    effect(() => {
      if (this.enableDragDrop()) {
        const taskIds = this.tasks().map((t) => t.id);
        this.taskOrder.set(taskIds);
      }
    });

    // Performance monitoring effect (Bonus 7)
    effect(() => {
      const start = performance.now();
      const filtered = this.filteredTasks();
      const end = performance.now();
      const computationTime = end - start;

      this.performanceMetrics.update((metrics) => {
        const newCount = metrics.recomputationCount + 1;
        const newAverage =
          (metrics.averageTime * metrics.recomputationCount + computationTime) /
          newCount;
        return {
          filterComputationTime: computationTime,
          tasksProcessed: filtered.length,
          recomputationCount: newCount,
          averageTime: newAverage,
          lastUpdate: new Date(),
        };
      });
    });
  }

  loadTasks() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const tasks = JSON.parse(saved);
      this.tasks.set(
        tasks.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
        }))
      );
    }
  }

  async loadFromApi() {
    try {
      this.syncState.update((state) => ({ ...state, status: 'syncing' }));

      const todos = await this.http
        .get<any[]>(this.API_URL)
        .toPromise();

      if (todos) {
        const tasks: Task[] = todos.slice(0, 10).map((todo) => ({
          id: todo.id.toString(),
          title: todo.title,
          description: '',
          completed: todo.completed,
          category: 'כללי',
          priority: 'medium' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        this.tasks.set(tasks);
        this.dataSource.set('api');
        this.syncState.set({
          status: 'synced',
          lastSync: new Date(),
          error: null,
        });
      }
    } catch (error) {
      console.error('Failed to load from API:', error);
      this.syncState.set({
        status: 'error',
        lastSync: null,
        error: 'שגיאה בטעינת נתונים מה-API',
      });
    }
  }

  private async syncToBackend(tasks: Task[]) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.syncState.set({
        status: 'synced',
        lastSync: new Date(),
        error: null,
      });

      console.log('Synced to backend:', tasks.length, 'tasks');
    } catch (error) {
      console.error('Sync failed:', error);
      this.syncState.set({
        status: 'error',
        lastSync: null,
        error: 'שגיאה בסנכרון',
      });
    }
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
    this.saveToHistory();
    this.showForm.set(false);
    this.editingTask.set(null);

    // Update task order for drag & drop
    if (this.enableDragDrop()) {
      this.taskOrder.update((order) => [...order, newTask.id]);
    }
  }

  updateTask(id: string, updates: Partial<Task>) {
    this.tasks.update((tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
      )
    );
    this.saveToHistory();
    this.showForm.set(false);
    this.editingTask.set(null);
  }

  // Optimistic delete (Bonus 5)
  async deleteTask(id: string) {
    if (!this.enableOptimistic()) {
      this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
      this.taskOrder.update((order) => order.filter((taskId) => taskId !== id));
      this.saveToHistory();
      return;
    }

    // Optimistic update with rollback
    const previousTasks = this.tasks();
    const previousOrder = this.taskOrder();

    this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
    this.taskOrder.update((order) => order.filter((taskId) => taskId !== id));

    try {
      // Simulate API call
      await fetch(`${this.API_URL}/${id}`, { method: 'DELETE' });
      this.saveToHistory();
      console.log('Task deleted successfully');
    } catch (error) {
      // Rollback on error
      this.tasks.set(previousTasks);
      this.taskOrder.set(previousOrder);
      console.error('Delete failed, rolled back:', error);
      alert('שגיאה במחיקת המשימה. הפעולה בוטלה.');
    }
  }

  async toggleTask(id: string) {
    if (!this.enableOptimistic()) {
      this.tasks.update((tasks) =>
        tasks.map((t) =>
          t.id === id
            ? { ...t, completed: !t.completed, updatedAt: new Date() }
            : t
        )
      );
      this.saveToHistory();
      return;
    }

    // Optimistic update with rollback
    const previousTasks = this.tasks();
    const task = previousTasks.find((t) => t.id === id);

    if (!task) return;

    this.tasks.update((tasks) =>
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date() }
          : t
      )
    );

    try {
      // Simulate API call
      await fetch(`${this.API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      this.saveToHistory();
      console.log('Task toggled successfully');
    } catch (error) {
      // Rollback on error
      this.tasks.set(previousTasks);
      console.error('Toggle failed, rolled back:', error);
      alert('שגיאה בעדכון המשימה. הפעולה בוטלה.');
    }
  }

  onTaskEdit(task: Task) {
    this.editingTask.set(task);
    this.showForm.set(true);
  }

  onTaskSave(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const editing = this.editingTask();
    if (editing) {
      this.updateTask(editing.id, taskData);
    } else {
      this.addTask(taskData);
    }
  }

  onFormCancel() {
    this.showForm.set(false);
    this.editingTask.set(null);
  }

  openForm() {
    this.editingTask.set(null);
    this.showForm.set(true);
  }

  // Drag & Drop reordering (Bonus 6)
  onTaskReorder(event: { fromIndex: number; toIndex: number }) {
    this.taskOrder.update((order) => {
      const newOrder = [...order];
      const [moved] = newOrder.splice(event.fromIndex, 1);
      newOrder.splice(event.toIndex, 0, moved);
      return newOrder;
    });
  }

  // Undo/Redo implementation (Bonus 3)
  private saveToHistory() {
    const current = this.tasks();
    const newHistory = this.history().slice(0, this.historyIndex() + 1);
    newHistory.push([...current]);
    this.history.set(newHistory);
    this.historyIndex.update((i) => i + 1);

    // Limit history size
    if (newHistory.length > 50) {
      this.history.set(newHistory.slice(-50));
      this.historyIndex.set(49);
    }
  }

  undo() {
    if (this.canUndo()) {
      this.historyIndex.update((i) => i - 1);
      this.tasks.set([...this.history()[this.historyIndex()]]);
    }
  }

  redo() {
    if (this.canRedo()) {
      this.historyIndex.update((i) => i + 1);
      this.tasks.set([...this.history()[this.historyIndex()]]);
    }
  }
}

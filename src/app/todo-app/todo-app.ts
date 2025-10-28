import { Component, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { Task, FilterType, TaskStats } from '../models/task.model';
import { TaskListComponent } from './task-list/task-list';
import { TaskFormComponent } from './task-form/task-form';
import { FilterBarComponent } from './filter-bar/filter-bar';
import { StatsComponent } from './stats/stats';

@Component({
  selector: 'app-todo-app',
  imports: [TaskListComponent, TaskFormComponent, FilterBarComponent, StatsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.scss',
})
export class TodoAppComponent {
  private readonly STORAGE_KEY = 'angular-todo-tasks';

  // Basic state signals
  tasks = signal<Task[]>([]);
  filter = signal<FilterType>('all');
  searchQuery = signal<string>('');
  selectedCategory = signal<string | null>(null);
  editingTask = signal<Task | null>(null);
  showForm = signal(false);

  // Undo/Redo bonus feature
  history = signal<Task[][]>([]);
  historyIndex = signal(-1);

  // Computed signals
  filteredTasks = computed(() => {
    let result = this.tasks();

    // Filter by status
    const filterType = this.filter();
    if (filterType === 'active') {
      result = result.filter(t => !t.completed);
    } else if (filterType === 'completed') {
      result = result.filter(t => t.completed);
    }

    // Filter by search query
    const query = this.searchQuery().toLowerCase();
    if (query) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    const category = this.selectedCategory();
    if (category) {
      result = result.filter(t => t.category === category);
    }

    return result;
  });

  activeTasks = computed(() =>
    this.tasks().filter(t => !t.completed)
  );

  completedTasks = computed(() =>
    this.tasks().filter(t => t.completed)
  );

  categories = computed(() =>
    [...new Set(this.tasks().map(t => t.category))].sort()
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
    // Load tasks from localStorage
    this.loadTasks();

    // Auto-save to localStorage
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(tasks.map(t => ({
          ...t,
          createdAt: t.createdAt.toISOString(),
          updatedAt: t.updatedAt.toISOString()
        })))
      );
    });

    // Log changes (optional)
    effect(() => {
      console.log('Tasks updated:', this.tasks().length);
    });
  }

  loadTasks() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const tasks = JSON.parse(saved);
      this.tasks.set(tasks.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt)
      })));
    }
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveToHistory();
    this.showForm.set(false);
    this.editingTask.set(null);
  }

  updateTask(id: string, updates: Partial<Task>) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date() }
          : t
      )
    );
    this.saveToHistory();
    this.showForm.set(false);
    this.editingTask.set(null);
  }

  deleteTask(id: string) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
    this.saveToHistory();
  }

  toggleTask(id: string) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date() }
          : t
      )
    );
    this.saveToHistory();
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

  // Undo/Redo implementation
  private saveToHistory() {
    const current = this.tasks();
    const newHistory = this.history().slice(0, this.historyIndex() + 1);
    newHistory.push([...current]);
    this.history.set(newHistory);
    this.historyIndex.update(i => i + 1);

    // Limit history size
    if (newHistory.length > 50) {
      this.history.set(newHistory.slice(-50));
      this.historyIndex.set(49);
    }
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
}

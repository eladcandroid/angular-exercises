import { Component, ChangeDetectionStrategy, input, output, signal, computed, effect, viewChild, ElementRef } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent {
  // Inputs
  editTask = input<Task | null>(null);
  categories = input.required<string[]>();

  // Outputs
  save = output<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>();
  cancel = output<void>();

  // ViewChild for auto-focus
  titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  // Form signals
  title = signal('');
  description = signal('');
  category = signal('');
  isAddingNewCategory = signal(false);
  newCategoryInput = signal('');
  priority = signal<'low' | 'medium' | 'high'>('medium');
  dueDate = signal<string | undefined>(undefined);

  // Computed signal for form validation
  isValid = computed(() => {
    const titleValue = this.title().trim();
    const categoryValue = this.isAddingNewCategory()
      ? this.newCategoryInput().trim()
      : this.category().trim();
    return titleValue.length > 0 && categoryValue.length > 0;
  });

  constructor() {
    // Effect to auto-fill form when editTask changes
    effect(() => {
      const task = this.editTask();
      if (task) {
        this.title.set(task.title);
        this.description.set(task.description);
        this.category.set(task.category);
        this.priority.set(task.priority);
        this.dueDate.set(task.dueDate);
      } else {
        this.resetForm();
      }
    });

    // Auto-focus title input
    effect(() => {
      const input = this.titleInput();
      if (input) {
        setTimeout(() => input.nativeElement.focus(), 0);
      }
    });
  }

  onSubmit() {
    if (!this.isValid()) {
      return;
    }

    const categoryValue = this.isAddingNewCategory()
      ? this.newCategoryInput().trim()
      : this.category().trim();

    this.save.emit({
      title: this.title().trim(),
      description: this.description().trim(),
      category: categoryValue,
      priority: this.priority(),
      dueDate: this.dueDate(),
      completed: false,
      tags: []
    });

    this.resetForm();
  }

  onCancel() {
    this.resetForm();
    this.cancel.emit();
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === '__new__') {
      this.isAddingNewCategory.set(true);
      this.newCategoryInput.set('');
    } else {
      this.isAddingNewCategory.set(false);
      this.category.set(value);
    }
  }

  onCancelNewCategory() {
    this.isAddingNewCategory.set(false);
    this.category.set('');
    this.newCategoryInput.set('');
  }

  private resetForm() {
    this.title.set('');
    this.description.set('');
    this.category.set('');
    this.isAddingNewCategory.set(false);
    this.newCategoryInput.set('');
    this.priority.set('medium');
    this.dueDate.set(undefined);
  }
}

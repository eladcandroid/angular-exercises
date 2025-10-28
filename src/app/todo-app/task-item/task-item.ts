import { Component, ChangeDetectionStrategy, input, model, output, computed } from '@angular/core';
import { Task } from '../../models/task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItemComponent {
  // Input
  task = input.required<Task>();

  // Two-way binding model
  completed = model<boolean>(false);

  // Outputs
  delete = output<void>();
  edit = output<void>();
  toggle = output<void>();

  // Computed signals
  isOverdue = computed(() => {
    const task = this.task();
    if (!task.dueDate || task.completed) {
      return false;
    }
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  });

  priorityClass = computed(() => {
    const priority = this.task().priority;
    return `priority-${priority}`;
  });

  onToggle() {
    this.toggle.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}

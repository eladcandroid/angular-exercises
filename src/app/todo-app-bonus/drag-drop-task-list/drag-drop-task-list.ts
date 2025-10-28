import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-drag-drop-task-list',
  imports: [DragDropModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drag-drop-task-list.html',
  styleUrl: './drag-drop-task-list.scss',
})
export class DragDropTaskListComponent {
  tasks = input.required<Task[]>();

  // Outputs
  taskReorder = output<{ fromIndex: number; toIndex: number }>();
  taskToggle = output<string>();
  taskDelete = output<string>();
  taskEdit = output<Task>();

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousIndex !== event.currentIndex) {
      this.taskReorder.emit({
        fromIndex: event.previousIndex,
        toIndex: event.currentIndex,
      });
    }
  }

  onToggle(taskId: string) {
    this.taskToggle.emit(taskId);
  }

  onDelete(taskId: string) {
    this.taskDelete.emit(taskId);
  }

  onEdit(task: Task) {
    this.taskEdit.emit(task);
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short',
    });
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }
}

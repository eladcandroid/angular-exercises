import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { TaskItemComponent } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent {
  tasks = input.required<Task[]>();

  taskToggle = output<string>();
  taskDelete = output<string>();
  taskEdit = output<Task>();

  sortedTasks = computed(() =>
    [...this.tasks()].sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    )
  );
}

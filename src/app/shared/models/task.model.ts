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

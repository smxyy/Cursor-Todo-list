export type TaskStatus = 'todo' | 'active' | 'completed';

export interface Task {
  id: string;
  name: string;
  deadline: string;
  status: TaskStatus;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  name: string;
  deadline: string;
  status: TaskStatus;
  description: string;
}

export interface TaskFormErrors {
  name?: string;
  deadline?: string;
}

export type FilterStatus = 'all' | TaskStatus;

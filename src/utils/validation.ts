import { TaskFormData, TaskFormErrors } from '@/types/task';

export const validateTaskForm = (data: TaskFormData): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Task name is required';
  }

  if (!data.deadline) {
    errors.deadline = 'Deadline is required';
  } else {
    const deadlineDate = new Date(data.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (deadlineDate < today) {
      errors.deadline = 'Deadline cannot be in the past';
    }
  }

  return errors;
};

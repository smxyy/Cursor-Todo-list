'use client';

import { useState, useEffect } from 'react';
import { TaskFormData, Task, TaskFormErrors } from '@/types/task';
import { validateTaskForm } from '@/utils/validation';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
}

export default function TaskForm({ onSubmit, editingTask, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    deadline: '',
    status: 'todo',
    description: '',
  });
  const [errors, setErrors] = useState<TaskFormErrors>({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name,
        deadline: editingTask.deadline,
        status: editingTask.status,
        description: editingTask.description || '',
      });
    } else {
      setFormData({
        name: '',
        deadline: '',
        status: 'todo',
        description: '',
      });
    }
    setErrors({});
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      deadline: '',
      status: 'todo',
      description: '',
    });
    setErrors({});
  };

  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof TaskFormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof TaskFormErrors]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Task Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter task name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Deadline *
          </label>
          <input
            type="date"
            id="deadline"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.deadline ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex-1"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors flex-1"
            >
              Cancel
            </button>
          )}
        </div>
    </form>
  );
}

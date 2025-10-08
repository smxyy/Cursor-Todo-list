'use client';

import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }: TaskItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today && task.status !== 'completed';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 transition-all duration-200 hover:shadow-lg ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${
      isOverdue(task.deadline) ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h3 className={`text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(task.status)}`}>
              {getStatusText(task.status)}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-gray-600 mb-2 ${
              task.status === 'completed' ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
            <span className={`flex items-center gap-1 ${
              isOverdue(task.deadline) ? 'text-red-600 font-medium' : ''
            }`}>
              📅 Due: {formatDate(task.deadline)}
              {isOverdue(task.deadline) && <span className="text-red-600">(Overdue)</span>}
            </span>
            <span className="hidden sm:inline">Created: {formatDate(task.createdAt.toISOString())}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 lg:ml-4">
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              task.status === 'completed'
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {task.status === 'completed' ? 'Reopen' : 'Complete'}
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

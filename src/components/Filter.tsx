'use client';

import { FilterStatus } from '@/types/task';

interface FilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  taskCounts: {
    all: number;
    todo: number;
    active: number;
    completed: number;
  };
}

export default function Filter({ currentFilter, onFilterChange, taskCounts }: FilterProps) {
  const filters: { value: FilterStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: taskCounts.all },
    { value: 'todo', label: 'To Do', count: taskCounts.todo },
    { value: 'active', label: 'Active', count: taskCounts.active },
    { value: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter Tasks</h3>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              currentFilter === filter.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="hidden sm:inline">{filter.label} ({filter.count})</span>
            <span className="sm:hidden">{filter.label}</span>
            <span className="sm:hidden block text-xs">{filter.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskFormData } from '@/types/task';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import Filter from '@/components/Filter';

export default function Home() {
  const {
    tasks,
    allTasks,
    filter,
    editingTask,
    setFilter,
    setEditingTask,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (taskData: TaskFormData) => {
    addTask(taskData);
    setShowForm(false);
  };

  const handleUpdateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const taskCounts = {
    all: allTasks.length,
    todo: allTasks.filter(task => task.status === 'todo').length,
    active: allTasks.filter(task => task.status === 'active').length,
    completed: allTasks.filter(task => task.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo List
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with your tasks
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">{taskCounts.all}</div>
            <div className="text-xs lg:text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-gray-600">{taskCounts.todo}</div>
            <div className="text-xs lg:text-sm text-gray-600">To Do</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">{taskCounts.active}</div>
            <div className="text-xs lg:text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-green-600">{taskCounts.completed}</div>
            <div className="text-xs lg:text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Add Task Button */}
        {!showForm && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              ➕ Add New Task
            </button>
          </div>
        )}

        {/* Task Form */}
        {showForm && (
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            editingTask={editingTask}
            onCancel={editingTask ? handleCancelEdit : () => setShowForm(false)}
          />
        )}

        {/* Filter */}
        <Filter
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={deleteTask}
          onToggleStatus={toggleTaskStatus}
        />
      </div>
    </div>
  );
}
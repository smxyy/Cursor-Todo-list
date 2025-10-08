'use client';

import { useState, useCallback } from 'react';
import { Task, TaskFormData, FilterStatus } from '@/types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: taskData.name,
      deadline: taskData.deadline,
      status: taskData.status,
      description: taskData.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, taskData: TaskFormData) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...taskData, updatedAt: new Date() }
        : task
    ));
    setEditingTask(null);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === 'completed' ? 'todo' : 'completed',
            updatedAt: new Date()
          }
        : task
    ));
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    editingTask,
    setFilter,
    setEditingTask,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
};

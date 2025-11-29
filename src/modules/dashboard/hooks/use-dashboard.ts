import { useState } from "react";
import { useTasks } from "@/modules/task/hooks/use-task";
import type { Task, CreateTaskData } from "@/modules/task/types/task";

export function useDashboard() {
  const { tasks, editTask, deleteTask, addTask } = useTasks();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (taskData: CreateTaskData) => {
    addTask(taskData);
    setIsAddTaskOpen(false);
  };

  const handleEditClick = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setIsEditTaskOpen(true);
    }
  };

  const handleTaskEdit = (taskId: number, updates: Partial<Task>) => {
    if (Object.keys(updates).length === 0) {
      handleEditClick(taskId);
    } else {
      editTask(taskId, updates);
    }
  };

  const handleEditFormSubmit = (taskId: number, updates: Partial<Task>) => {
    editTask(taskId, updates);
    setIsEditTaskOpen(false);
    setEditingTask(null);
  };

  const handleEditCancel = () => {
    setIsEditTaskOpen(false);
    setEditingTask(null);
  };

  return {
    tasks,
    deleteTask,
    isAddTaskOpen,
    isEditTaskOpen,
    editingTask,
    setIsAddTaskOpen,
    handleAddTask,
    handleTaskEdit,
    handleEditFormSubmit,
    handleEditCancel,
    handleEditClick,
  };
}

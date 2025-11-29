import type { Task } from "@/modules/task/types/task";
import type { CreateTaskData } from "@/modules/task/types/task";

export interface CategoryProgressCardProps {
  tasks: Task[];
}

export interface DashboardHeaderProps {
  taskCount: number;
  completedCount: number;
  onAddTask: () => void;
}

export interface TaskDialogsProps {
  isAddTaskOpen: boolean;
  isEditTaskOpen: boolean;
  editingTask: Task | null;
  onAddTaskOpenChange: (open: boolean) => void;
  onEditTaskOpenChange: (open: boolean) => void;
  onAddTask: (taskData: CreateTaskData) => void;
  onEditTask: (taskId: number, updates: Partial<Task>) => void;
  onCancelEdit: () => void;
}

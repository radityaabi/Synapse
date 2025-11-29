import type { TaskListProps } from "@/modules/task/types/task";
import { TaskItem } from "@/modules/task/components/task-item";
import { useState } from "react";

export function TaskList({
  tasks,
  onTaskEdit,
  onTaskDelete,
  onEdit,
}: TaskListProps) {
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);

  const handleDelete = (taskId: number) => {
    onTaskDelete(taskId);
    setOpenActionMenu(null);
  };

  const toggleActionMenu = (taskId: number) => {
    setOpenActionMenu(openActionMenu === taskId ? null : taskId);
  };

  const closeActionMenu = () => {
    setOpenActionMenu(null);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isActionMenuOpen={openActionMenu === task.id}
          onToggleActionMenu={() => toggleActionMenu(task.id)}
          onCloseActionMenu={closeActionMenu}
          onTaskEdit={onTaskEdit}
          onDelete={() => handleDelete(task.id)}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

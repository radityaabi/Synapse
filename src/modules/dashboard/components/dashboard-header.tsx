import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import type { DashboardHeaderProps } from "@/modules/dashboard/types/dashboard";

export function DashboardHeader({
  taskCount,
  completedCount,
  onAddTask,
}: DashboardHeaderProps) {
  return (
    <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Tasks</h1>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          {taskCount} task{taskCount !== 1 ? "s" : ""} • {completedCount}{" "}
          completed
        </p>
      </div>

      <Button size="sm" onClick={onAddTask}>
        <PlusIcon className="h-4 w-4 sm:mr-1" />
        <span>Add Task</span>
      </Button>
    </div>
  );
}

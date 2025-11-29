import {
  getPriorityDisplay,
  getCategoryDisplay,
} from "@/modules/task/utils/task-helpers";
import type { TaskHeaderProps } from "@/modules/task/types/task";

export function TaskHeader({
  task,
  titleSize = "md",
  showActionButton = true,
  actionMenu,
}: TaskHeaderProps) {
  const priorityDisplay = getPriorityDisplay(task.priority);
  const categoryDisplay = getCategoryDisplay(task.category);
  const isDone = task.status === "done";

  const titleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className="flex w-full items-start justify-between gap-3">
      {/* Title & Badges */}
      <div className="min-w-0 flex-1">
        <h1
          className={`font-bold ${isDone ? "text-gray-500" : "text-gray-900"} ${titleSizes[titleSize]}`}
        >
          {task.title}
        </h1>

        {/* Category & Priority Badges */}
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <span
            className={`rounded-md px-2 py-1 text-xs font-semibold text-white ${categoryDisplay.bgColor}`}
          >
            {task.category}
          </span>
          <span
            className={`rounded-md border px-2 py-1 text-xs font-semibold ${priorityDisplay.bgColor} ${priorityDisplay.textColor}`}
          >
            {priorityDisplay.label}
          </span>
        </div>
      </div>

      {/* Action Menu Area */}
      {showActionButton && <div className="shrink-0">{actionMenu}</div>}
    </div>
  );
}

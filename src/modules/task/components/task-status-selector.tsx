import * as SelectPrimitive from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { getStatusDisplay } from "@/modules/task/utils/task-helpers";
import type { Task } from "@/modules/task/types/task";
import type { TaskStatusSelectorProps } from "@/modules/task/types/task";

export function TaskStatusSelector({
  task,
  onStatusChange,
  size = "md",
}: TaskStatusSelectorProps) {
  const statusDisplay = getStatusDisplay(task.status);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const statusIcon =
    statusDisplay.icon === "Circle" ? (
      <Circle className={iconSizes[size]} />
    ) : statusDisplay.icon === "PlayCircle" ? (
      <PlayCircle className={iconSizes[size]} />
    ) : (
      <CheckCircle2 className={iconSizes[size]} />
    );

  return (
    <div
      className={`flex items-center justify-center rounded-full ${statusDisplay.bgColor} shadow-sm ${sizeClasses[size]}`}
    >
      <Select
        value={task.status}
        onValueChange={(value: Task["status"]) =>
          onStatusChange(task.id, value)
        }
      >
        <SelectPrimitive.Trigger
          className={`h-full w-full ${statusDisplay.textColor} cursor-pointer rounded-full hover:opacity-80`}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full">
            {statusIcon}
          </div>
        </SelectPrimitive.Trigger>
        <SelectContent>
          <SelectItem value="todo" className="text-sm">
            <div className="flex items-center gap-2">
              <Circle className={iconSizes[size]} />
              To Do
            </div>
          </SelectItem>
          <SelectItem value="in-progress" className="text-sm">
            <div className="flex items-center gap-2">
              <PlayCircle className={iconSizes[size]} />
              In Progress
            </div>
          </SelectItem>
          <SelectItem value="done" className="text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={iconSizes[size]} />
              Done
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

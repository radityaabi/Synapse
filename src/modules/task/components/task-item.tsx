import { useNavigate } from "react-router";
import type { TaskItemProps } from "@/modules/task/types/task";
import { getDateDisplayInfo } from "@/modules/task/utils/task-helpers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClockIcon, TargetIcon, MoreVertical } from "lucide-react";
import { useTaskActions } from "@/modules/task/hooks/use-task-actions";
import { TaskActionMenu } from "@/modules/task/components/task-action-menu";
import { TaskStatusSelector } from "@/modules/task/components/task-status-selector";
import { TaskHeader } from "@/modules/task/components/task-header";

export function TaskItem({
  task,
  isActionMenuOpen,
  onToggleActionMenu,
  onCloseActionMenu,
  onTaskEdit,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const navigate = useNavigate();
  const dateInfo = getDateDisplayInfo(task);
  const isDone = task.status === "done";

  const { handleStatusChange, handleDeleteClick } = useTaskActions({
    onTaskEdit,
    onDelete,
  });

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(task.id);
    } else {
      onTaskEdit(task.id, {});
    }
    onCloseActionMenu();
  };

  const handleDetailClick = () => {
    navigate(`/detail/${task.id}`);
    onCloseActionMenu();
  };

  const isDoneStyling = `${isDone ? "text-gray-400" : "text-gray-500"}`;

  const ActionButton = (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
        onClick={onToggleActionMenu}
      >
        <MoreVertical className="h-3.5 w-3.5" />
      </Button>

      <TaskActionMenu
        isOpen={isActionMenuOpen}
        onClose={onCloseActionMenu}
        onEdit={handleEditClick}
        onDelete={() => handleDeleteClick(task.id)}
        onViewDetail={handleDetailClick}
        showViewDetail={true}
      />
    </div>
  );

  return (
    <Card
      className={`flex h-full flex-col gap-2 rounded-sm py-2 transition-all duration-200 hover:shadow-md ${
        isDone ? "bg-gray-50" : "bg-white"
      }`}
    >
      <CardContent className="flex flex-1 flex-col p-4">
        {/* Header & Title Actions */}
        <div className="mb-3 flex items-start gap-3">
          {/* Status Selector */}
          <div className="mt-0.5 shrink-0">
            <TaskStatusSelector
              task={task}
              onStatusChange={handleStatusChange}
              size="sm"
            />
          </div>

          {/* TaskHeader with Action Menu */}
          <div className="min-w-0 flex-1">
            <TaskHeader task={task} titleSize="sm" actionMenu={ActionButton} />
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-1">
          {/* Target Date & Duration*/}
          <div className="flex items-center justify-between gap-2">
            {/* Target Date */}
            {dateInfo.targetDate && (
              <div
                className={`flex items-center gap-1 text-xs ${isDoneStyling} min-w-0 flex-1`}
              >
                <TargetIcon className="h-3.5 w-3.5 shrink-0" />
                <span>Target {dateInfo.targetDate?.formatted}</span>
              </div>
            )}

            {/* Duration */}
            <div
              className={`flex shrink-0 items-center gap-1 rounded-sm px-3 py-1.5 text-xs ${
                isDone
                  ? "bg-green-100 text-green-700"
                  : dateInfo.targetDate?.isPastDue
                    ? "bg-red-100 text-red-700"
                    : dateInfo.targetDate?.isToday
                      ? "bg-amber-100 text-amber-700"
                      : dateInfo.targetDate?.isYesterday
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
              }`}
            >
              <ClockIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium whitespace-nowrap">
                {isDone
                  ? "Completed"
                  : dateInfo.targetDate?.isPastDue
                    ? "Overdue"
                    : dateInfo.targetDate?.relative || "No due date"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

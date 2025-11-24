import { useParams, useNavigate } from "react-router";
import { useTasks } from "@/modules/task/hooks/use-task";
import {
  getStatusDisplay,
  getPriorityDisplay,
  getCategoryDisplay,
  getDateDisplayInfo,
} from "@/modules/task/utils/task-helpers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  TargetIcon,
  ArrowLeftIcon,
  CheckCircle2,
  Circle,
  PlayCircle,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditTask } from "./edit-task";
import { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import type { Task } from "@/modules/task/types/task";

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, editTask, deleteTask } = useTasks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const task = tasks.find((t) => t.id === parseInt(taskId || "0"));

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Task Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The task you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Back to Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusDisplay = getStatusDisplay(task.status);
  const priorityDisplay = getPriorityDisplay(task.priority);
  const categoryDisplay = getCategoryDisplay(task.category);
  const dateInfo = getDateDisplayInfo(task);
  const isDone = task.status === "done";

  const statusIcon =
    statusDisplay.icon === "Circle" ? (
      <Circle className="h-5 w-5" />
    ) : statusDisplay.icon === "PlayCircle" ? (
      <PlayCircle className="h-5 w-5" />
    ) : (
      <CheckCircle2 className="h-5 w-5" />
    );

  const handleStatusChange = (newStatus: Task["status"]) => {
    editTask(task.id, { status: newStatus });
  };

  const handleTaskEdited = (taskId: number, updates: Partial<Task>) => {
    editTask(taskId, updates);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      navigate("/");
    }
  };

  const handleEditCancel = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Tasks
          </Button>
        </div>

        <Card className="mb-4 p-4 shadow-sm">
          <CardContent className="p-4">
            {/* Task Header */}
            <div className="mb-4 flex items-start gap-3">
              {/* Status Selector */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${statusDisplay.bgColor} shadow-sm`}
              >
                <Select
                  value={task.status}
                  onValueChange={(value: Task["status"]) =>
                    handleStatusChange(value)
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
                        <Circle className="h-4 w-4" />
                        To Do
                      </div>
                    </SelectItem>
                    <SelectItem value="in-progress" className="text-sm">
                      <div className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        In Progress
                      </div>
                    </SelectItem>
                    <SelectItem value="done" className="text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Done
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <h1
                  className={`text-xl font-bold ${isDone ? "text-gray-500" : "text-gray-900"}`}
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
            </div>

            {/* Description */}
            {task.description && (
              <div className="mb-4">
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Description
                </h3>
                <p
                  className={`rounded-md bg-gray-50 p-3 text-sm text-gray-700 ${isDone ? "text-gray-400" : ""}`}
                >
                  {task.description}
                </p>
              </div>
            )}

            {/* Countdown Timer */}
            {task.targetDate && (
              <div className="mb-4">
                <CountdownTimer targetDate={task.targetDate} isDone={isDone} />
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {/* Dates Section */}
              <Card className="gap-1 border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    Dates & Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Target Date */}
                  {dateInfo.targetDate && (
                    <div className="flex items-center gap-2 p-2">
                      <TargetIcon className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Target Date
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.targetDate.longFormatted}
                        </p>
                        {dateInfo.targetDate.relative && (
                          <p className="mt-0.5 text-xs font-medium text-blue-600">
                            {dateInfo.targetDate.relative}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Created Date */}
                  {dateInfo.createdAt && (
                    <div className="flex items-center gap-2 p-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Created
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.createdAt.longFormatted}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  {dateInfo.updatedAt && (
                    <div className="flex items-center gap-2 p-2">
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Last Updated
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.updatedAt.longFormatted ||
                            dateInfo.createdAt?.longFormatted ||
                            "Recently"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Task Details */}
              <Card className="gap-1 border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Priority */}
                  <div className="flex items-center gap-2 p-2">
                    <div
                      className={`rounded-full p-1.5 ${priorityDisplay.bgColor}`}
                    >
                      <div className={priorityDisplay.textColor}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Priority
                      </p>
                      <p className="text-sm text-gray-600">
                        {priorityDisplay.label}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-2 p-2">
                    <div
                      className={`rounded-full p-1.5 ${categoryDisplay.bgColor}`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Category
                      </p>
                      <p className="text-sm text-gray-600">{task.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>

          {/* Action Buttons Footer */}
          <CardFooter>
            <div className="flex w-full justify-end-safe gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <TrashIcon className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <EditTask
            task={task}
            onTaskEdited={handleTaskEdited}
            onCancel={handleEditCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

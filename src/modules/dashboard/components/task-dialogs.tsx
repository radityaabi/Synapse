import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddTask } from "@/modules/task/components/add-task";
import { EditTask } from "@/modules/task/components/edit-task";
import type { TaskDialogsProps } from "@/modules/dashboard/types/dashboard";

export function TaskDialogs({
  isAddTaskOpen,
  isEditTaskOpen,
  editingTask,
  onAddTaskOpenChange,
  onEditTaskOpenChange,
  onAddTask,
  onEditTask,
  onCancelEdit,
}: TaskDialogsProps) {
  return (
    <>
      <Dialog open={isAddTaskOpen} onOpenChange={onAddTaskOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <AddTask
            onTaskAdded={onAddTask}
            onCancel={() => onAddTaskOpenChange(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditTaskOpen} onOpenChange={onEditTaskOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <EditTask
              task={editingTask}
              onTaskEdited={onEditTask}
              onCancel={onCancelEdit}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

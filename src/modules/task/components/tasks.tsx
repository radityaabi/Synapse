import { useState } from "react";
import { useSearchParams } from "react-router";
import { useTasks } from "@/modules/task/hooks/use-tasks";
import { TaskForm } from "@/modules/task/components/task-form";
import { TaskList } from "@/modules/task/components/task-list";
import { TaskSearch } from "@/modules/task/components/search-tasks-form";
import { CategoryProgressCard } from "@/modules/task/components/category-progress-card";
import type { Task, TaskInput } from "@/modules/task/types/task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function TasksPage() {
  const {
    tasks,
    add: addTask,
    edit: editTask,
    delete: deleteTask,
  } = useTasks();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [dialog, setDialog] = useState<{
    open: boolean;
    task?: Task;
  }>({ open: false });

  const filteredTasks = tasks.filter((task) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query)
    );
  });

  const handleSave = (data: TaskInput) => {
    if (dialog.task) {
      editTask(dialog.task.id, data);
    } else {
      addTask(data);
    }
    setDialog({ open: false });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setDialog({ open: true })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Search Form */}
      <TaskSearch />

      {/* Progress Card */}
      <CategoryProgressCard tasks={tasks} />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onOpenEdit={(task) => setDialog({ open: true, task })}
      />

      {/* Search - No Results */}
      {searchQuery && filteredTasks.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No tasks found matching your search.</p>
        </div>
      )}

      {/* Dialog Add / Edit */}
      <Dialog open={dialog.open} onOpenChange={(open) => setDialog({ open })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialog.task ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            task={dialog.task}
            onSave={handleSave}
            onCancel={() => setDialog({ open: false })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

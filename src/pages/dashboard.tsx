import { TaskList } from "@/modules/task/components/task-list";
import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";
import {
  DashboardHeader,
  CategoryProgressCard,
  TaskDialogs,
} from "@/modules/dashboard/components";
import { getCompletedCount } from "@/modules/dashboard/utils/task-stats";

export function Dashboard() {
  const {
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
  } = useDashboard();

  const completedCount = getCompletedCount(tasks);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          taskCount={tasks.length}
          completedCount={completedCount}
          onAddTask={() => setIsAddTaskOpen(true)}
        />

        <TaskDialogs
          isAddTaskOpen={isAddTaskOpen}
          isEditTaskOpen={isEditTaskOpen}
          editingTask={editingTask}
          onAddTaskOpenChange={setIsAddTaskOpen}
          onEditTaskOpenChange={(open) => !open && handleEditCancel()}
          onAddTask={handleAddTask}
          onEditTask={handleEditFormSubmit}
          onCancelEdit={handleEditCancel}
        />

        <CategoryProgressCard tasks={tasks} />

        <TaskList
          tasks={tasks}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={deleteTask}
          onEdit={handleEditClick}
        />
      </div>
    </div>
  );
}

import { Tasks } from "./modules/task/tasks";
import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-lg space-y-4">
        <h1 className="my-4 text-3xl font-bold text-emerald-600">
          Task Management
        </h1>
        <Button>
          <span>+Add Task</span>
        </Button>
        <Tasks />
      </main>
    </div>
  );
}

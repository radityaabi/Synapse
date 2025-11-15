import { Tasks } from "./tasks";
import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-lg space-y-4">
        <h1 className="my-4 text-3xl font-bold text-emerald-800">
          Task Management
        </h1>

        <div>
          <Button>+ Add Task</Button>
        </div>

        <Tasks />
      </main>
    </div>
  );
}

import { Button } from "../../components/ui/button";
import { TrashIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Tasks = Task[];

const initialDataTasks = [
  { id: 1, title: "Learn React", isDone: false },
  { id: 2, title: "Build a ToDo App", isDone: true },
  { id: 3, title: "Master TypeScript", isDone: false },
  { id: 4, title: "Explore Redux", isDone: true },
  { id: 5, title: "Understand React Router", isDone: false },
];

export function Tasks() {
  const [tasks, setTasks] = useState(initialDataTasks);

  function handleDelete(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} handleDelete={() => handleDelete(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskItem({
  task,
  handleDelete,
}: {
  task: Task;
  handleDelete: () => void;
}) {
  return (
    <section className="flex justify-between rounded-lg bg-gray-50 p-4 outline-1 outline-gray-200">
      <div>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
      </div>
      <div className="flex gap-2">
        <Button size="xs">
          <EyeIcon />
          <span>View</span>
        </Button>
        <Button variant="destructive" size="xs" onClick={handleDelete}>
          <TrashIcon />
          <span>Delete</span>
        </Button>
      </div>
    </section>
  );
}

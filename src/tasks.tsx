type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Tasks = Task[];

const dataTasks = [
  { id: 1, title: "Learn React", isDone: false },
  { id: 2, title: "Build a ToDo App", isDone: true },
  { id: 3, title: "Master TypeScript", isDone: false },
  { id: 4, title: "Explore Redux", isDone: true },
  { id: 5, title: "Understand React Router", isDone: false },
];

export function Tasks() {
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {dataTasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskItem({ task }: { task: Task }) {
  return (
    <section className="rounded-lg bg-emerald-500 p-4">
      <h2 className="text-lg font-bold">{task.title}</h2>
      <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
    </section>
  );
}

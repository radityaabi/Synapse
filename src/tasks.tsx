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
      <h2>Tasks</h2>
      <ul>
        {dataTasks.map((task) => (
          <TaskItem key={task.id} title={task.title} isDone={task.isDone} />
        ))}
      </ul>
    </div>
  );
}

export function TaskItem({
  title,
  isDone,
}: {
  title: string;
  isDone: boolean;
}) {
  if (isDone) {
    return null;
  }

  return <li>{title}</li>;
}

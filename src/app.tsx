import { Tasks } from "./tasks";

export function App() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-lg">
        <h1 className="my-4 text-3xl font-bold text-purple-800">
          Task Management
        </h1>
        <Tasks />
      </main>
    </div>
  );
}

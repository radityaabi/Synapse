import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tasks } from "@/modules/task/components/tasks";
import SynapseLogo from "@/assets/synapse.svg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center px-4">
      <main className="w-full max-w-6xl space-y-4">
        <div className="mx-4 my-4 flex items-center space-x-3">
          <img src={SynapseLogo} alt="Synapse" className="h-8 w-auto" />
          <h1 className="text-primary text-4xl font-bold">Synapse</h1>
        </div>
        {children}
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Tasks />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

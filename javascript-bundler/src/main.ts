import "./style.css";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
    <h1 class="text-5xl text-red-400 mb-4">Vite + TypeScript</h1>
    <button
        class="mb-4 text-green-600 bg-green-300 hover:text-green-800 transition-colors delete-button p-2 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-0"
        title="Delete"
        id="counter">
      <i data-feather="trash-2" class="w-4 h-4"></i>
    </button>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

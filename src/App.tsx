import CounterComp from "./components/CounterComp";
import TodoComp from "./components/TodoComp";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <CounterComp />
      <TodoComp />
    </div>
  );
}

export default App;

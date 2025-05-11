import "./App.css";
import Jobform from "./components/Jobform";

function App() {
  return (
    <div>
      <div className="text-xl font-bold text-black text-center p-5 bg-gray-500">
        Technical Interview Question Generator
      </div>
      <Jobform />
    </div>
  );
}

export default App;

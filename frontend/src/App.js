import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDoList from "./components/ToDoList";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="toDoContainer">
        <ToDoList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
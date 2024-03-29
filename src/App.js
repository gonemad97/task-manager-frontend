import classes from "./App.module.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import TaskCardView from "./components/TaskCardView/TaskCardView";
import TaskOptions from "./components/TaskOptions/TaskOptions";

function App() {
  const [tasks, setTasks] = useState([]);

  //fetch incomplete tasks by default
  useEffect(() => {
    const url =
      "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks?status=incomplete";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.task_components}>
        <TaskOptions tasks={tasks} setTasks={setTasks} />
        <TaskCardView tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;

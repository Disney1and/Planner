import React, { useState } from "react";
import { format } from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [sortType, setSortType] = useState("date");

  const addTask = () => {
    if (!newTask.trim()) return;
    const taskObj = {
      id: Date.now(),
      name: newTask.trim(),
      date: taskDate.toISOString(),
    };
    setTasks((prev) => [...prev, taskObj]);
    setNewTask("");
    setTaskDate(new Date());
  };

  const completeTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setFinishedTasks((prev) => [...prev, task]);
  };

  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (sortType === "date") return new Date(a.date) - new Date(b.date);
      if (sortType === "alpha") return a.name.localeCompare(b.name);
      return 0;
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <input
        type="date"
        value={taskDate.toISOString().split("T")[0]}
        onChange={(e) => setTaskDate(new Date(e.target.value))}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={addTask}>Add</button>
        <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="date">Date</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

      <div>
        <h2>Tasks</h2>
        {sortTasks(tasks).map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              onChange={() => completeTask(task.id)}
              style={{ marginRight: "0.5rem" }}
            />
            {task.name} - {format(new Date(task.date), "PPP")}
          </div>
        ))}
      </div>

      <div>
        <h2>Finished Tasks</h2>
        {sortTasks(finishedTasks).map((task) => (
          <div key={task.id} style={{ opacity: 0.6 }}>
            <input type="checkbox" checked readOnly style={{ marginRight: "0.5rem" }} />
            {task.name} - {format(new Date(task.date), "PPP")}
          </div>
        ))}
      </div>
    </div>
  );
}


import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Add a new task
  const addTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  // Mark task as completed or pending
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="app">
      <header>
        <h1>DevOps Task Manager</h1>
        <p>Manage tasks. Build. Test. Deploy.</p>
      </header>

      <main>
        <div className="stats">
          <div>
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div>
            <h2>{completedCount}</h2>
            <p>Completed</p>
          </div>

          <div>
            <h2>{tasks.length - completedCount}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks yet. Add your first task!</p>
          ) : (
            tasks.map((task) => (
              <div className="task" key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span
                    className={
                      task.completed ? "completed" : ""
                    }
                  >
                    {task.title}
                  </span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;


import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Fetch tasks from backend when the page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a task to MySQL through the backend
  const addTask = async () => {
    if (taskInput.trim() === "") return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskInput.trim(),
          completed: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const newTask = await response.json();
      setTasks((previousTasks) => [...previousTasks, newTask]);
      setTaskInput("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update task completion in the backend
  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          completed: !task.completed,
        }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === task.id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task from backend
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
                    onChange={() => toggleTask(task)}
                  />
                  <span className={task.completed ? "completed" : ""}>
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

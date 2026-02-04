import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");


  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    try {
      await API.post("/tasks", { title });
      setTitle("");
      loadTasks();
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <button onClick={logout} className="text-red-500 float-right">
        Logout
      </button>

      <h1 className="text-2xl mb-4">My Tasks</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        placeholder="New task"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mt-2"
        placeholder="Search tasks"
      />

      <button
        onClick={addTask}
        className="bg-blue-500 text-white p-2 w-full mt-2"
      >
        Add Task
      </button>

      <ul className="mt-4">
        {tasks
          .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
          .map((t) => (
            <li
              key={t._id}
              className="border p-2 mt-2 flex justify-between items-center"
            >
              <span>{t.title}</span>
              <button
                onClick={async () => {
                  try {
                    await API.delete(`/tasks/${t._id}`);
                    loadTasks();
                  } catch (error) {
                    console.error("Failed to delete task", error);
                  }
                }}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;

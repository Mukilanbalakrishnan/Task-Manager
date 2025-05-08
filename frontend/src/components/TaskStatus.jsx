import React, { useEffect, useState } from "react";
import "./TaskStatus.css";

const TaskStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username"); // store this at login time

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/employee/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchTasks();
    else {
      console.error("Username not found in localStorage");
      setLoading(false);
    }
  }, [username]);

  if (loading) return <div className="task-loading">Loading your tasks...</div>;

  return (
    <div className="task-status-container">
      <h2>Your Task Status</h2>
      {tasks.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className={`status ${task.status.toLowerCase()}`}>
                  {task.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default TaskStatus;

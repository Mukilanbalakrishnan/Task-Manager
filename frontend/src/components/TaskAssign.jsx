

import React, { useState, useEffect } from "react";

const TaskAssignment = () => {
  const [task, setTask] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [users, setUsers] = useState([]);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();

    if (task && assignee && deadline) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assign-task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task,
            username: assignee,
            deadline,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          setTask("");
          setAssignee("");
          setDeadline("");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Task assign error:", error);
        alert("Failed to assign task.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Assign Task
      </h2>

      <form
        onSubmit={handleAssign}
        className="flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Task Description:
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Assign To:
          </label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Employee --</option>
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.username} ({user.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Deadline:
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Assign Task
        </button>
      </form>

      <ul className="mt-8 space-y-4">
        {taskList.map((t) => (
          <li
            key={t.id}
            className="bg-gray-50 border-l-4 border-blue-600 p-4 rounded shadow-sm"
          >
            <strong className="text-gray-800">{t.task}</strong> - to{" "}
            <span className="font-medium">{t.assignee}</span> (Due:{" "}
            <span className="text-red-500">{t.deadline}</span>)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAssignment;

// import React, { useState, useEffect } from "react";
// import "./MyTasks.css";

// const MyTasks = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const username = localStorage.getItem("username");
//       try {
//         const response = await fetch(`http://localhost:5000/employee-tasks/${username}`);
//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           console.error("Unexpected response from server:", data);
//           return;
//         }

//         const formattedTasks = data.map((t) => ({
//           id: t._id,
//           title: t.task,
//           description: "No description provided",
//           deadline: t.deadline,
//           status: t.status || "Pending", // status from DB if available
//         }));

//         setTasks(formattedTasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleComplete = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/complete-task/${taskId}`, {
//         method: "PUT",
//       });

//       if (response.ok) {
//         setTasks((prevTasks) =>
//           prevTasks.map((task) =>
//             task.id === taskId ? { ...task, status: "Completed" } : task
//           )
//         );
//       } else {
//         console.error("Failed to mark task as completed");
//       }
//     } catch (error) {
//       console.error("Error completing task:", error);
//     }
//   };

//   return (
//     <div className="my-tasks">
//       <h2>My Tasks</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks assigned yet.</p>
//       ) : (
//         <div className="task-list">
//           {tasks.map((task) => (
//             <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
//               <h3>{task.title}</h3>
//               <p>{task.description}</p>
//               <p><strong>Deadline:</strong> {task.deadline}</p>
//               <p><strong>Status:</strong> {task.status}</p>
//               {task.status !== "Completed" && (
//                 <button className="complete-btn" onClick={() => handleComplete(task.id)}>
//                   Mark as Complete
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyTasks;












import React, { useState, useEffect } from "react";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const username = localStorage.getItem("username");
      try {
        const response = await fetch(`http://localhost:5000/employee-tasks/${username}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Unexpected response from server:", data);
          return;
        }

        const formattedTasks = data.map((t) => ({
          id: t._id,
          title: t.task,
          description: "No description provided",
          deadline: t.deadline,
          status: t.status || "Pending",
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/complete-task/${taskId}`, {
        method: "PUT",
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: "Completed" } : task
          )
        );
      } else {
        console.error("Failed to mark task as completed");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks assigned yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-lg p-5 shadow-md border transition ${
                task.status === "Completed"
                  ? "bg-green-100 border-green-400"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{task.title}</h3>
              <p className="text-gray-600 mb-1">{task.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Deadline:</strong> {task.deadline}
              </p>
              <p
                className={`text-sm font-medium mb-3 ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                <strong>Status:</strong> {task.status}
              </p>

              {task.status !== "Completed" && (
                <button
                  onClick={() => handleComplete(task.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;

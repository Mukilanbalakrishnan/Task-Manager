// import React, { useEffect, useState } from "react";
// import "./EmployeePerformance.css";

// const EmployeePerformance = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchAllTasks = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/all-tasks");
//         const data = await response.json();
//         setTasks(data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchAllTasks();
//   }, []);

//   return (
//     <div className="manager-tasks">
//       <h2>All Employee Tasks</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <div className="task-list">
//           {tasks.map((task) => (
//             <div key={task._id} className={`task-card ${task.status.toLowerCase()}`}>
//               <h3>{task.task}</h3>
//               <p><strong>Assigned To:</strong> {task.assignee?.username}</p>
//               <p><strong>Deadline:</strong> {task.deadline}</p>
//               <p><strong>Status:</strong> {task.status}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeePerformance;





import React, { useEffect, useState } from "react";

const EmployeePerformance = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchAllTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 border-green-500 text-green-800";
      case "pending":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case "overdue":
        return "bg-red-100 border-red-500 text-red-800";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Employee Tasks
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`border-l-4 p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${getStatusColor(
                task.status
              )}`}
            >
              <h3 className="text-lg font-bold mb-2">{task.task}</h3>
              <p>
                <span className="font-medium">Assigned To:</span>{" "}
                {task.assignee?.username}
              </p>
              <p>
                <span className="font-medium">Deadline:</span> {task.deadline}
              </p>
              <p>
                <span className="font-medium">Status:</span> {task.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeePerformance;

// import React, { useState } from "react";
// // import "./EmployeeDashboard.css";
// import MyTasks from "./MyTasks";
// import MarkAttendance from "./MarkAttendance";
// import LeaveRequest from "./LeaveRequest";
// import ViewPayroll from "./ViewPayroll";
// import { useNavigate } from "react-router-dom";

// const EmployeeDashboard = () => {
//   const [activePage, setActivePage] = useState("tasks");
//   const navigate = useNavigate(); 

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const renderPage = () => {
//     switch (activePage) {
//       case "tasks":
//         return <MyTasks />;
//       case "attendance":
//         return <MarkAttendance />;
//       case "leave":
//         return <LeaveRequest />;
//       case "payroll":
//         return <ViewPayroll />;
//       // case "status":
//       //   return <TaskCompletionStatus />;
//       // case "review":
//       //   return <PerformanceReview />;
//       default:
//         return <MyTasks />;
//     }
//   };
//   return (
//     <div className="employee-dashboard">
//       <div className="sidebar">
//         <h2 className="sidebar-title">EMS Employee</h2>
//         <ul className="sidebar-links">
//           <li
//             className={activePage === "tasks" ? "active" : ""}
//             onClick={() => setActivePage("tasks")}
//           >
//             My Tasks
//           </li>
//           <li
//             className={activePage === "attendance" ? "active" : ""}
//             onClick={() => setActivePage("attendance")}
//           >
//             Mark Attendance
//           </li>
//           <li
//             className={activePage === "leave" ? "active" : ""}
//             onClick={() => setActivePage("leave")}
//           >
//             Leave Request
//           </li>
//           <li
//             className={activePage === "payroll" ? "active" : ""}
//             onClick={() => setActivePage("payroll")}
//           >
//             View Payroll
//           </li>
//           {/* <li
//             className={activePage === "status" ? "active" : ""}
//             onClick={() => setActivePage("status")}
//           >
//             Task Completion Status
//           </li>
//           <li
//             className={activePage === "review" ? "active" : ""}
//             onClick={() => setActivePage("review")}
//           >
//             Performance Review
//           </li> */}
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="navbar">
//           <h3>Employee Portal</h3>
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//         <div className="page-content">{renderPage()}</div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;











// import React, { useState } from "react";
// import MyTasks from "./MyTasks";
// import MarkAttendance from "./MarkAttendance";
// import LeaveRequest from "./LeaveRequest";
// import ViewPayroll from "./ViewPayroll";
// import { useNavigate } from "react-router-dom";

// const EmployeeDashboard = () => {
//   const [activePage, setActivePage] = useState("tasks");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const navigate = useNavigate(); 

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const renderPage = () => {
//     switch (activePage) {
//       case "tasks":
//         return <MyTasks />;
//       case "attendance":
//         return <MarkAttendance />;
//       case "leave":
//         return <LeaveRequest />;
//       case "payroll":
//         return <ViewPayroll />;
//       default:
//         return <MyTasks />;
//     }
//   };

//   return (
//     <div className="flex h-screen font-sans">
//       {/* Sidebar */}
//       <div className="w-[220px] bg-[#1a1a3d] text-white p-5 box-border">
//         <h2 className="text-2xl font-bold mb-8">EMS Employee</h2>
//         <ul className="space-y-2">
//           <li
//             onClick={() => setActivePage("tasks")}
//             className={`p-2 rounded cursor-pointer transition-colors ${
//               activePage === "tasks" ? "bg-[#333366]" : "hover:bg-[#333366]"
//             }`}
//           >
//             My Tasks
//           </li>
//           <li
//             onClick={() => setActivePage("attendance")}
//             className={`p-2 rounded cursor-pointer transition-colors ${
//               activePage === "attendance" ? "bg-[#333366]" : "hover:bg-[#333366]"
//             }`}
//           >
//             Mark Attendance
//           </li>
//           <li
//             onClick={() => setActivePage("leave")}
//             className={`p-2 rounded cursor-pointer transition-colors ${
//               activePage === "leave" ? "bg-[#333366]" : "hover:bg-[#333366]"
//             }`}
//           >
//             Leave Request
//           </li>
//           <li
//             onClick={() => setActivePage("payroll")}
//             className={`p-2 rounded cursor-pointer transition-colors ${
//               activePage === "payroll" ? "bg-[#333366]" : "hover:bg-[#333366]"
//             }`}
//           >
//             View Payroll
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col flex-grow bg-[#f4f6fa]">
        
//         {/* Navbar */}
//         <div className="h-[60px] bg-white px-6 flex items-center justify-between shadow-md">
//           <h3 className="text-lg font-semibold">Employee Portal</h3>
//           <button
//             onClick={handleLogout}
//             className="bg-[#f39c12] text-white px-4 py-2 rounded hover:opacity-90"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Page Content */}
//         <div className="flex-grow p-6">{renderPage()}</div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;











import React, { useState } from "react";
import MyTasks from "./MyTasks";
import MarkAttendance from "./MarkAttendance";
import LeaveRequest from "./LeaveRequest";
import ViewPayroll from "./ViewPayroll";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [activePage, setActivePage] = useState("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderPage = () => {
    switch (activePage) {
      case "tasks":
        return <MyTasks />;
      case "attendance":
        return <MarkAttendance />;
      case "leave":
        return <LeaveRequest />;
      case "payroll":
        return <ViewPayroll />;
      default:
        return <MyTasks />;
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div
        className={`w-[220px] bg-[#1a1a3d] text-white p-5 box-border transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-bold mb-8">EMS Employee</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setActivePage("tasks")}
            className={`p-2 rounded cursor-pointer transition-colors ${
              activePage === "tasks" ? "bg-[#333366]" : "hover:bg-[#333366]"
            }`}
          >
            My Tasks
          </li>
          <li
            onClick={() => setActivePage("attendance")}
            className={`p-2 rounded cursor-pointer transition-colors ${
              activePage === "attendance" ? "bg-[#333366]" : "hover:bg-[#333366]"
            }`}
          >
            Mark Attendance
          </li>
          <li
            onClick={() => setActivePage("leave")}
            className={`p-2 rounded cursor-pointer transition-colors ${
              activePage === "leave" ? "bg-[#333366]" : "hover:bg-[#333366]"
            }`}
          >
            Leave Request
          </li>
          <li
            onClick={() => setActivePage("payroll")}
            className={`p-2 rounded cursor-pointer transition-colors ${
              activePage === "payroll" ? "bg-[#333366]" : "hover:bg-[#333366]"
            }`}
          >
            View Payroll
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-[#f4f6fa]">
        
        {/* Navbar */}
        <div className="h-[60px] bg-white px-6 flex items-center justify-between shadow-md">
          <button
            className="text-xl text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle Sidebar
          >
            ☰
          </button>
          <h3 className="text-lg font-semibold">Employee Portal</h3>
          <button
            onClick={handleLogout}
            className="bg-[#f39c12] text-white px-4 py-2 rounded hover:opacity-90"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-grow p-6">{renderPage()}</div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;


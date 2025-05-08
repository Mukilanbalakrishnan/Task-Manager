
import React, { useState } from "react";
import TaskAssignment from "./TaskAssign";
import LeaveApproval from "./LeaveApproval";
import EmployeePerformance from "./EmployeePerformance";
import AttendanceTrackingManager from "./AttendanceTrackingManager";
import ManagerViewPayroll from "./ManagerViewPayroll";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const [activePage, setActivePage] = useState("task");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderPage = () => {
    switch (activePage) {
      case "task":
        return <TaskAssignment />;
      case "leave":
        return <LeaveApproval />;
      case "performance":
        return <EmployeePerformance />;
      case "attendance":
        return <AttendanceTrackingManager />;
      case "payroll":
        return <ManagerViewPayroll />;
      default:
        return <TaskAssignment />;
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {sidebarOpen && (
        <div className="w-[220px] bg-[#1a1a3d] text-white p-5 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-8">EMS Manager</h2>
          <ul className="space-y-2">
            <li
              onClick={() => setActivePage("task")}
              className="px-3 py-2 rounded hover:bg-[#333366] cursor-pointer"
            >
              Task Assignment
            </li>
            <li
              onClick={() => setActivePage("leave")}
              className="px-3 py-2 rounded hover:bg-[#333366] cursor-pointer"
            >
              Leave Approval
            </li>
            <li
              onClick={() => setActivePage("performance")}
              className="px-3 py-2 rounded hover:bg-[#333366] cursor-pointer"
            >
              Task Completion Status_Employee
            </li>
            <li
              onClick={() => setActivePage("attendance")}
              className="px-3 py-2 rounded hover:bg-[#333366] cursor-pointer"
            >
              Attendance Tracking
            </li>
            <li
              onClick={() => setActivePage("payroll")}
              className="px-3 py-2 rounded hover:bg-[#333366] cursor-pointer"
            >
              Manager View Payroll
            </li>
          </ul>
        </div>
      )}

      <div
        className={`flex flex-col flex-grow bg-[#f4f6fa] transition-all duration-300 ${
          !sidebarOpen ? "ml-0 w-full" : ""
        }`}
      >
        <div className="h-[60px] bg-white px-5 flex items-center justify-between shadow-md">
          <button
            className="text-xl text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h3 className="text-lg font-semibold">Manager Portal</h3>
          <button
            onClick={handleLogout}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Logout
          </button>
        </div>

        <div className="flex-grow p-5">{renderPage()}</div>
      </div>
    </div>
  );
};

export default ManagerDashboard;







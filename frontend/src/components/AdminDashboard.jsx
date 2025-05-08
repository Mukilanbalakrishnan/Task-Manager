// import React, { useState } from "react";
// // import "./AdminDashboard.css";
// import UserManagement from "./UserManagement";
// import RoleManagement from "./RoleManagement";
// import AttendanceTracking from "./AttendanceTracking";
// import AdminLeaveApproval from "./AdminLeaveApproval";
// import AdminAssignPayroll from "./AdminAssignPayroll";
// import { useNavigate } from "react-router-dom";
// const AdminDashboard = () => {
//   const [activePage, setActivePage] = useState("user");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const navigate = useNavigate(); 
  
//     const handleLogout = () => {
//       localStorage.clear();
//       navigate("/login");
//     };
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const renderPage = () => {
//     switch(activePage) {
//       case "user":
//         return<UserManagement />;
//       case "role":
//         return<RoleManagement />;
//       case "attendance":
//         return<AttendanceTracking />;
//       case "payroll":
//         return<AdminAssignPayroll />;
//       case"leave-approval":
//       return<AdminLeaveApproval />;
//       default:
//         return<UserManagement />;
//     }
//   };
//   return (
//     <div className="admin-dashboard">
//       <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
//         <h2 className="sidebar-title">EMS Admin</h2>
//         <ul className="sidebar-links">
//           <li onClick={() => setActivePage("user")}>User Management</li>
//           <li onClick={() => setActivePage("role")}>Role Management</li>
//           <li onClick={() => setActivePage("attendance")}>Attendance Tracking</li>
//           <li onClick={() => setActivePage("payroll")}>Payroll Management</li>
//           <li onClick={() => setActivePage("leave-approval")}>Leave Approval</li> 
//         </ul>
//       </div>
//       <div className="main-content">
//         <div className="navbar">
//           <button className="toggle-btn" onClick={toggleSidebar}>
//             ☰
//           </button>
//           <h3>Admin Portal</h3>
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//         <div className="page-content">{renderPage()}</div>
//       </div>
//     </div>
//   );
// };
// export default AdminDashboard;






  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import UserManagement from "./UserManagement";
  // import RoleManagement from "./RoleManagement";
  // import AttendanceTracking from "./AttendanceTracking";
  // import AdminLeaveApproval from "./AdminLeaveApproval";
  // import AdminAssignPayroll from "./AdminAssignPayroll";

  // const AdminDashboard = () => {
  //   const [activePage, setActivePage] = useState("user");
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //   const navigate = useNavigate();

  //   const handleLogout = () => {
  //     localStorage.clear();
  //     navigate("/login");
  //   };

  //   const toggleSidebar = () => {
  //     setIsSidebarOpen(!isSidebarOpen);
  //   };

  //   const renderPage = () => {
  //     switch (activePage) {
  //       case "user":
  //         return <UserManagement />;
  //       case "role":
  //         return <RoleManagement />;
  //       case "attendance":
  //         return <AttendanceTracking />;
  //       case "payroll":
  //         return <AdminAssignPayroll />;
  //       case "leave-approval":
  //         return <AdminLeaveApproval />;
  //       default:
  //         return <UserManagement />;
  //     }
  //   };

  //   return (
  //     <div className="flex h-screen font-sans">
  //       {/* Sidebar */}
  //       <div
  //         className={`${
  //           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  //         } fixed lg:static z-20 bg-[#1a1a3d] text-white w-56 p-5 transition-transform duration-300 ease-in-out h-full`}
  //       >
  //         <h2 className="text-2xl font-bold mb-8">EMS Admin</h2>
  //         <ul className="space-y-2">
  //           <li
  //             className="p-2 rounded hover:bg-[#333366] cursor-pointer"
  //             onClick={() => setActivePage("user")}
  //           >
  //             User Management
  //           </li>
  //           <li
  //             className="p-2 rounded hover:bg-[#333366] cursor-pointer"
  //             onClick={() => setActivePage("role")}
  //           >
  //             Role Management
  //           </li>
  //           <li
  //             className="p-2 rounded hover:bg-[#333366] cursor-pointer"
  //             onClick={() => setActivePage("attendance")}
  //           >
  //             Attendance Tracking
  //           </li>
  //           <li
  //             className="p-2 rounded hover:bg-[#333366] cursor-pointer"
  //             onClick={() => setActivePage("payroll")}
  //           >
  //             Payroll Management
  //           </li>
  //           <li
  //             className="p-2 rounded hover:bg-[#333366] cursor-pointer"
  //             onClick={() => setActivePage("leave-approval")}
  //           >
  //             Leave Approval
  //           </li>
  //         </ul>
  //       </div>

  //       {/* Main content */}
  //       <div className="flex flex-col flex-grow bg-[#f4f6fa] overflow-hidden">
  //         {/* Navbar */}
  //         <div className="h-16 bg-white px-5 flex justify-between items-center shadow-md relative">
  //           <button
  //             className="text-2xl text-[#1a1a3d] bg-transparent border-none mr-4 lg:hidden"
  //             onClick={toggleSidebar}
  //           >
  //             ☰
  //           </button>
  //           <h3 className="text-lg font-semibold">Admin Portal</h3>
  //           <button
  //             onClick={handleLogout}
  //             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  //           >
  //             Logout
  //           </button>
  //         </div>

  //         {/* Page content */}
  //         <div className="flex-grow p-5">{renderPage()}</div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AdminDashboard




  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import UserManagement from "./UserManagement";
  import RoleManagement from "./RoleManagement";
  import AttendanceTracking from "./AttendanceTracking";
  import AdminLeaveApproval from "./AdminLeaveApproval";
  import AdminAssignPayroll from "./AdminAssignPayroll";
  
  const AdminDashboard = () => {
    const [activePage, setActivePage] = useState("user");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
    };
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const renderPage = () => {
      switch (activePage) {
        case "user":
          return <UserManagement />;
        case "role":
          return <RoleManagement />;
        case "attendance":
          return <AttendanceTracking />;
        case "payroll":
          return <AdminAssignPayroll />;
        case "leave-approval":
          return <AdminLeaveApproval />;
        default:
          return <UserManagement />;
      }
    };
  
    return (
      <div className="flex h-screen font-sans overflow-hidden">
        {/* Sidebar */}
        <div
          className={`bg-[#1a1a3d] text-white transition-all duration-300 ease-in-out h-full ${
            isSidebarOpen ? "w-56 p-5" : "w-0 p-0"
          } overflow-hidden`}
        >
          {isSidebarOpen && (
            <>
              <h2 className="text-2xl font-bold mb-8">EMS Admin</h2>
              <ul className="space-y-2">
                <li
                  className="p-2 rounded hover:bg-[#333366] cursor-pointer"
                  onClick={() => setActivePage("user")}
                >
                  User Management
                </li>
                <li
                  className="p-2 rounded hover:bg-[#333366] cursor-pointer"
                  onClick={() => setActivePage("role")}
                >
                  Role Management
                </li>
                <li
                  className="p-2 rounded hover:bg-[#333366] cursor-pointer"
                  onClick={() => setActivePage("attendance")}
                >
                  Attendance Tracking
                </li>
                <li
                  className="p-2 rounded hover:bg-[#333366] cursor-pointer"
                  onClick={() => setActivePage("payroll")}
                >
                  Payroll Management
                </li>
                <li
                  className="p-2 rounded hover:bg-[#333366] cursor-pointer"
                  onClick={() => setActivePage("leave-approval")}
                >
                  Leave Approval
                </li>
              </ul>
            </>
          )}
        </div>
  
        {/* Main content */}
        <div className="flex flex-col flex-grow bg-[#f4f6fa] overflow-hidden">
          {/* Navbar */}
          <div className="h-16 bg-white px-5 flex justify-between items-center shadow-md">
            <button
              className="text-2xl text-[#1a1a3d] bg-transparent border-none mr-4"
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <h3 className="text-lg font-semibold">Admin Portal</h3>
            <button
              onClick={handleLogout}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Logout
            </button>
          </div>
  
          {/* Page content */}
          <div className="flex-grow p-5 overflow-auto">{renderPage()}</div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  
// import React, { useEffect, useState } from "react";

// export default function ManagerDashboard() {
//   const username = localStorage.getItem("username");
//   const role = localStorage.getItem("role");
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [myAttendance, setMyAttendance] = useState(null);

//   const fetchAttendanceData = async () => {
//     const today = new Date().toISOString().split("T")[0];
//     try {
//       // Fetch manager's own attendance
//       const myRes = await fetch(`http://localhost:5000/attendance/view?username=${username}&date=${today}`);
//       const myData = await myRes.json();
//       setMyAttendance(myData);
//     } catch (err) {
//       console.error("Error fetching manager attendance:", err);
//     }

//     try {
//       // Fetch all employee attendance for manager
//       const empRes = await fetch("http://localhost:5000/manager-attendance");
//       const empData = await empRes.json();
//       setAttendanceRecords(empData);
//     } catch (err) {
//       console.error("Error fetching employee attendance:", err);
//     }
//   };

//   useEffect(() => {
//     if (role === "manager") {
//       fetchAttendanceData();
//     }
//   }, [username, role]);

//   const handleAction = async (type) => {
//     try {
//       const res = await fetch(`http://localhost:5000/attendance/${type === "checkin" ? "manager-checkin" : type}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, managerName: username }),
//       });
//       const data = await res.json();
//       alert(data.message);
//       fetchAttendanceData(); // Refresh attendance after action
//     } catch (err) {
//       console.error(`Error during ${type}:`, err);
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
    
//       {/* Main Content */}
//       <p><strong>User:</strong> {username}</p>
//       <div style={{ flexGrow: 1, padding: "2rem", background: "#f8fafc" }}>
//         <h2 style={{ marginTop: 0 }}>Welcome, {username} 👋</h2>

//         {/* Manager Attendance Controls */}
//         <section style={{ marginBottom: "2rem" }}>
//           <h3>Mark My Attendance</h3>
//           <div style={{ marginBottom: "1rem" }}>
//             <button onClick={() => handleAction("checkin")} style={btnStyle}>Check In</button>{" "}
//             <button onClick={() => handleAction("goout")} style={btnStyle}>Go Out</button>{" "}
//             <button onClick={() => handleAction("comein")} style={btnStyle}>Come In</button>{" "}
//             <button onClick={() => handleAction("checkout")} style={btnStyle}>Check Out</button>
//           </div>

//           {myAttendance ? (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Check-In</th>
//                   <th>Check-Out</th>
//                   <th>Breaks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{myAttendance.date}</td>
//                   <td>{myAttendance.checkIn || "-"}</td>
//                   <td>{myAttendance.checkOut || "-"}</td>
//                   <td>
//                     {myAttendance.breaks?.length > 0
//                       ? myAttendance.breaks.map((b, i) => (
//                           <div key={i}>{b.outTime || "-"} → {b.inTime || "-"}</div>
//                         ))
//                       : "None"}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           ) : (
//             <p>No attendance for today.</p>
//           )}
//         </section>

//         {/* Employee Attendance Records */}
//         <section>
//           <h3>Employee Attendance Records</h3>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Date</th>
//                 <th>Check-In</th>
//                 <th>Check-Out</th>
//                 <th>Breaks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceRecords.map((record, i) => (
//                 <tr key={i}>
//                   <td>{record.username}</td>
//                   <td>{record.date}</td>
//                   <td>{record.checkIn || "-"}</td>
//                   <td>{record.checkOut || "-"}</td>
//                   <td>
//                     {record.breaks?.length > 0
//                       ? record.breaks.map((b, idx) => (
//                           <div key={idx}>{b.outTime || "-"} → {b.inTime || "-"}</div>
//                         ))
//                       : "None"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </div>
//     </div>
//   );
// }

// const btnStyle = {
//   padding: "0.5rem 1rem",
//   marginRight: "0.5rem",
//   border: "none",
//   borderRadius: "5px",
//   background: "#3b82f6",
//   color: "white",
//   cursor: "pointer",
// };

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   backgroundColor: "#fff",
//   boxShadow: "0 0 8px rgba(0,0,0,0.1)",
// };

// const thtdStyle = {
//   border: "1px solid #ccc",
//   padding: "0.5rem",
// };







import React, { useEffect, useState } from "react";

export default function ManagerDashboard() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [myAttendance, setMyAttendance] = useState(null);

  const fetchAttendanceData = async () => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const myRes = await fetch(`http://localhost:5000/attendance/view?username=${username}&date=${today}`);
      const myData = await myRes.json();
      setMyAttendance(myData);
    } catch (err) {
      console.error("Error fetching manager attendance:", err);
    }

    try {
      const empRes = await fetch("http://localhost:5000/manager-attendance");
      const empData = await empRes.json();
      setAttendanceRecords(empData);
    } catch (err) {
      console.error("Error fetching employee attendance:", err);
    }
  };

  useEffect(() => {
    if (role === "manager") {
      fetchAttendanceData();
    }
  }, [username, role]);

  const handleAction = async (type) => {
    try {
      const res = await fetch(`http://localhost:5000/attendance/${type === "checkin" ? "manager-checkin" : type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, managerName: username }),
      });
      const data = await res.json();
      alert(data.message);
      fetchAttendanceData();
    } catch (err) {
      console.error(`Error during ${type}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Welcome, {username} 👋</h1>
        <p className="mb-6 text-gray-600">Role: Manager</p>

        {/* Manager Attendance Controls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">📌 Mark My Attendance</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {["checkin", "goout", "comein", "checkout"].map((type) => (
              <button
                key={type}
                onClick={() => handleAction(type)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition duration-200"
              >
                {type.replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>

          {myAttendance ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full text-sm table-auto border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Check-In</th>
                    <th className="px-4 py-2 border">Check-Out</th>
                    <th className="px-4 py-2 border">Breaks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="px-4 py-2 border">{myAttendance.date}</td>
                    <td className="px-4 py-2 border">{myAttendance.checkIn || "-"}</td>
                    <td className="px-4 py-2 border">{myAttendance.checkOut || "-"}</td>
                    <td className="px-4 py-2 border">
                      {myAttendance.breaks?.length > 0
                        ? myAttendance.breaks.map((b, i) => (
                            <div key={i}>
                              {b.outTime || "-"} → {b.inTime || "-"}
                            </div>
                          ))
                        : "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No attendance for today.</p>
          )}
        </section>

        {/* Employee Attendance Records */}
        <section>
          <h2 className="text-xl font-semibold mb-4">📋 Employee Attendance Records</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-sm table-auto border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Username</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Check-In</th>
                  <th className="px-4 py-2 border">Check-Out</th>
                  <th className="px-4 py-2 border">Breaks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, i) => (
                  <tr key={i} className="text-center">
                    <td className="px-4 py-2 border">{record.username}</td>
                    <td className="px-4 py-2 border">{record.date}</td>
                    <td className="px-4 py-2 border">{record.checkIn || "-"}</td>
                    <td className="px-4 py-2 border">{record.checkOut || "-"}</td>
                    <td className="px-4 py-2 border">
                      {record.breaks?.length > 0
                        ? record.breaks.map((b, idx) => (
                            <div key={idx}>
                              {b.outTime || "-"} → {b.inTime || "-"}
                            </div>
                          ))
                        : "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

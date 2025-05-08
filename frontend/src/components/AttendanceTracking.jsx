import React, { useEffect, useState } from "react";

const AttendanceTrackingAdmin = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const res = await fetch("http://localhost:5000/attendance/all");
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("Error fetching all attendance:", err);
      }
    };

    fetchAllAttendance();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Attendance Records</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Check-In</th>
            <th className="border px-4 py-2">Check-Out</th>
            <th className="border px-4 py-2">Breaks</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td className="border px-4 py-2">{record.username}</td>
              <td className="border px-4 py-2">{record.role}</td>
              <td className="border px-4 py-2">{record.date}</td>
              <td className="border px-4 py-2">{record.checkIn || "-"}</td>
              <td className="border px-4 py-2">{record.checkOut || "-"}</td>
              <td className="border px-4 py-2">
                {record.breaks.map((brk, index) => (
                  <div key={index}>
                    Out: {brk.outTime || "-"}, In: {brk.inTime || "-"}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTrackingAdmin;

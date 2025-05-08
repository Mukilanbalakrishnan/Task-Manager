
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MarkAttendance() {
  const [username] = useState(localStorage.getItem("username"));
  const [attendance, setAttendance] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayStr = new Date().toISOString().split("T")[0];
  const selectedStr = selectedDate.toISOString().split("T")[0];
  const isToday = selectedStr === todayStr;

  const fetchAttendance = async (date) => {
    const dateStr = date.toISOString().split("T")[0];
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/attendance/view?username=${username}&date=${dateStr}`
      );
      if (res.status === 404) {
        setAttendance(null);
        return;
      }
      const data = await res.json();
      setAttendance(data);
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
      setAttendance(null);
    }
  };

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate]);

  const handleAction = async (type) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/attendance/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      alert(data.message);
      fetchAttendance(selectedDate);
    } catch (err) {
      console.error(`Error during ${type}:`, err);
    }
  };

  const getTotalTime = () => {
    if (!attendance?.checkIn || !attendance?.checkOut) return { work: "-", break: "-" };

    const [h1, m1, s1 = 0] = attendance.checkIn.split(":").map(Number);
    const [h2, m2, s2 = 0] = attendance.checkOut.split(":").map(Number);
    const start = new Date();
    const end = new Date();
    start.setHours(h1, m1, s1);
    end.setHours(h2, m2, s2);
    const totalMs = end - start;

    const breakMs = attendance.breaks.reduce((total, b) => {
      if (b.inTime && b.outTime) {
        const [oh, om] = b.outTime.split(":").map(Number);
        const [ih, im] = b.inTime.split(":").map(Number);
        const out = new Date();
        const _in = new Date();
        out.setHours(oh, om, 0);
        _in.setHours(ih, im, 0);
        return total + (_in - out);
      }
      return total;
    }, 0);

    const workMs = totalMs - breakMs;
    const workH = Math.floor(workMs / (1000 * 60 * 60));
    const workM = Math.floor((workMs % (1000 * 60 * 60)) / (1000 * 60));
    const breakMins = Math.floor(breakMs / 60000);

    return {
      work: `${workH}h ${workM}m`,
      break: `${breakMins} mins`,
    };
  };

  const { work, break: breakTime } = getTotalTime();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">📅 My Attendance</h2>

      {isToday && (
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={() => handleAction("checkin")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Check In
          </button>
          <button
            onClick={() => handleAction("goout")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Go Out
          </button>
          <button
            onClick={() => handleAction("comein")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Come In
          </button>
          <button
            onClick={() => handleAction("checkout")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Check Out
          </button>
        </div>
      )}

      <div className="mb-6 text-center">
        <label className="mr-2 font-medium text-gray-700">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border px-3 py-2 rounded shadow"
        />
      </div>

      {attendance ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-sm rounded overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Check-In</th>
                <th className="p-3 border">Check-Out</th>
                <th className="p-3 border">Breaks (Out → In)</th>
                <th className="p-3 border">Work Time</th>
                <th className="p-3 border">Break Time</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="bg-white">
                <td className="p-3 border">{attendance.date}</td>
                <td className="p-3 border">{attendance.checkIn || "-"}</td>
                <td className="p-3 border">{attendance.checkOut || "-"}</td>
                <td className="p-3 border">
                  {attendance.breaks.length === 0
                    ? "None"
                    : attendance.breaks.map((b, i) => (
                        <div key={i}>
                          {b.outTime || "-"} → {b.inTime || "-"}
                        </div>
                      ))}
                </td>
                <td className="p-3 border">{work}</td>
                <td className="p-3 border">{breakTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No attendance record for selected date.
        </p>
      )}
    </div>
  );
}

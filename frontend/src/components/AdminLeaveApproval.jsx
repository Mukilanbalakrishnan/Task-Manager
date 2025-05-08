
import React, { useEffect, useState } from "react";

const AdminLeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/leave-requests`)
      .then((res) => res.json())
      .then((data) => setLeaves(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  

  const handleApproval = async (userId, action) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/leave-update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      if (res.ok) {
        const updated = leaves.map((leave) =>
          leave.userId._id === userId && leave.status === "pending"
            ? { ...leave, status: action }
            : leave
        );
        setLeaves(updated);
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Admin Leave Approval</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-blue-100 text-blue-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">From</th>
                <th className="px-6 py-4 text-left">To</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Reason</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b hover:bg-blue-50">
                  <td className="px-6 py-4">{leave.userId?.username || "—"}</td>
                  <td className="px-6 py-4">{leave.userId?.role || "—"}</td>
                  <td className="px-6 py-4">{leave.fromDate}</td>
                  <td className="px-6 py-4">{leave.toDate}</td>
                  <td className="px-6 py-4">{leave.leaveType}</td>
                  <td className="px-6 py-4">{leave.reason}</td>
                  <td className="px-6 py-4 capitalize">{leave.status}</td>
                  <td className="px-6 py-4">
                    {leave.status === "pending" && (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleApproval(leave.userId._id, "approved")}
                          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(leave.userId._id, "rejected")}
                          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveApproval;

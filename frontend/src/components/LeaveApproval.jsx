
import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leave/all`);
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setError("Failed to fetch leave requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/leave/status`, {
        id,
        status,
      });
      alert(res.data.message);
      fetchLeaves();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading leave requests...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Requests</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">From</th>
              <th className="py-3 px-4 text-left">To</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{leave.username}</td>
                <td className="py-2 px-4">{leave.fromDate}</td>
                <td className="py-2 px-4">{leave.toDate}</td>
                <td className="py-2 px-4">{leave.leaveType}</td>
                <td className="py-2 px-4">{leave.reason}</td>
                <td
                  className={`py-2 px-4 font-medium ${
                    leave.status === "approved"
                      ? "text-green-600"
                      : leave.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {leave.status}
                </td>
                <td className="py-2 px-4 space-x-2">
                  {leave.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(leave._id, "approved")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveApproval;
  
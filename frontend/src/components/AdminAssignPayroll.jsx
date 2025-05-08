import React, { useState } from "react";
import axios from "axios";

const AdminAssignPayroll = () => {
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
    month: "",
    status: "Pending"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/payroll`, formData);
      setMessage("Payroll assigned successfully!");
      setFormData({
        username: "",
        amount: "",
        month: "",
        status: "Pending"
      });
    } catch (err) {
      setMessage("Failed to assign payroll");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assign Payroll</h2>
      {message && <div className="mb-2 text-sm text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border rounded w-full px-2 py-1"
          />
        </div>
        <div>
          <label>Amount (₹):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="border rounded w-full px-2 py-1"
          />
        </div>
        <div>
          <label>Month:</label>
          <input
            type="text"
            name="month"
            placeholder="e.g. April 2025"
            value={formData.month}
            onChange={handleChange}
            required
            className="border rounded w-full px-2 py-1"
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign Payroll
        </button>
      </form>
    </div>
  );
};

export default AdminAssignPayroll;

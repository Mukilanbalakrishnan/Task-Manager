import React, { useState } from "react";
import "./LeaveRequest.css";
const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("Casual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      username: localStorage.getItem("username"), // Ensure username is stored at login
      fromDate: startDate,
      toDate: endDate,
      reason,
      leaveType,
    };

    try {
      const response = await fetch("http://localhost:5000/leave/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Leave applied:", data);
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit leave request.");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="leave-request-container">
      <h2>Leave Request</h2>

      {submitted ? (
        <p className="success-message">Leave request submitted successfully!</p>
      ) : (
        <form className="leave-form" onSubmit={handleSubmit}>
          <label>Leave Type:</label>
          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <label>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            required
          ></textarea>

          <button type="submit">Submit Request</button>
        </form>
      )}
    </div>
  );
};

export default LeaveRequest;

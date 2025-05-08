const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://visara1327:bp2ZiF4n9Ri7lyD7@mycluster.w0gv3.mongodb.net/Ems?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Error connecting to MongoDB Atlas:", err));


// ------------------ SCHEMAS ------------------
// User Schema: stores login credentials and role
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

// Task Schema: stores tasks assigned to users
  const TaskSchema = new mongoose.Schema({
    task: String,
    deadline: String,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "Pending" },
  });
  

// Attendance Schema: check-in/out times, breaks, date
const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  role: { type: String, enum: ['employee', 'manager'], required: true },
  managerName: String,
  date: { type: String, required: true },
  checkIn: String,
  checkOut: String,
  breaks: [
    {
      outTime: String,
      inTime: String,
    },
  ],
});

// Leave Schema: stores leave requests from users
const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  role: String,
  fromDate: String,
  toDate: String,
  reason: String,
  leaveType: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});
const payrollSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  }
});
// ------------------ MODELS ------------------
const User = mongoose.model("User", UserSchema, "Ems.userlogin");
const Task = mongoose.model("Task", TaskSchema, "Ems.tasks");
const Attendance = mongoose.model("Attendance", AttendanceSchema, "Ems.attendance");
const Leave = mongoose.model("Leave", LeaveSchema, "Ems.leaves");
const Payroll = mongoose.model("Payroll", payrollSchema,"Ems.payrolls");
// ------------------ AUTH ------------------
app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  console.log("Login attempt:", { username, password, role });

  try {
    const user = await User.findOne({ username, password, role });
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or role" });
    }

    res.json({ username: user.username, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});


// ------------------ USER MANAGEMENT ------------------
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({}, "username role");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.post("/admin/users1", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error(" Error adding user:", error.message);
    res.status(500).json({ message: "Failed to add user" });
  }
});

const { ObjectId } = require("mongodb");

// Update user
app.put('/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    // Update the user document by _id with the new data
    await db.collection("userlogin").updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, password, role } }
    );

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err); // Debug logging
    res.status(500).json({ error: "Failed to update user" });
  }
});


// Delete user
app.delete("/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Deleting user with ID:", id);

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(" Error deleting user:", error.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// Update user role
app.put("/admin/users/:username/role", async (req, res) => {
  try {
    const { username } = req.params;
    const { role } = req.body;

    if (!["employee", "manager", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ message: "Failed to update role" });
  }
});

// ------------------ payroll ------------------
// Admin assigns payroll
app.post('/admin/payroll', async (req, res) => {
  const { username, amount, month, status } = req.body;

  try {
    const newPayroll = new Payroll({
      username,
      amount,
      month,
      status: status || "Pending"
    });

    await newPayroll.save();
    res.status(201).json({ message: "Payroll assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to assign payroll" });
  }
});

// User views their own payroll
app.get('/user/payroll/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const payrollRecords = await Payroll.find({ username });
    res.json(payrollRecords);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payroll data" });
  }
});

// ------------------ TASKS ------------------
// Assign a task to a user
app.post("/assign-task", async (req, res) => {
  const { task, username, deadline } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const newTask = new Task({ task, assignee: user._id, deadline });
    await newTask.save();
    res.json({ message: `Task assigned to ${user.username}` });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Failed to assign task" });
  }
});

// Get all employee users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "employee" });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get tasks by employee username
app.get("/employee-tasks/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const tasks = await Task.find({ assignee: user._id }).populate("assignee", "username");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching employee tasks:", err);
    res.status(500).json({ message: "Failed to get employee tasks" });
  }
});

// Get all tasks with user info
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignee", "username role");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});
app.put("/complete-task/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: "Completed" },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task marked as completed", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Failed to update task status" });
  }
});


// ------------------ ATTENDANCE ------------------
// Manager Check-in
app.post("/attendance/manager-checkin", async (req, res) => {
  const { username, managerName } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString();
  try {
    const user = await User.findOne({ username });
    if (!user || user.role !== "manager") return res.status(404).json({ message: "Manager not found" });
    const existing = await Attendance.findOne({ userId: user._id, date: today });
    if (existing) return res.status(400).json({ message: "Manager already checked in" });
    const newAttendance = new Attendance({
      userId: user._id,
      username,
      role: "manager",
      managerName,
      date: today,
      checkIn: currentTime,
      breaks: [],
    });
    await newAttendance.save();
    res.json({ message: "Manager check-in successful", checkIn: currentTime });
  } catch (error) {
    console.error("Manager check-in error:", error);
    res.status(500).json({ message: "Error during manager check-in" });
  }
});

// Employee Check-in
app.post("/attendance/checkin", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString();

  try {
    const user = await User.findOne({ username });
    if (!user || user.role !== "employee") return res.status(404).json({ message: "Employee not found" });

    const existing = await Attendance.findOne({ userId: user._id, date: today });
    if (existing) return res.status(400).json({ message: "Already checked in today" });

    const newAttendance = new Attendance({
      userId: user._id,
      username,
      role: "employee",
      date: today,
      checkIn: currentTime,
      breaks: [],
    });

    await newAttendance.save();
    res.json({ message: "Check-in successful", checkIn: currentTime });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ message: "Error during check-in" });
  }
});


// Go Out
app.post("/attendance/goout", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString();

  try {
    const user = await User.findOne({ username });
    const attendance = await Attendance.findOne({ userId: user._id, date: today });

    if (!attendance) return res.status(404).json({ message: "No attendance found for today" });

    attendance.breaks.push({ outTime: currentTime });
    await attendance.save();

    res.json({ message: "Marked go out", outTime: currentTime });
  } catch (error) {
    console.error("Go out error:", error);
    res.status(500).json({ message: "Error during go out" });
  }
});

// Come In
app.post("/attendance/comein", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString();

  try {
    const user = await User.findOne({ username });
    const attendance = await Attendance.findOne({ userId: user._id, date: today });

    if (!attendance || attendance.breaks.length === 0)
      return res.status(404).json({ message: "No go out record found" });

    const lastBreak = attendance.breaks[attendance.breaks.length - 1];
    if (lastBreak.inTime) return res.status(400).json({ message: "Already came back in" });

    lastBreak.inTime = currentTime;
    await attendance.save();

    res.json({ message: "Came back in", inTime: currentTime });
  } catch (error) {
    console.error("Come in error:", error);
    res.status(500).json({ message: "Error during come in" });
  }
});

// Check Out
app.post("/attendance/checkout", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString();

  try {
    const user = await User.findOne({ username });
    const attendance = await Attendance.findOne({ userId: user._id, date: today });

    if (!attendance) return res.status(404).json({ message: "No attendance record for today" });
    if (attendance.checkOut) return res.status(400).json({ message: "Already checked out" });

    attendance.checkOut = currentTime;
    await attendance.save();

    res.json({ message: "Check-out successful", checkOut: currentTime });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Error during check-out" });
  }
});

// View individual attendance
app.get("/attendance/view", async (req, res) => {
  const { username, date } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const attendance = await Attendance.findOne({ userId: user._id, date });
    if (!attendance) return res.status(404).json({ message: "No attendance record for this date" });

    res.json(attendance);
  } catch (error) {
    console.error("View attendance error:", error);
    res.status(500).json({ message: "Error retrieving attendance" });
  }
});

// Get employee attendance
app.get("/attendance/employees", async (req, res) => {
  try {
    const employeesAttendance = await Attendance.find({ role: "employee" });
    res.json(employeesAttendance);
  } catch (error) {
    console.error("Error fetching employee attendance:", error);
    res.status(500).json({ message: "Failed to fetch employee attendance" });
  }
});
// Get all attendance
app.get("/attendance/all", async (req, res) => {
  try {
    const allAttendance = await Attendance.find({});
    res.json(allAttendance);
  } catch (error) {
    console.error("Error fetching all attendance:", error);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
});
app.post("/attendance/employee-checkout", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString();

  try {
    const user = await User.findOne({ username });
    const attendance = await Attendance.findOne({ userId: user._id, date: today });

    if (!attendance) return res.status(404).json({ message: "No check-in found" });

    if (attendance.checkOut)
      return res.status(400).json({ message: "Already checked out" });

    attendance.checkOut = currentTime;
    await attendance.save();

    res.json({ message: "Check-out successful", checkOut: currentTime });
  } catch (err) {
    console.error("Check-out error:", err);
    res.status(500).json({ message: "Server error during check-out" });
  }
});


// Manager's view of employee attendance
app.get("/manager-attendance", async (req, res) => {
  try {
    const employeesAttendance = await Attendance.find({ role: "employee" });
    res.json(employeesAttendance);
  } catch (error) {
    console.error("Error fetching manager-view attendance:", error);
    res.status(500).json({ message: "Failed to fetch employee attendance" });
  }
});

// ------------------ LEAVE MANAGEMENT ------------------
// Apply leave
app.post("/leave/apply", async (req, res) => {
  const { username, fromDate, toDate, reason, leaveType } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newLeave = new Leave({
      userId: user._id,
      username,
      role: user.role,
      fromDate,
      toDate,
      reason,
      leaveType,
    });

    await newLeave.save();
    res.json({ message: "Leave request submitted successfully" });
  } catch (error) {
    console.error("Leave request error:", error);
    res.status(500).json({ message: "Error submitting leave request" });
  }
});

// Get all leave requests
app.get("/leave/requests", async (req, res) => {
  try {
    const requests = await Leave.find({});
    res.json(requests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Failed to fetch leave requests" });
  }
});

// Update leave status
// app.post("/leave/update-status", async (req, res) => {
//   const { userId, status } = req.body;

//   if (!["approved", "rejected"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   try {
//     const leave = await Leave.findOne({ userId, status: "pending" }).sort({ createdAt: -1 });

//     if (!leave) return res.status(404).json({ message: "No pending leave found for this user" });

//     leave.status = status;
//     await leave.save();

//     res.json({ message: `Leave ${status} for ${leave.username}` });
//   } catch (error) {
//     console.error("Error updating leave status:", error);
//     res.status(500).json({ message: "Failed to update status" });
//   }
// });

app.post("/leave/status", async (req, res) => {
  const { id, status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const leave = await Leave.findById(id);

    if (!leave || leave.status !== "pending") {
      return res.status(404).json({ message: "No pending leave found for this ID" });
    }

    leave.status = status;
    await leave.save();

    res.json({ message: `Leave ${status} for ${leave.name}` });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});
// Get all leave applications
app.get("/leave/all", async (req, res) => {
  try {
    const allLeaves = await Leave.find({});
    res.json(allLeaves);
  } catch (error) {
    console.error("Error fetching all leave applications:", error);
    res.status(500).json({ message: "Failed to fetch leave data" });
  }
});

// Admin fetch leave with user info
app.get("/admin/leave-requests", async (req, res) => {
  try {
    const leaves = await Leave.find({}).populate("userId", "username role");
    res.json(leaves);
  } catch (error) {
    console.error("Admin leave fetch error:", error);
    res.status(500).json({ message: "Failed to fetch leave requests" });
  }
});

// Admin update leave status
app.put("/admin/leave-update/:userId", async (req, res) => {
  const { status } = req.body;
  const { userId } = req.params;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updated = await Leave.updateMany(
      { userId, status: "pending" },
      { $set: { status } }
    );
    res.json({ message: `Leaves ${status} for user`, updatedCount: updated.modifiedCount });
  } catch (error) {
    console.error("Admin leave update error:", error);
    res.status(500).json({ message: "Failed to update leave status" });
  }
});
app.get("/all-tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignee", "username");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching all tasks:", err);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

// ------------------ START SERVER ------------------
app.listen(5000, () => console.log(" Server running on port 5000"));

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage";
import Login from "./components/login.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ManagerDashboard from "./components/ManagerDashboard.jsx";
import EmployeeDashboard from "./components/EmployeeDashboard.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

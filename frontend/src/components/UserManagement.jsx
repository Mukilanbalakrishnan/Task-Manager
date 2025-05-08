// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./UserManagement.css"; // Optional CSS for styling

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     password: "",
//     role: "",
//   });

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Input change handler
//   const handleInputChange = (e) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   // Add new user
//   const handleAddUser = async () => {
//     try {
//       if (!newUser.username || !newUser.password || !newUser.role) {
//         alert("All fields are required.");
//         return;
//       }

//       await axios.post("http://localhost:5000/admin/users1", newUser);
//       fetchUsers();
//       setNewUser({ username: "", password: "", role: "" });
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   // Delete user
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/admin/users/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="user-management-container">
//       <h2>User Management</h2>

//       <div className="form-section">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={newUser.username}
//           onChange={handleInputChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={handleInputChange}
//         />
//         <select name="role" value={newUser.role} onChange={handleInputChange}>
//           <option value="">Select Role</option>
//           <option value="employee">Employee</option>
//           <option value="manager">Manager</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button onClick={handleAddUser}>Add User</button>
//       </div>

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.username}</td>
//               <td>{u.role}</td>
//               <td>
//                 <button className="delete-btn" onClick={() => handleDelete(u._id)}>
//                   Delete
//                 </button>
//                 {/* Optional: Add Edit button later */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;











import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.username || !newUser.password || !newUser.role) {
        alert("All fields are required.");
        return;
      }

      await axios.post("http://localhost:5000/admin/users1", newUser);
      fetchUsers();
      setNewUser({ username: "", password: "", role: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">User Management</h2>

      <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{u.username}</td>
                <td className="px-6 py-3 capitalize">{u.role}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

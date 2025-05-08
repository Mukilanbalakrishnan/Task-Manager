// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RoleManagement = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const updateRole = async (username, newRole) => {
//     try {
//       await axios.put(`http://localhost:5000/admin/users/${username}/role`, {
//         role: newRole,
//       });
//       fetchUsers();
//     } catch (error) {
//       console.error("Error updating role:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>Role Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Current Role</th>
//             <th>Change Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.username}>
//               <td>{user.username}</td>
//               <td>{user.role}</td>
//               <td>
//                 <select
//                   value={user.role}
//                   onChange={(e) => updateRole(user.username, e.target.value)}
//                 >
//                   <option value="employee">Employee</option>
//                   <option value="manager">Manager</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RoleManagement;











import React, { useEffect, useState } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateRole = async (username, newRole) => {
    try {
      await axios.put(`http://localhost:5000/admin/users/${username}/role`, {
        role: newRole,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Role Management</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-blue-100 text-blue-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Current Role</th>
                <th className="px-6 py-4 text-left">Change Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.username} className="border-b hover:bg-blue-50">
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.username, e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No users found.
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

export default RoleManagement;

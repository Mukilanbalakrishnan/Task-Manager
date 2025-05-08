// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewPayroll = () => {
//   const [payrolls, setPayrolls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     setUsername(storedUsername);

//     const fetchPayrolls = async () => {
//       try {
//         if (!storedUsername) {
//           setError("Username is not provided");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://localhost:5000/user/payroll/${storedUsername}`);
//         if (Array.isArray(response.data)) {
//           setPayrolls(response.data);
//         } else {
//           setPayrolls([]);
//           setError("Unexpected data format received");
//         }
//       } catch (err) {
//         console.error("Error fetching payroll:", err);
//         setError("Failed to fetch payroll data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayrolls();
//   }, []);

//   if (loading) return <p>Loading payroll data...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h2>Your Payroll Details</h2>
//       {payrolls.length === 0 ? (
//         <p>No payroll records found.</p>
//       ) : (
//         payrolls.map((payroll) => (
//           <div
//             key={payroll._id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               marginBottom: "10px",
//               borderRadius: "8px",
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             <p><strong>Month:</strong> {payroll.month}</p>
//             <p><strong>Amount:</strong> ₹{payroll.amount}</p>
//             <p><strong>Status:</strong> {payroll.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewPayroll;









import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const fetchPayrolls = async () => {
      try {
        if (!storedUsername) {
          setError("Username is not provided");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/user/payroll/${storedUsername}`);
        if (Array.isArray(response.data)) {
          setPayrolls(response.data);
        } else {
          setPayrolls([]);
          setError("Unexpected data format received");
        }
      } catch (err) {
        console.error("Error fetching payroll:", err);
        setError("Failed to fetch payroll data");
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, []);

  if (loading) return <div className="text-center mt-10 text-blue-600 text-lg">Loading payroll data...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Payroll Details</h2>

      {payrolls.length === 0 ? (
        <p className="text-center text-gray-600">No payroll records found.</p>
      ) : (
        <div className="grid gap-4">
          {payrolls.map((payroll) => (
            <div
              key={payroll._id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
            >
              <p className="text-gray-700">
                <span className="font-medium">Month:</span> {payroll.month}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Amount:</span> ₹{payroll.amount}
              </p>
              <p className={`text-sm font-semibold mt-1 ${
                payroll.status === "Paid" ? "text-green-600" : "text-yellow-600"
              }`}>
                Status: {payroll.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPayroll;

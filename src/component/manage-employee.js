// ManageEmployees.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "employees"));
    setEmployees(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔹 Delete employee
  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this employee?")) {
      await deleteDoc(doc(db, "employees", id));
      setMsg("✅ Employee deleted successfully!");
      fetchEmployees(); // refresh list
    }
  };

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Manage Employees</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.employeeID}</td>
                <td>{emp.fullName}</td>
                <td>{emp.dob}</td>
                <td>{emp.gender}</td>
                <td>{emp.contactNumber}</td>
                <td>{emp.email}</td>
                <td>{emp.address}</td>
                <td>
                  {/* Edit: Navigate to edit employee page */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/edit-employee/${emp.id}`)}
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </DashboardLayout>
  );
}

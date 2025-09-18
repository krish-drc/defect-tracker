// ManageRoles.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

export default function ManageRoles() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch all assignments
  const fetchAssignments = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "projectAssignments"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 🔹 Fetch project and employee names for display
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    const employeesSnapshot = await getDocs(collection(db, "employees"));

    const projectsMap = {};
    projectsSnapshot.docs.forEach((p) => {
      projectsMap[p.id] = p.data().projectName + " (" + p.data().projectID + ")";
    });

    const employeesMap = {};
    employeesSnapshot.docs.forEach((e) => {
      employeesMap[e.id] = e.data().fullName + " (" + e.data().employeeID + ")";
    });

    const enriched = data.map((a) => ({
      ...a,
      projectName: projectsMap[a.projectID] || "Unknown Project",
      employeeName: employeesMap[a.employeeID] || "Unknown Employee",
    }));

    setAssignments(enriched);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // 🔹 Delete assignment
  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this role assignment?")) {
      await deleteDoc(doc(db, "projectAssignments", id));
      setMsg("✅ Role assignment deleted successfully!");
      fetchAssignments(); // refresh list
    }
  };

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Manage Roles / Assignments</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      {loading ? (
        <p>Loading role assignments...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Employee</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, index) => (
              <tr key={a.id}>
                <td>{index + 1}</td>
                <td>{a.projectName}</td>
                <td>{a.employeeName}</td>
                <td>{a.role}</td>
                <td>
                  {/* Edit: Navigate to edit role page */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/edit-role/${a.id}`)}
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(a.id)}
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

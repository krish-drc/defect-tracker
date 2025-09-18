// EditRole.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    projectID: "",
    employeeID: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // 🔹 Fetch projects & employees for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      const projectSnap = await getDocs(collection(db, "projects"));
      setProjects(projectSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const employeeSnap = await getDocs(collection(db, "employees"));
      setEmployees(employeeSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // fetch current role data
      const docRef = doc(db, "projectAssignments", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm({
          projectID: docSnap.data().projectID,
          employeeID: docSnap.data().employeeID,
          role: docSnap.data().role,
        });
      } else {
        alert("Role assignment not found!");
        navigate("/manage-role");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const docRef = doc(db, "projectAssignments", id);
      await updateDoc(docRef, {
        ...form,
        updatedAt: serverTimestamp(),
      });
      setMsg("✅ Role updated successfully!");
      setLoading(false);
      navigate("/manage-role");
    } catch (error) {
      console.error(error);
      setMsg("❌ Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Edit Role Assignment</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        {/* Project Dropdown */}
        <div className="mb-3">
          <label>Project</label>
          <select
            name="projectID"
            className="form-control"
            value={form.projectID}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.projectName} ({p.projectID})
              </option>
            ))}
          </select>
        </div>

        {/* Employee Dropdown */}
        <div className="mb-3">
          <label>Employee</label>
          <select
            name="employeeID"
            className="form-control"
            value={form.employeeID}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.fullName} ({e.employeeID})
              </option>
            ))}
          </select>
        </div>

        {/* Role Dropdown */}
        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-control"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Role --</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
          </select>
        </div>

        <button className="btn btn-success mt-3" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Role"}
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}

// AssignRole.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import DashboardLayout from "../component/DashboardLayout";

export default function AssignRole() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    projectID: "",
    employeeID: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔹 Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProjects();
  }, []);

  // 🔹 Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await getDocs(collection(db, "employees"));
      setEmployees(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchEmployees();
  }, []);

  // 🔹 Handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // ✅ Store only doc.id references for project & employee
      await addDoc(collection(db, "projectAssignments"), {
        projectID: form.projectID,
        employeeID: form.employeeID,
        role: form.role,
        createdAt: serverTimestamp(),
      });

      setMsg("✅ Role assigned successfully!");
      setForm({
        projectID: "",
        employeeID: "",
        role: "",
      });
    } catch (error) {
      console.error(error);
      setMsg("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h2>Assign Employee to Project</h2>
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

          <button
            className="btn btn-primary mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign Role"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

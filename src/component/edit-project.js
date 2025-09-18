import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardLayout from "../component/DashboardLayout";


export default function EditProject() {
  const { id } = useParams(); // project document ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectName: "",
    projectID: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔹 Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        } else {
          setMsg("❌ Project not found!");
        }
      } catch (error) {
        console.error(error);
        setMsg("❌ Error fetching project.");
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, form);
      setMsg("✅ Project updated successfully!");
      setTimeout(() => navigate("/manage-project"), 1500); // go back to manage
    } catch (error) {
      console.error(error);
      setMsg("❌ Error updating project.");
    }

    setSaving(false);
  };

  if (loading) return <p>Loading project data...</p>;

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Edit Project</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            className="form-control"
            value={form.projectName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Project ID</label>
          <input
            type="text"
            name="projectID"
            className="form-control"
            value={form.projectID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Planned">Planned</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
              <option value="On-Hold">On-Hold</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Project"}
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}

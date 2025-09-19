import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import DashboardLayout from "../component/DashboardLayout";

export default function PostProject() {
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [projectID, setProjectID] = useState(""); // Store generated Project ID

  // Generate unique Project ID
  const generateProjectID = () => {
    const prefix = "PROJ";
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${prefix}${randomNum}`;
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const generatedID = generateProjectID(); // Auto-generate Project ID

      await addDoc(collection(db, "projects"), {
        ...form,
        projectID: generatedID, // use generated ID
        createdAt: serverTimestamp(),
      });

      setProjectID(generatedID); // display generated ID
      setMsg(`✅ Project posted successfully!`);

      setForm({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
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
        <h2>Post a Project</h2>
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
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
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

          <button
            className="btn btn-primary mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Project"}
          </button>
        </form>

        {projectID && (
          <div className="mt-3">
            <strong>Generated Project ID:</strong> {projectID}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "projects"));
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMsg("❌ Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      setMsg("✅ Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      setMsg("❌ Failed to delete project.");
    }
  };

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Manage Projects</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Project ID</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.projectName}</td>
                <td>{project.projectID}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/edit-project/${project.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(project.id)}
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

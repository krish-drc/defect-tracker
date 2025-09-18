import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

export default function EditEmployee() {
  const { id } = useParams(); // employee document ID from URL
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    employeeID: "",
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // 🔹 Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      const docRef = doc(db, "employees", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        setMsg("❌ Employee not found");
      }
      setLoading(false);
    };
    fetchEmployee();
  }, [id]);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const docRef = doc(db, "employees", id);
      await updateDoc(docRef, form);
      setMsg("✅ Employee updated successfully!");
      // Optional: navigate back to manage employees after 1-2s
      setTimeout(() => navigate("/manage-employee"), 1500);
    } catch (error) {
      console.error(error);
      setMsg("❌ Something went wrong. Please try again.");
    }
  };

  if (loading) return <p>Loading employee data...</p>;

  return (
    <DashboardLayout>
    <div className="container mt-4">
      <h2>Edit Employee</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeID"
            className="form-control"
            value={form.employeeID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select
            name="gender"
            className="form-control"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            className="form-control"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            rows={3}
            value={form.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button className="btn btn-success mt-3" type="submit">
          Update Employee
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}

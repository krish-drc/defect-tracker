import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import DashboardLayout from "../component/DashboardLayout"; 

export default function AddEmployee() {
  const [form, setForm] = useState({
    employeeID: "",
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await addDoc(collection(db, "employees"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setMsg("✅ Employee added successfully!");
      setForm({
        employeeID: "",
        fullName: "",
        dob: "",
        gender: "",
        contactNumber: "",
        email: "",
        address: "",
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
      <h2>Add Employee</h2>
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

        <button
          className="btn btn-success mt-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
</DashboardLayout>
  );


}

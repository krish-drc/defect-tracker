import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import DashboardLayout from "../component/DashboardLayout";

export default function AddEmployee() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [generatedID, setGeneratedID] = useState(""); 
  const [secretCode, setSecretCode] = useState(""); // store secret code

  // Generate unique Employee ID
  const generateEmployeeID = () => {
    const prefix = "EMP";
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${prefix}${randomNum}`;
  };

  // Generate random secret code (alphanumeric)
  const generateSecretCode = (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

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
      const employeeID = generateEmployeeID();
      const secret = generateSecretCode(); // generate secret code

      await addDoc(collection(db, "employees"), {
        ...form,
        employeeID,
        secretCode: secret,
        createdAt: serverTimestamp(),
      });

      setGeneratedID(employeeID);
      setSecretCode(secret); // store secret code to display
      setMsg(`✅ Employee added successfully!`);

      // Reset form
      setForm({
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

        {generatedID && (
          <div className="mt-3">
            <strong>Employee ID:</strong> {generatedID} <br />
            <strong>Secret Code:</strong> {secretCode}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

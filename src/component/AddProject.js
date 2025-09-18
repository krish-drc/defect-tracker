import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DashboardLayout from "../component/DashboardLayout"

export default function PostProject() {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    overview: "",
    price: "",
    fuelType: "",
    modelYear: "",
    seatingCapacity: "",
    accessories: {},
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        accessories: { ...prev.accessories, [name]: checked },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images to Firebase Storage
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `projects/${images[i].name}-${Date.now()}`);
        await uploadBytes(imageRef, images[i]);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Add document to Firestore
      await addDoc(collection(db, "projects"), {
        ...form,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      setMsg("Project posted successfully!");
      setForm({
        title: "",
        brand: "",
        overview: "",
        price: "",
        fuelType: "",
        modelYear: "",
        seatingCapacity: "",
        accessories: {},
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      setMsg("Something went wrong. Please try again.");
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
          <label>Project Title *</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Brand *</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Overview *</label>
          <textarea
            name="overview"
            className="form-control"
            value={form.overview}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Fuel Type</label>
            <select
              name="fuelType"
              className="form-control"
              value={form.fuelType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Model Year</label>
            <input
              type="text"
              name="modelYear"
              className="form-control"
              value={form.modelYear}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Seating Capacity</label>
            <input
              type="number"
              name="seatingCapacity"
              className="form-control"
              value={form.seatingCapacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>

        <h5>Accessories</h5>
        <div className="form-check">
          <input
            type="checkbox"
            name="airConditioner"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">Air Conditioner</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            name="powerSteering"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">Power Steering</label>
        </div>
        {/* Add more accessories checkboxes here */}

        <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Project"}
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}

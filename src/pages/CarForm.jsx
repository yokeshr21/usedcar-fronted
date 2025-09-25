import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/styles/CarForm.css";

export default function CarForm({ editMode = false }) {
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    description: "",
    imageUrl: ""
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      api.get(`/cars/${id}`).then(res => setCar(res.data));
    }
  }, [editMode, id]);

  const handleChange = (e) => setCar({ ...car, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let savedCar;
    if (editMode) {
      savedCar = (await api.put(`/cars/${id}`, car)).data;
      alert("Car updated successfully!");
    } else {
      savedCar = (await api.post("/cars", car)).data;
      alert("Car added successfully!");
    }

    // Upload image if file is selected
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await api.post(
        `/cars/${savedCar.id}/upload-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setCar(prev => ({ ...prev, imageUrl: uploadRes.data.imageUrl }));
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <input className="form-input" name="make" value={car.make} onChange={handleChange} placeholder="Make" />
      <input className="form-input" name="model" value={car.model} onChange={handleChange} placeholder="Model" />
      <input className="form-input" name="year" value={car.year} onChange={handleChange} placeholder="Year" />
      <input className="form-input" name="price" value={car.price} onChange={handleChange} placeholder="Price" />
      <input className="form-input" name="mileage" value={car.mileage} onChange={handleChange} placeholder="Mileage" />
      <textarea className="form-textarea" name="description" value={car.description} onChange={handleChange} placeholder="Description" />
      <input type="file" className="form-file" onChange={handleFileChange} />
      {car.imageUrl && <img src={car.imageUrl} alt="Car" className="form-preview" />}
      <button type="submit" className="form-btn">{editMode ? "Update Car" : "Add Car"}</button>
    </form>
  );
}
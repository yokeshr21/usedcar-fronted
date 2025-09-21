import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    api.get(`/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await api.delete(`/cars/${id}`);
      navigate("/");
    }
  };

  if (!car) return <p>Loading...</p>;

  console.log("Car image URL:", car.imageUrl);

  return (
    <div className="car-details">
       <h2>{car.make} {car.model}</h2>
       {car.imageUrl && <img src={car.imageUrl} alt="Car" className="details-image" />}
       <p>Year: {car.year}</p>
       <p>Price: Rs.{car.price}</p>
       <p>Mileage: {car.mileage} km</p>
       <p>{car.description}</p>
       {token && (
       <div className="actions">
       <button onClick={() => navigate(`/edit-car/${car.id}`)}>Edit</button>
       <button onClick={handleDelete}>Delete</button>
       </div>
       )}
    </div>
  );
}
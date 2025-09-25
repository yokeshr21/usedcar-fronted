import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import "../components/styles/CarCard.css";

export default function CarCard({ car }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await api.delete(`/cars/${car.id}`);
      navigate(0); // refresh the page
    }
  };

  return (
    <div className="car-card">
      {car.imageUrl && <img src={car.imageUrl} alt="Car" className="car-image" />}
      <h3>{car.make} {car.model}</h3>
      <p>Year: {car.year}</p>
      <p>Price: Rs.{car.price}</p>
      <Link to={`/cars/${car.id}`} className="details-link">View Details</Link>
      {token && (
        <div className="actions">
          <button onClick={() => navigate(`/edit-car/${car.id}`)}>Edit</button>
          <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
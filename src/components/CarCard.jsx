import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";

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
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      {car.imageUrl && <img src={car.imageUrl} alt="Car" width="300" />}
      <h3>{car.make} {car.model}</h3>
      <p>Year: {car.year}</p>
      <p>Price: Rs.{car.price}</p>
      <Link to={`/cars/${car.id}`}>View Details</Link>
      {token && (
        <>
          <button onClick={() => navigate(`/edit-car/${car.id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
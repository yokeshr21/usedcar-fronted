import { useEffect, useState } from "react";
import { getCars, deleteCar } from "../api/cars";
import { useNavigate } from "react-router-dom";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const isAuthenticated = !! localStorage.getItem("token");

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await getCars();
            setCars(res.data.content || res.data);
        } catch (err) {
            console.error("Error fetching cars", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this car?"))
            return;
        try {
            await deleteCar(id);
            fetchCars();
        } catch (err) {
            console.error("Error deleting car", err);
            alert("Failed to delete car");
        }
    };

    return (
        <div>
            <h1>Car List</h1>
            {isAuthenticated && (
                <button onClick={() =>
                    navigate("/cars/add")}>Add New Car</button>  
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {cars.map((car) => (
                    <div key={car.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        width: "250px",
                        borderRadius: "8px",
                    }}>
                        {car.imageUrl && (<img src={`http://localhost:8080/api/cars/images/${car.imageUrl}`}
                        alt={car.make}
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}/>
                    )}
                    <h3>{car.make} {car.model}</h3>
                    <p>Year: {car.year}</p>
                    <p>Mileage: {car.mileage}km</p>
                    <p>{car.description}</p>

                    <button onClick={() =>
                        navigate(`/cars/${car.id}`)}>View</button>

                    {isAuthenticated && ( <> 
                    <button onClick={() =>
                        navigate(`/cars/edit/${car.id}`)}>Edit</button>

                    <button onClick={() =>
                        handleDelete(car.id)}>Delete</button>
                    </>
                    )}
                    </div>
                ))}
            </div>
        </div>
    );
}
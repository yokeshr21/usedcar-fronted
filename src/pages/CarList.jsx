import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCars, deleteCar } from "../api/cars";
import LogoutButton from "../components/LogoutButton";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const isAuthenticated = !! localStorage.getItem("token");

    const fetchCars = async () => {
        try {
            const res = await getCars();
            console.log("Cars API Response:", res.data);
            setCars(res.data);
        } catch (err) {
            console.error("Error fetching cars", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this car?"))
            return;
        try {
            await deleteCar(id);
            setCars(cars.filter((car) => car.id !== id));
        } catch (err) {
            console.error("Error deleting car", err);
            alert("Failed to delete car");
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            <header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                <h1>All Cars</h1>
                <div>
                    {!isAuthenticated && <button onClick={() => navigate("/login")}>Login</button>}
                    {isAuthenticated && <LogoutButton />}
                </div>
            </header>
            {isAuthenticated && <button onClick={() => navigate("/cars/add")}>Add Car</button>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
                {cars.map((car) => (
                    <div key={car.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
                        <Link to={`/cars/${car.id}`}>
                            <img src={`http://localhost:8080/api/cars/images/${car.imageUrl}`} alt={car.make} style={{ width: "100%" }} />
                            <h3>{car.make} {car.model}</h3>
                        </Link>
                        <p>Year: {car.year}</p>
                        <p>Price: ${car.price}</p>
                        {isAuthenticated && (
                            <div>
                                <button onClick={() => navigate(`/cars/edit/${car.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
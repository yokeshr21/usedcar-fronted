import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../api/cars";

export default function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await getCarById(id);
                setCar(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCar();
    }, [id]);

    if (!car) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{car.make} {car.model}</h2>
            <img src={`http://localhost:8080/api/cars/images/${car.imageUrl}`} alt={car.make} style={{ width: "50%" }} />
            <p>{car.description}</p>
            <ul>
                <li>Year: {car.year}</li>
                <li>Price: ${car.price}</li>
                <li>Mileage: {car.mileage} km</li>
            </ul>
        </div>
    );

}
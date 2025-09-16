import { useParams } from "react-router-dom";

export default function CarDetails() {
    const { id } = useParams();
    return <h1>Car Details Page for Car ID: {id}</h1>;
}
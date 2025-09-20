import { useEffect, useState } from "react";
import api from "../api/axios";
import CarCard from "../components/CarCard";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    api.get(`/cars?page=${page}&size=5`)
      .then(res => {
        setCars(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  }, [page]);

  return (
    <div>
      <h2>Used Cars</h2>
      {cars.map(car => <CarCard key={car.id} car={car} />)}

      <div>
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span> Page {page + 1} of {totalPages} </span>
        <button disabled={page + 1 === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
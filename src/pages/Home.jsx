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
    <div className="home-container">
      <h2 className="page-title">Used Cars</h2>
      <div className="car-list">
      {cars.map(car => <CarCard key={car.id} car={car} />)}
      </div>

      <div className="pagination">
        <button className="page-btn" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span className="page-info"> Page {page + 1} of {totalPages} </span>
        <button className="page-btn" disabled={page + 1 === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
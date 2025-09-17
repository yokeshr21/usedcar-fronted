import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CarList from "./pages/CarList";
import CarDetails from "./pages/CarDetails";

function App() {
  const isAuthenticated = !! localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Cars (public) */}
      <Route path="/cars" element={<CarList />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/cars" />} />
    </Routes>
  );
}

export default App;
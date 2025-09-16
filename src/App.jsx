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

      {/* Protected Routes */}
      <Route path="/cars" element={isAuthenticated ? <CarList /> : <Navigate to="/login" />} />
      <Route path="/cars/:id" element={isAuthenticated ? <CarDetails /> : <Navigate to="/login" />} />
      
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/cars" />} />
    </Routes>
  );
}

export default App;
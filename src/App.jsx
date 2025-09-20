import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CarDetails from "./pages/CarDetails";
import CarForm from "./pages/CarForm";

export default function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/add-car" element={<CarForm />} />
          <Route path="/edit-car/:id" element={<CarForm editMode />} />
        </Routes>
      </Router>
  );
}
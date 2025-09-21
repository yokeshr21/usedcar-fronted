import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">Used car Hub</h1>
      <div className="nav-links">
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/add-car">Add Car</Link>
          <button onClick={logout} className="logout-btn">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      </div>
    </nav>
  );
}
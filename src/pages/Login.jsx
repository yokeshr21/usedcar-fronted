import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../pages/styles/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>
      <input className="login-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" className="login-btn">Login</button>
    </form>
    </div>
  );
}
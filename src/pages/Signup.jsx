import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, password, role: "USER" });
      alert("Signup successful!");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Signup</h2>
      <input className="login-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" className="login-btn">Signup</button>
    </form>
    </div>
  );
}
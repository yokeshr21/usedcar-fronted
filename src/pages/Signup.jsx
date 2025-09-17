import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, password });
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
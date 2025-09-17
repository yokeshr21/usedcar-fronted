import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} style={{ margin: "10px" }}>
            Logout
        </button>
    );
}
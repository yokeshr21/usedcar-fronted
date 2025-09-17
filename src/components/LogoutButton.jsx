import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return <button onClick={handleLogout}>Logout</button>;
}
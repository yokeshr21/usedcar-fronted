import API from "./axiosConfig";

export const signup = async (userData) => {
    return API.post("/auth/signup", userData);
};

export const login = async (userData) => {
    const response = await API.post("/auth/login", userData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response;
};

export const logout = () => {
    localStorage.removeItem("token");
}
import API from "./axiosConfig";

export const getCars = (page = 0, size = 10) => {
    return API.get(`/cars?page=${page}&size=${size}`);
};

export const searchCars = (params) => {
    return API.get("/cars/search", { params });
};

export const getCarById = (id) => {
    return API.get(`/cars/${id}`);
};

export const addCar = (car) => {
    return API.post("/cars", car);
};

export const updateCar = (id, car) => {
    return API.put(`/cars/${id}`, car);
};

export const deleteCar = (id) => {
    return API.delete(`/cars/${id}`);
};

export const uploadCarImage = (id, file) => {
    const formData = new FormData();
    formData.append("image", file);
    return API.post(`/cars/${id}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};


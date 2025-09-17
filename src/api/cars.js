import API from "./axiosConfig";

export const getCars = () => 
    API.get("/cars");

export const getCarById = (id) => 
    API.get(`/cars/${id}`);

export const addCar = (car) => 
    API.post("/cars", car);

export const updateCar = (id, car) =>
    API.put(`/cars/${id}`, car);

export const deleteCar = (id) =>
    API.delete(`/cars/${id}`);

export const uploadCarImage = (id, file) => {
    const formData = new FormData();
    formData.append("image", file);
    return API.post(`/cars/${id}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};


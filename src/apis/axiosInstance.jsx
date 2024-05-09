import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://bookstoreonl-be.onrender.com/api/v1",
    // baseURL: "http://localhost:3001/api/v1",
    timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    if (accessToken) {
        config.headers["x-access-token"] = accessToken;
    }

    return config;
});

export default axiosInstance;

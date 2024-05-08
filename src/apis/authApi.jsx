import axiosInstance from "./axiosInstance.jsx";

const authApi = {
    login: (values) => axiosInstance.post("/auth/login", values),
    register: (values) => axiosInstance.post("/auth/register", values),
    authUserInfo: () => axiosInstance.get("/auth/me"),
};

export default authApi;

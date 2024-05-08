import axiosInstance from "./axiosInstance.jsx";

const userApi = {
    updateAvatar: (formData) => axiosInstance.put("/user/upload-avatar", formData),
    updateUserInfo: (values) => axiosInstance.put("/user/update", values),
    updatePass: (values) => axiosInstance.put("/user/change-password", values),
};

export default userApi;

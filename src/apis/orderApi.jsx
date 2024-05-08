import axiosInstance from "./axiosInstance.jsx";

const orderApi = {
    postOrder: (values) => axiosInstance.post("/order/postneworder", values),
    getOrdersById: () => axiosInstance.get("/order/ordersById"),
    getOrderById: (orderId) => axiosInstance.get(`/order/orderById/${orderId}`),
};

export default orderApi;

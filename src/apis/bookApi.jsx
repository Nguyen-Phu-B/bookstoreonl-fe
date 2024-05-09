import axiosInstance from "./axiosInstance.jsx";

const bookApi = {
    addBook: (values) => axiosInstance.post("/books/addbook", values),
    getAll: () => axiosInstance.get("/books/all"),
    getTop: () => axiosInstance.get("/books/top"),
    getBookById: (bookId) => axiosInstance.get(`/books/detail/${bookId}`),
    getFindBooks: (bookName) => axiosInstance.get(`/books/findbooks?name=${bookName}`),
    getAllKinds: () => axiosInstance.get("/books/allKinds"),
    getBooksByKind: (kind, page, pageSize) =>
        axiosInstance.get(`/books/booksByKind/${kind}?page=${page}&pageSize=${pageSize}`),
};

export default bookApi;

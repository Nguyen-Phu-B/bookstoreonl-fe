import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import config from "../../config";
import { useLocation } from "react-router-dom";

import styles from "./Product.module.scss";
import bookApi from "../../apis/bookApi";
import Button from "../../components/Button";
import Img from "../../components/Images";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";

const cx = classNames.bind(styles);

const Product = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

    const handleAddToCart = () => {
        const item = {
            productId: book._id,
            quantity: quantity,
        };

        dispatch(addItemToCart(item));
        alert(`Sản phẩm được thêm vào giỏ hàng với số lượng ${quantity}`);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);

        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrese = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        const parts = location.pathname.split("/");
        const bookId = parts[parts.length - 1];

        const fetchData = async () => {
            try {
                const resBook = await bookApi.getBookById(bookId);

                setBook(resBook.data);
            } catch (error) {
                console.log("🚀 ~ fetchData ~ error:", error);
            }
        };

        fetchData();
    }, [location]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("gallery")}>
                    <div className={cx("picture")}>
                        <Img src={book.img} />
                    </div>
                </div>

                <div className={cx("overview")}>
                    <div className={cx("book-name")}>{book.nameBook}</div>
                    <div className={cx("book-info")}>
                        <div className={cx("label-info")}>
                            <label htmlFor="">NXB : </label>
                            <div className={cx("content-lbl")}>{book.publisher}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Hình thức :</label>
                            <div className={cx("content-lbl")}>{book.form == 0 ? "Bìa cứng" : "Bìa mềm"}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Tác giả :</label>
                            <div className={cx("content-lbl")}>{book.author}</div>
                        </div>
                    </div>
                    <div className={cx("book-price")}>
                        <div className={cx("re-price")}>{Number(book.rePrice).toLocaleString()} </div>
                        <div className={cx("price-dis")}>{Number(book.price).toLocaleString()} </div>
                        <div className={cx("discount")}>
                            <div className={cx("num-dis")}>{book.discount}%</div>
                        </div>
                    </div>
                    <div className={cx("quantity")}>
                        <label htmlFor="">Số lượng :</label>
                        <div className={cx("action-qua")}>
                            <button onClick={handleDecrease}>-</button>
                            <div className={cx("input-qua")}>
                                <input type="text" name="" id="" onChange={handleInputChange} value={quantity} />
                            </div>
                            <button onClick={handleIncrese}>+</button>
                        </div>
                    </div>
                    <div className={cx("action-btn")}>
                        <div className={cx("add-cart")}>
                            <Button primary className={cx("btn-x")} onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <div className={cx("buy-now")}>
                            <Button primary className={cx("btn-x")} onClick={handleAddToCart} to={config.routes.cart}>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx("info-product")}>
                <div className={cx("lbl-header")}>Thông tin sản phẩm</div>
                <div className={cx("wrapper-info")}>
                    <div className={cx("details-info")}>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Mã sản phẩm </label>
                            <div className={cx("content-lbl")}>{book._id}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Năm sản xuất </label>
                            <div className={cx("content-lbl")}>{book.date}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Nhà cung cấp </label>
                            <div className={cx("content-lbl")}>{book.supllier}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Thể loại</label>
                            <div className={cx("content-lbl")}>{book.kinds && book.kinds.join(", ")}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Tác giả</label>
                            <div className={cx("content-lbl")}>{book.author}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Số trang</label>
                            <div className={cx("content-lbl")}>{book.pageNumbers}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Nhà xuất bản</label>
                            <div className={cx("content-lbl")}>{book.publisher}</div>
                        </div>
                        <div className={cx("label-info")}>
                            <label htmlFor="">Hình thức</label>
                            <div className={cx("content-lbl")}>{book.form == 0 ? "Bìa cứng" : "Bìa mềm"}</div>
                        </div>
                    </div>
                    <div className={cx("description")}>
                        <div className={cx("lbl-des")}>Giới thiệu nội dung</div>
                        <div className={cx("val-des")}>{book.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;

import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import bookApi from "../../apis/bookApi";
import orderApi from "../../apis/orderApi";
import config from "../../config";
import styles from "./Cart.module.scss";
import Button from "../../components/Button";
import CartItem from "../../components/CartItem";
import {
    decreaseQuantity,
    increaseQuantity,
    removeCart,
    removeItemFromCart,
    updateCartItemsQuantity,
} from "../../redux/cartSlice";

const cx = classNames.bind(styles);

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.userLogin);
    const isLogin = useSelector((state) => state.auth.isLogin);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const [listData, setListData] = useState([]);
    const [inputValueQuantity, setInputValueQuantity] = useState({});
    const [isCheckedRules, setIsCheckedRules] = useState(false);

    useEffect(() => {
        if (user) {
            const userInitialValues = {
                userId: user._id,
                address: user?.address || "",
                userName: user?.fullName || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                orderList: cartItems,
                shipMethod: "0",
            };
            formik.setValues(userInitialValues);
        }
    }, [user]);

    const validationSchema = isLogin
        ? Yup.object({
              userName: Yup.string().required("!"),
              address: Yup.string().required("!"),
              email: Yup.string().email("!").required("!"),
              phoneNumber: Yup.string()
                  .matches(/^[0-9]+$/, "!")
                  .required("!"),
          })
        : null;

    const formik = useFormik({
        initialValues: {
            userId: "",
            address: "",
            userName: "",
            email: "",
            phoneNumber: "",
            orderList: cartItems,
            shipMethod: "0",
        },
        validationSchema,

        onSubmit: async (values) => {
            console.log(values);
            if (!user) {
                navigate(config.routes.user.replace(":action", "login"));
                const hisPath = location.pathname.split("/").pop();
                localStorage.setItem("hisPath", JSON.stringify(hisPath));
                return;
            }

            if (cartItems.length < 1) {
                alert("Không có sản phẩm tại giỏ hàng");
                return;
            }

            try {
                const fetchApi = await orderApi.postOrder(values);
                alert("Đơn hàng đã được tạo");
                localStorage.removeItem("cartItems");
                dispatch(removeCart());
                navigate(config.routes.home);
            } catch (error) {
                console.error("🚀 ~ onSubmit: ~ error:", error);
            }
        },
    });

    const { handleSubmit, handleChange, errors, touched, values } = formik;

    const handleCheckedRulesChange = (e) => {
        setIsCheckedRules(e.target.checked);
    };

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const debounceLocalStorageUpdate = debounce((productId, value) => {
        const item = {
            productId: productId,
            quantity: parseInt(value, 10),
        };

        dispatch(updateCartItemsQuantity(item));
    }, 500);

    const handleInputQuantityChange = (e, productId) => {
        const { value } = e.target;
        const parsedValue = parseInt(value, 10);

        if (parsedValue <= 0 || isNaN(parsedValue)) {
            alert("Số lượng sản phẩm không được nhỏ hơn 0");
            return;
        }

        setInputValueQuantity((prev) => ({
            ...prev,
            [productId]: value,
        }));

        debounceLocalStorageUpdate(productId, value);
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleIncreseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDeleteCartItem = (productId) => {
        dispatch(removeItemFromCart(productId));
    };

    useEffect(() => {
        const fetchDataForAllItems = async () => {
            try {
                const itemData = await Promise.all(
                    cartItems.map(async (item) => {
                        const resBook = await bookApi.getBookById(item.productId);
                        resBook.data.localQuantity = item.quantity;
                        return resBook.data;
                    }),
                );

                const initValueInput = {};
                itemData.forEach((item) => {
                    initValueInput[item._id] = item.localQuantity;
                });

                setListData(itemData);
                setInputValueQuantity(initValueInput);
            } catch (error) {
                console.log("🚀 ~ fetchDataForAllItems ~ error:", error);
            }
        };

        fetchDataForAllItems();
    }, [cartItems]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("overview")}>
                <div className={cx("details")}>
                    {listData.length > 0 ? (
                        listData.map((data) => (
                            <CartItem
                                data={data}
                                key={data._id}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                                handleIncreseQuantity={handleIncreseQuantity}
                                handleInputQuantityChange={handleInputQuantityChange}
                                handleDeleteCartItem={handleDeleteCartItem}
                                inputValue={inputValueQuantity}
                            />
                        ))
                    ) : (
                        <div>No Result</div>
                    )}

                    <div className={cx("info-pays")}>
                        <h1>Thông tin thanh toán</h1>
                        <form action="submit" className={cx("form-wrapper")}>
                            <div className={cx("input-info", "w-full")}>
                                <input
                                    type="text"
                                    name="userName"
                                    onChange={handleChange}
                                    value={values.userName}
                                    placeholder="Họ và tên"
                                />
                                {touched.userName && errors.userName ? (
                                    <div style={{ color: "red", width: "9%" }}>{errors.userName}</div>
                                ) : null}
                            </div>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    placeholder="Số điện thoại"
                                />
                                {touched.phoneNumber && errors.phoneNumber ? (
                                    <div style={{ color: "red", width: "20%" }}>{errors.phoneNumber}</div>
                                ) : null}
                            </div>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                {touched.email && errors.email ? (
                                    <div style={{ color: "red", width: "20%" }}>{errors.email}</div>
                                ) : null}
                            </div>
                            <b>Hình thức nhận hàng</b>
                            <div className={cx("radio-wrapper")}>
                                <div className={cx("radio-inner")}>
                                    <input
                                        type="radio"
                                        value="0"
                                        name="shipMethod"
                                        checked={values.shipMethod === "0"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="">Nhận tại nhà</label>
                                </div>
                                <div className={cx("radio-inner")}>
                                    <input
                                        type="radio"
                                        value="1"
                                        name="shipMethod"
                                        checked={values.shipMethod === "1"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="">Nhận tại cửa hành</label>
                                </div>
                            </div>
                            <b>Địa chỉ nhận hàng</b>
                            <div className={cx("input-info", "w-full")}>
                                <input
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={values.address}
                                    placeholder="Nhập địa chỉ nhận hàng"
                                />
                                {touched.address && errors.address ? (
                                    <div style={{ color: "red", width: "9%" }}>{errors.address}</div>
                                ) : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className={cx("total-wrapper")}>
                <div className={cx("total-inner")}>
                    <div className={cx("total-price")}>
                        <div className={cx("calc-total")}>
                            <p>Tổng thanh toán:</p>
                            <span>
                                {listData
                                    .reduce((total, item) => {
                                        const itemTotal = item.rePrice * item.localQuantity;

                                        return total + itemTotal;
                                    }, 0)
                                    .toLocaleString()}
                            </span>
                        </div>
                        <div className={cx("save-total")}>
                            <p>Tiết kiệm: </p>
                            <span>
                                {listData
                                    .reduce((total, item) => {
                                        const allTotal = item.price * item.localQuantity;
                                        const itemTotal = item.rePrice * item.localQuantity;

                                        return total + (allTotal - itemTotal);
                                    }, 0)
                                    .toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className={cx("action-price")}>
                        <div className={cx("rules-price")}>
                            <input type="radio" checked={isCheckedRules} onChange={handleCheckedRulesChange} />
                            <b>Tôi đã đọc và đồng ý với các điêu kiện</b>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Button primary type="submit" className={cx("btn-order")} disabled={!isCheckedRules}>
                                Tiến hành đặt hàng
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

import classNames from "classnames/bind";

import styles from "./OrderDetail.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import orderApi from "../../apis/orderApi";
import CartItem from "../../components/CartItem";
import bookApi from "../../apis/bookApi";
import Button from "../../components/Button";
import config from "../../config";

const cx = classNames.bind(styles);

const OrderDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [listData, setListData] = useState([]);
    const [inputValueQuantity, setInputValueQuantity] = useState({});

    const handleComeBackClick = () => {
        navigate(config.routes.orderHis);
    };

    useEffect(() => {
        const fetchApiGetOrder = async () => {
            try {
                setLoading(true);

                const param = location.pathname.split("/").pop();
                const getOrderById = await orderApi.getOrderById(param);
                console.log("🚀 ~ fetchApiGetOrder ~ getOrderById:", getOrderById);

                const itemsData = await Promise.all(
                    getOrderById.data.orderList.map(async (item) => {
                        const resBook = await bookApi.getBookById(item.productId);
                        resBook.data.orderQuantity = item.quantity;
                        resBook.data.orderPrice = item.price;
                        return resBook.data;
                    }),
                );

                const initValueInput = {};

                itemsData.forEach((item) => {
                    initValueInput[item._id] = item.orderQuantity;
                });

                console.log("🚀 ~ fetchApiGetOrder ~ itemsData:", itemsData);
                setListData(itemsData);
                setInputValueQuantity(initValueInput);
            } catch (error) {
                console.log("🚀 ~ fetchApiGetOrder ~ error:", error);
            } finally {
            }
        };
        fetchApiGetOrder();
    }, [location]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("over-view")}>
                {listData.map((item) => (
                    <CartItem
                        data={item}
                        key={item._id}
                        inputValue={inputValueQuantity}
                        readOnly
                        hideDecrease
                        hideIncress
                        hideBtnTrash
                    />
                ))}
            </div>
            <div className={cx("prices")}>
                <div className={cx("total-inner")}>
                    <div className={cx("total-price")}>
                        <div className={cx("calc-total")}>
                            <p>Tổng thanh toán:</p>
                            <span>
                                {listData
                                    .reduce((total, item) => {
                                        const itemTotal = item.rePrice * item.orderQuantity;
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
                                        const allTotal = item.price * item.orderQuantity;
                                        const itemTotal = item.rePrice * item.orderQuantity;
                                        return total + (allTotal - itemTotal);
                                    }, 0)
                                    .toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className={cx("actions")}>
                        <Button primary onClick={(e) => handleComeBackClick()}>
                            Trở về
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;

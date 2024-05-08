import classNames from "classnames/bind";
import styles from "./OrderHis.module.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import orderApi from "../../apis/orderApi";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const cx = classNames.bind(styles);

const OrderHis = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);

    const handleDetailClick = (idOrder) => {
        navigate(config.routes.orderDetail.replace(":idOrder", idOrder));
    };

    useEffect(() => {
        const fetchOrdesById = async () => {
            try {
                setLoading(true);
                const fetchApiGetOrdesById = await orderApi.getOrdersById();
                setData(fetchApiGetOrdesById.data);
                console.log("🚀 ~ fetchOrdesById ~ fetchApiGetOrdesById:", fetchApiGetOrdesById);
            } catch (error) {
                console.log("🚀 ~ useEffect ~ error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdesById();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("table-wrapper")}>
                    <div className={cx("table-inner")}>
                        <div className={cx("table-head")}>
                            <div className={cx("group-head")}>
                                <div className={cx("id-order")}>Mã đơn</div>
                                <div className={cx("user-name")}>Tên</div>
                                <div className={cx("phone-number")}>Số điện thoại</div>
                                <div className={cx("address")}>Địa chỉ</div>
                                <div className={cx("total-price")}>Tổng đơn</div>
                                <div className={cx("create-date")}>Ngày tạo</div>
                                <div className={cx("actions-table")}></div>
                            </div>
                        </div>
                        <div className={cx("table-body")}>
                            {data.map((item) => (
                                <div className={cx("group-body")} key={item._id}>
                                    <div className={cx("id-order")}>{item._id.slice(-8)}</div>
                                    <div className={cx("user-name")}>{item.userName}</div>
                                    <div className={cx("phone-number")}>{item.phoneNumber}</div>
                                    <div className={cx("address")}>{item.address}</div>
                                    <div className={cx("total-price")}>{Number(item.totalPrices).toLocaleString()}</div>
                                    <div className={cx("create-date")}>
                                        {format(new Date(item.createdAt), "dd/MM/yyyy")}
                                    </div>
                                    <div className={cx("actions-table")}>
                                        <Button
                                            outline
                                            leftIcon={<i className="fa-regular fa-file"></i>}
                                            onClick={(e) => handleDetailClick(item._id)}
                                        >
                                            Chi Tiết
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHis;

import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";

import config from "../../../config";
import styles from "./CardProducts.module.scss";
import Img from "../../../components/Images";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/cartSlice";

const cx = classNames.bind(styles);

const CardProducts = ({ data }) => {
    const dispatch = useDispatch();

    const handleAddCartClick = (productId) => {
        dispatch(addItemToCart({ productId: productId, quantity: 1 }));
        console.log("🚀 ~ handleAddCartClick ~ productId:", productId);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("img")}>
                <Link to={config.routes.product.replace(":product", data._id)}>
                    <Img src={data.img} />
                </Link>
            </div>
            <div className={cx("inner")}>
                <div className={cx("title")}>{data.nameBook}</div>
                <div className={cx("prices")}>
                    <div className={cx("inner-price")}>
                        <div className={cx("re-price")}>{Number(data.rePrice).toLocaleString()}</div>
                        <div className={cx("price")}>{Number(data.price).toLocaleString()}</div>
                    </div>
                    <div className={cx("discount")}>{data.discount}%</div>
                </div>
            </div>
            <div className={cx("sales")}>Da ban: 999+</div>
            <div className={cx("add")}>
                <Link to={config.routes.cart}>
                    <div className={cx("btn-add")} onClick={() => handleAddCartClick(data._id)}>
                        <div className={cx("btn-title")}>Mua ngay</div>
                        <div className={cx("icon")}>
                            <i className="fa-solid fa-cart-arrow-down fa-xl"></i>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardProducts;

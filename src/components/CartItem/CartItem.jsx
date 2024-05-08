import classNames from "classnames/bind";

import styles from "./CartItem.module.scss";
import Img from "../Images/Img";

const cx = classNames.bind(styles);

const CartItem = ({
    data,
    handleDeleteCartItem,
    handleDecreaseQuantity,
    handleIncreseQuantity,
    handleInputQuantityChange,
    inputValue,
    hideDecrease,
    hideIncress,
    hideBtnTrash,
    readOnly,
}) => {
    return (
        <div className={cx("card-detail")}>
            <div className={cx("icon-trash")} onClick={() => handleDeleteCartItem(data._id)}>
                {!hideBtnTrash && <i className="fa-regular fa-trash-can"></i>}
            </div>
            <div className={cx("img")}>
                <Img src={data.img} />
            </div>
            <div className={cx("info-product")}>
                <div className={cx("book-name")}>
                    <b>{data.nameBook} </b>
                </div>
                <div className={cx("details-book")}>
                    <div className={cx("content")}>
                        <div className={cx("lbl-content")}>Tác giả </div>
                        <div className={cx("value-content")}>{data.author}</div>
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("lbl-content")}>Giá bán </div>
                        <div className={cx("value-content", "cont-re-price")}>
                            {Number(data.rePrice).toLocaleString()}
                        </div>
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("lbl-content")}>NXB </div>
                        <div className={cx("value-content")}>{data.publisher}</div>
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("lbl-content")}>Giá gốc </div>
                        <div className={cx("value-content", "cont-price")}>{Number(data.price).toLocaleString()}</div>
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("lbl-content")}>Hình thức </div>
                        <div className={cx("value-content")}>{data.form == 0 ? "Bìa cứng" : "Bìa mềm"}</div>
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("lbl-content")}>Số lượng </div>
                        <div className={cx("value-content")}>
                            <div className={cx("action-qua")}>
                                <button
                                    style={hideDecrease && { display: "none" }}
                                    onClick={() => handleDecreaseQuantity(data._id)}
                                >
                                    -
                                </button>
                                <div className={cx("input-qua")}>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={inputValue[data._id] || ""}
                                        readOnly={readOnly}
                                        onChange={(e) => handleInputQuantityChange(e, data._id)}
                                    />
                                </div>
                                <button
                                    style={hideIncress && { display: "none" }}
                                    onClick={() => handleIncreseQuantity(data._id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;

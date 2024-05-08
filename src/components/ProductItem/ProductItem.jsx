import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./ProductItem.module.scss";
import Img from "../Images";

const cx = classNames.bind(styles);

const defFunc = () => {};

const ProductItem = ({ data, onClick = defFunc }) => {
    return (
        <Link to={`/product/${data._id}`} className={cx("wrapper")} onClick={onClick}>
            <Img className={cx("img-prod")} src={data.img} alt={data.nameBook} />
            <div className={cx("info")}>
                <div className={cx("name-book")}>{data.nameBook}</div>
                <div className={cx("book-info")}>
                    <div className={cx("group-content")}>
                        <div className={cx("content-info")}>
                            <div>NXB</div>
                            <span>{data.publisher}</span>
                        </div>
                        <div className={cx("content-info")}>
                            <div>Tác giả</div>
                            <span>{data.author}</span>
                        </div>
                    </div>
                    <div className={cx("discount")}>
                        <div className={cx("num-discount")}>{data.discount}%</div>
                    </div>
                </div>
                <div className={cx("price")}>
                    <div className={cx("dis-price")}>{Number(data.price).toLocaleString()}</div>
                    <div className={cx("re-price")}>{Number(data.rePrice).toLocaleString()}</div>
                </div>
            </div>
        </Link>
    );
};

ProductItem.protoTypes = {
    data: PropTypes.object.isRequired,
};

export default ProductItem;

import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./PopperWrapper.module.scss";

const cx = classNames.bind(styles);

const PopperWrapper = ({ children, className }) => {
    return <div className={cx("wrapper", className)}>{children}</div>;
};

PopperWrapper.prototype = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
};

export default PopperWrapper;

import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { forwardRef, useState } from "react";

import noImg from "../../assets/Image/no-image.png";
import styles from "./Img.module.scss";

const cx = classNames.bind(styles);

const Img = forwardRef(({ fallback = noImg, className, src, alt, ...props }, ref) => {
    const [fallBack, setFallBack] = useState("");

    const classes = cx("wrapper", className);

    const handleErr = () => setFallBack(fallback);

    return <img className={classes} ref={ref} src={fallBack || src} alt={alt} {...props} onError={handleErr} />;
});

Img.propTypes = {
    fallback: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
};

export default Img;

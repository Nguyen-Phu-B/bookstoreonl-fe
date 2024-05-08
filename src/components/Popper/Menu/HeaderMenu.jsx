import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
const HeaderMenu = ({ title, onBack }) => {
    return (
        <header className={cx("header")}>
            <button className={cx("back-btn")} onClick={onBack}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h4 className={cx("header-title")}>{title}</h4>
        </header>
    );
};

HeaderMenu.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default HeaderMenu;

import classNames from "classnames/bind";
import Header from "../ComponentLayout/Header";
import styles from "./DefautLayout.module.scss";
import Footer from "../ComponentLayout/Footer";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

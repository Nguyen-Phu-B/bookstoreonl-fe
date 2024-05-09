import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./User.module.scss";
import Button from "../../components/Button";
import Register from "./Register";
import Login from "./Login";
import ChangePassword from "./ChangePassword";

const cx = classNames.bind(styles);

const User = () => {
    const location = useLocation();

    const [actionPage, setActionPage] = useState("");

    useEffect(() => {
        const parts = location.pathname.split("/");
        const actPage = parts[parts.length - 1];
        setActionPage(actPage);
    }, [location, actionPage]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                {actionPage == "register" ? <Register /> : <></>}
                {actionPage == "login" ? <Login /> : <></>}
                {actionPage == "changepass" ? <ChangePassword /> : <></>}
            </div>
        </div>
    );
};

export default User;

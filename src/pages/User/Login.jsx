import classNames from "classnames/bind";
import styles from "./User.module.scss";
import Button from "../../components/Button";
import config from "../../config";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import authApi from "../../apis/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            loginInfo: "",
            password: "",
        },
        validationSchema: Yup.object({
            loginInfo: Yup.string().required("Tên đăng nhập không được để trống"),
            password: Yup.string().required("Vui lòng nhập mậy khẩu"),
        }),
        onSubmit: async (values) => {
            console.log("🚀 ~ Register ~ values:", values);
            try {
                setLoading(true);
                const fetchApiLogin = await authApi.login(values);
                const accesToken = fetchApiLogin.data;
                localStorage.setItem("accessToken", JSON.stringify(accesToken));
                const resUserProfile = await authApi.authUserInfo();
                dispatch(login(resUserProfile.data.userInfo));
            } catch (error) {
                console.error("🚀 ~ onSubmit: ~ error:", error);
            } finally {
                const hisPath = JSON.parse(localStorage.getItem("hisPath"));
                navigate(config.routes[hisPath] || config.routes.home);
                localStorage.removeItem("hisPath");
                setLoading(false);
            }
        },
    });

    const { touched, errors, values, handleChange, handleSubmit } = formik;

    const handleCancelForm = () => {
        navigate(config.routes.home);
    };

    return (
        <form action="summit" className={cx("form")}>
            <h1>Đăng nhập</h1>
            <div className={cx("w-full")}>
                {errors.loginInfo && touched.loginInfo ? <div className={cx("error")}>{errors.loginInfo}</div> : null}
                <div className={cx("input-info")}>
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        name="loginInfo"
                        onChange={handleChange}
                        value={values.loginInfo}
                    />
                </div>
            </div>
            <div className={cx("w-full")}>
                {errors.password && touched.password ? <div className={cx("error")}>{errors.password}</div> : null}
                <div className={cx("input-info")}>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
            </div>

            <div className={cx("actions-login")}>
                <Link to={config.routes.user.replace(":action", "register")}>Đăng ký tài khoản</Link>
                {/* <Link to={config.routes.user.replace(":action", "misspass")}>Quên mật khẩu?</Link> */}
            </div>

            <div className={cx("actions")}>
                <Button primary large onClick={handleSubmit}>
                    Đăng nhập
                </Button>
                <Button primary large onClick={handleCancelForm}>
                    Huỷ
                </Button>
            </div>
        </form>
    );
};

export default Login;

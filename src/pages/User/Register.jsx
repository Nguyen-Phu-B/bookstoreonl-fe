import classNames from "classnames/bind";
import styles from "./User.module.scss";
import Button from "../../components/Button";
import config from "../../config";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import authApi from "../../apis/authApi";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            phoneNumber: "",
            password: "",
            rePassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email "),
            phoneNumber: Yup.string()
                .matches(/^(0)[0-9]{9}$/, "Số điện thoại không hợp lệ, phải bắt đầu từ số 0 và có đúng 10 chữ số")
                .required("Vui lòng nhập số điện thoại"),
            password: Yup.string().required("Vui lòng nhập mật khẩu"),
            rePassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
                .required("Vui lòng xác nhận mật khẩu"),
        }),
        onSubmit: async (values) => {
            console.log("🚀 ~ Register ~ values:", values);
            try {
                setLoading(true);
                const fetchApiRegister = await authApi.register(values);
                console.log("🚀 ~ onSubmit: ~ fetchApiRegister:", fetchApiRegister);
            } catch (error) {
                console.error("🚀 ~ onSubmit: ~ error:", error);
            } finally {
                setLoading(false);
                alert("Đăng ký tài khoản thành công");
                navigate(config.routes.home);
            }
        },
    });

    const { touched, errors, values, handleChange, handleSubmit, setValues } = formik;

    const handleCancelForm = () => {
        navigate(config.routes.home);
    };

    return (
        <form action="summit" className={cx("form")}>
            <h1>Đăng ký tài khoản</h1>
            <div className={cx("w-full")}>
                {errors.email && touched.email ? <div className={cx("error")}>{errors.email}</div> : null}
                <div className={cx("input-info")}>
                    <input type="text" placeholder="Email" name="email" onChange={handleChange} value={values.email} />
                </div>
            </div>
            <div className={cx("w-full")}>
                {errors.phoneNumber && touched.phoneNumber ? (
                    <div className={cx("error")}>{errors.phoneNumber}</div>
                ) : null}
                <div className={cx("input-info")}>
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        name="phoneNumber"
                        onChange={handleChange}
                        value={values.phoneNumber}
                    />
                </div>
            </div>
            <div className={cx("w-full")}>
                {errors.password && touched.password ? <div className={cx("error")}>{errors.password}</div> : null}
                <div className={cx("input-info")}>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
            </div>
            <div className={cx("w-full")}>
                {errors.rePassword && touched.rePassword ? (
                    <div className={cx("error")}>{errors.rePassword}</div>
                ) : null}
                <div className={cx("input-info")}>
                    <input
                        type="password"
                        placeholder="Xác nhận Password"
                        name="rePassword"
                        onChange={handleChange}
                        value={values.rePassword}
                    />
                </div>
            </div>

            <div className={cx("actions")}>
                <Button type="submit" primary large onClick={handleSubmit}>
                    Xác nhận
                </Button>
                <Button primary large onClick={handleCancelForm}>
                    Huỷ
                </Button>
            </div>
        </form>
    );
};

export default Register;

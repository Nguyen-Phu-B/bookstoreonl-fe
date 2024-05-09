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
import userApi from "../../apis/userApi";

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            reNewPass: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Mật khẩu hiện tại không được để trống"),
            newPassword: Yup.string().required("Mật khẩu mới không được để trống"),
            reNewPass: Yup.string().oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp"),
        }),
        onSubmit: async (values) => {
            const { reNewPass, ...otherValues } = values;
            try {
                setLoading(true);
                const fetchApiChangePass = await userApi.updatePass(values);
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
            <h1>Đổi mật khẩu</h1>
            <div className={cx("w-full")}>
                {errors.password && touched.password ? <div className={cx("error")}>{errors.password}</div> : null}
                <div className={cx("input-info")}>
                    <input
                        type="password"
                        placeholder="Mật khẩu hiện tại"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
            </div>
            <div className={cx("w-full")}>
                {errors.newPassword && touched.newPassword ? (
                    <div className={cx("error")}>{errors.newPassword}</div>
                ) : null}
                <div className={cx("input-info")}>
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        name="newPassword"
                        onChange={handleChange}
                        value={values.newPassword}
                    />
                </div>
            </div>
            <div className={cx("w-full")}>
                {errors.reNewPass && touched.reNewPass ? <div className={cx("error")}>{errors.reNewPass}</div> : null}
                <div className={cx("input-info")}>
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        name="reNewPass"
                        onChange={handleChange}
                        value={values.reNewPass}
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

export default ChangePassword;

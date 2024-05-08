import classNames from "classnames/bind";

import styles from "./Profile.module.scss";
import Img from "../../components/Images/Img";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { useEffect, useRef, useState } from "react";
import { userApi } from "../../apis";
import { login, updateAvatar, updateUser } from "../../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const cx = classNames.bind(styles);

const Profile = () => {
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    // console.log("🚀 ~ Profile ~ selectedFile:", selectedFile);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.userLogin);
    // console.log("🚀 ~ Profile ~ user:", user);

    useEffect(() => {
        if (user) {
            const userInitialValues = {
                fullName: user?.fullName || "",
                phoneNumber: user?.phoneNumber || "",
                email: user?.email || "",
                birthday: user?.birthday || "",
                gender: user?.gender || 1,
                address: user?.address || "",
            };
            formik.setValues(userInitialValues);
        }
    }, [user]);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            birthday: "",
            gender: 1,
            address: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Vui lòng nhập họ và tên"),
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
            email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
            phoneNumber: Yup.string()
                .matches(/^(0)[0-9]{9}$/, "Số điện thoại không hợp lệ, phải bắt đầu từ số 0 và có đúng 10 chữ số")
                .required("Vui lòng nhập số điện thoại"),
            birthday: Yup.string().matches(
                /^\d{1,2}\/\d{1,2}\/\d{4}$/,
                "Ngày sinh không hợp lệ, hãy nhập lại dưới dạng dd/mm/yyyy",
            ),
        }),
        onSubmit: async (values) => {
            console.log("🚀 ~ Profile ~ values:", values);
            try {
                setLoading(true);
                const fetchApi = await userApi.updateUserInfo(values);
                // console.log("🚀 ~ onSubmit: ~ fetchApi:", fetchApi);
                alert("Thông tin người dùng đã được cập nhật");
                dispatch(updateUser(fetchApi.data));
            } catch (error) {
                console.error("🚀 ~ onSubmit: ~ error:", error);
            } finally {
                setLoading(false);
            }
        },
    });

    const { values, errors, touched, handleSubmit, handleChange } = formik;

    const handleUpdateAvatar = async () => {
        if (!selectedFile) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatarUser", selectedFile);
            const res = await userApi.updateAvatar(formData);
            dispatch(updateAvatar(res.data));
        } catch (error) {
            console.errorr("🚀 ~ handleUpdateAvatar ~ error:", error);
        } finally {
            setLoading(false);
            alert("Hình ảnh người dùng đã được cập nhật");
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleCancelUpdateInfo = () => {
        navigate(config.routes.home);
    };

    useEffect(() => {
        handleUpdateAvatar();
    }, [selectedFile]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("gallery")}>
                    <div className={cx("avatar")}>
                        <Img src={user?.avatar} />
                    </div>
                    <div className={cx("action-avatar")}>
                        {loading ? (
                            <div style={{ color: "blue" }}>Loading</div>
                        ) : (
                            <button onClick={handleEditClick}>Sửa</button>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className={cx("overview")}>
                    <div className={cx("title-header")}>Thông tin cá nhân</div>
                    <form className={cx("form-wrapper")} onSubmit={handleSubmit}>
                        <div className={cx("w-full")}>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    placeholder="Tên người dùng"
                                />
                            </div>
                            {errors.fullName && touched.fullName ? (
                                <div className={cx("error")}>{errors.fullName}</div>
                            ) : null}
                        </div>
                        <div className={cx("w-full")}>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    placeholder="Số điện thoại"
                                />
                            </div>
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <div className={cx("error")}>{errors.phoneNumber}</div>
                            ) : null}
                        </div>
                        <div className={cx("w-full")}>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    placeholder="Email"
                                />
                            </div>
                            {errors.email && touched.email ? <div className={cx("error")}>{errors.email}</div> : null}
                        </div>
                        <div className={cx("w-half")}>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="birthday"
                                    onChange={handleChange}
                                    value={values.birthday}
                                    placeholder="Ngày sinh"
                                />
                            </div>
                            {errors.birthday && touched.birthday ? (
                                <div className={cx("error")}>{errors.birthday}</div>
                            ) : null}
                        </div>
                        <div className={cx("input-info", "w-half")}>
                            <select name="gender" onChange={handleChange} value={values.gender}>
                                <option value="2">Nam</option>
                                <option value="3">Nữ</option>
                                <option value="1">Khác</option>
                            </select>
                        </div>
                        <div className={cx("w-full")}>
                            <div className={cx("input-info")}>
                                <input
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={values.address}
                                    placeholder="Địa chỉ"
                                />
                            </div>
                            {errors.address && touched.address ? (
                                <div className={cx("error")}>{errors.address}</div>
                            ) : null}
                        </div>
                    </form>
                    <div className={cx("actions")}>
                        <Button primary large onClick={handleCancelUpdateInfo}>
                            Huỷ
                        </Button>
                        <Button type="submit" primary large onClick={handleSubmit}>
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

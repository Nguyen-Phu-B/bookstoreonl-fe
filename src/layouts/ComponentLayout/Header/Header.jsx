import classNames from "classnames/bind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import authApi from "../../../apis/authApi";
import config from "../../../config";
import logo from "../../../assets/Image/logo.png";
import Button from "../../../components/Button";
import Search from "../Search";
import Img from "../../../components/Images/Img";
import { login, logout } from "../../../redux/authSlice";
import Menu from "../../../components/Popper/Menu";
import bookApi from "../../../apis/bookApi";
import { updateKinds } from "../../../redux/kindsSlice";

const cx = classNames.bind(styles);

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.auth.userLogin);
    const isLogin = useSelector((state) => state.auth.isLogin);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const listKinds = useSelector((state) => state.kinds.listKinds);

    const MENU_LOGIN_ITEMS = [
        {
            icon: <i className="fa-solid fa-user"></i>,
            title: "Thông tin cá nhân",
            to: config.routes.profile.replace(":profile", user?._id),
        },
        {
            icon: <i className="fa-solid fa-list"></i>,
            title: "Đơn hàng đã mua",
            to: config.routes.orderHis,
        },
        // {
        //     icon: <i className="fa-solid fa-book-bookmark"></i>,
        //     title: "Chủ đề yêu thích",
        //     to: "/setting",
        // },
        {
            icon: <i className="fa-solid fa-repeat"></i>,
            title: "Đổi mật khẩu",
            type: "changePass",
        },
        {
            icon: <i className="fa-solid fa-right-from-bracket"></i>,
            title: "Đăng xuất",
            separate: true,
            onClick: true,
        },
    ];

    const [loading, setLoading] = useState(false);
    const [dataMenuLogin, setDataMenuLogin] = useState([]);
    const [dataMenuKinds, setDataMenuKinds] = useState([]);

    useEffect(() => {
        const fetchApiGetAllKinds = async () => {
            try {
                setLoading(true);
                const allKinds = await bookApi.getAllKinds();

                const menuKinds = allKinds.data.map((item) => ({
                    title: item,
                    type: item
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .replace(/\s+/g, "")
                        .replace(/đ/g, "d"),
                }));
                dispatch(updateKinds(menuKinds));
                setDataMenuKinds(menuKinds);
            } catch (error) {
                console.log("🚀 ~ fetchApiGetAllKinds ~ error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApiGetAllKinds();
    }, []);

    const handleLogOutClick = () => {
        dispatch(logout());
        navigate(config.routes.home);
    };

    const handleLoginClick = () => {
        navigate(config.routes.user.replace(":action", "login"));
    };

    useEffect(() => {
        if (!!isLogin) {
            setDataMenuLogin(MENU_LOGIN_ITEMS);
        } else {
            setDataMenuLogin([]);
        }
    }, [isLogin]);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case "changePass":
                navigate(config.routes.user.replace(":action", "changepass"));
                const hisPath = location.pathname.split("/").pop();
                localStorage.setItem("hisPath", JSON.stringify(hisPath));
                break;
            default:
                const handler = dataMenuKinds.find((item) => item.type === menuItem.type);
                if (handler) {
                    const url = config.routes.kind.replace(":kind", handler.type);
                    if (url) {
                        navigate(`${url}?title=${handler.title}&page=1&pageSize=12`);
                    } else {
                        console.error(`URL not found for type: ${menuItem.type}`);
                    }
                }
                break;
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const fetchUserData = async () => {
                try {
                    const resUserProfile = await authApi.authUserInfo();
                    dispatch(login(resUserProfile.data.userInfo));
                } catch (error) {
                    console.log("🚀 ~ fetchUserData ~ error:", error);
                }
            };

            fetchUserData();
        }
    }, [dispatch]);

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link to={config.routes.home} className={cx("logo")}>
                    <img src={logo} alt="BookStore"></img>
                    <h1 className={cx("logo-name")}>BookStore</h1>
                </Link>
                <div>
                    <Button outline to={config.routes.home}>
                        Trang chủ
                    </Button>
                    <Menu items={dataMenuKinds} onChange={handleMenuChange} className={cx("custom-witdh-popper")}>
                        <Button outline className={cx("custom-btn")}>
                            Thể loại
                        </Button>
                    </Menu>
                    <Button outline className={cx("custom-btn")}>
                        Liên hệ
                    </Button>
                </div>
                <Search />
                <div className={cx("actions")}>
                    <button className={cx("action-btn")} style={{ display: "none" }}>
                        <i className="fa-solid fa-bell"></i>
                        <div className={cx("action-title")}>Thông báo</div>
                    </button>
                    <Link to={config.routes.cart}>
                        <button className={cx("action-btn")}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <div className={cx("action-title")}>Giỏ hàng</div>
                            {cartItems ? <span className={cx("quantity-cart")}>{cartItems.length}</span> : <></>}
                        </button>
                    </Link>

                    {isLogin ? (
                        <Menu items={dataMenuLogin} onChange={handleMenuChange} onClick={handleLogOutClick}>
                            <Img className={cx("avatar")} src={user?.avatar} alt="" />
                        </Menu>
                    ) : (
                        <button className={cx("action-btn")} onClick={handleLoginClick}>
                            <i className="fa-solid fa-user"></i>
                            <div className={cx("action-title")}>Tài khoản</div>
                        </button>
                    )}
                </div>
            </div>

            {/* Modal */}
            {/* {isModalOpen && (
                <div className={cx("modal")} onClick={handleToggleModal}>
                    <div className={cx("modal_inner")} onClick={(e) => e.stopPropagation()}>
                        <div className={cx("modal_header")}>
                            <p>Đăng nhập</p>
                            <i className="fa-regular fa-circle-xmark" onClick={handleToggleModal}></i>
                        </div>
                        <div className={cx("modal_body")}>
                            <Login toggleModal={handleToggleModal} />
                        </div>
                    </div>
                </div>
            )} */}
        </header>
    );
};

export default Header;

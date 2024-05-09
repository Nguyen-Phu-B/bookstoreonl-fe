import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import config from "../../../config";
import logo from "../../../assets/Image/logo.png";

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("ft-logo")}>
                    <Link to={config.routes.home} className={cx("logo")}>
                        <img src={logo} alt="BookStore"></img>
                        <h1 className={cx("logo-name")}>BookStore</h1>
                    </Link>
                    <div className={cx("about")}>
                        BookStore.com nhận đặt hàng trực tuyến và giao hàng tận nơi nhằm mang đến trải nghiệm tốt nhất
                        về sản phẩm và dịch vụ của BookStore cho người dùng trên toàn quốc.
                    </div>

                    <div className={cx("ft-social-app")}>
                        <div className={cx("social-icon")}>
                            <Link>
                                <i className="fa-brands fa-facebook fa-2xl"></i>
                            </Link>
                        </div>
                        <div className={cx("social-icon")}>
                            <Link>
                                <i className="fa-brands fa-tiktok fa-2xl"></i>
                            </Link>
                        </div>
                        <div className={cx("social-icon")}>
                            <Link>
                                <i className="fa-brands fa-instagram fa-2xl"></i>
                            </Link>
                        </div>
                        <div className={cx("social-icon")}>
                            <Link>
                                <i className="fa-brands fa-youtube fa-2xl"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx("footer-list")}>
                    <div className={cx("list-header")}>Thông tin</div>
                    <div className={cx("list-body")}>
                        <Link>Tin tức</Link>
                        <Link>Giới thiệu</Link>
                        <Link>Check IMEI</Link>
                        <Link>Phương thức thanh toán</Link>
                        <Link>Bảo hành & sửa chữa</Link>
                        <Link>Đánh giá</Link>
                        <Link>Tuyển dụng</Link>
                    </div>
                </div>

                <div className={cx("footer-list")}>
                    <div className={cx("list-header")}>Thông tin</div>
                    <div className={cx("list-body")}>
                        <Link>Thu cũ đổi mới</Link>
                        <Link>Giao hàng</Link>
                        <Link>Hủy giao hàng</Link>
                        <Link>Bảo hành</Link>
                        <Link>Đổi trả</Link>
                        <Link>Giải quyết khiếu nại</Link>
                        <Link>Bảo mật thông tin</Link>
                        <Link>Trả góp</Link>
                    </div>
                </div>

                <div className={cx("footer-list")}>
                    <div className={cx("list-header")}>Thông tin</div>
                    <div className={cx("list-body")}>
                        <Link>Tài khoản của tôi</Link>
                        <Link>Đơn đặt hàng</Link>
                        <Link>Hệ thống cửa hàng</Link>
                        <Link>
                            Mua hàng: <span>1900.0001</span>
                            <div>Nhánh 1: Khu vực Hà Nội và các tỉnh phía Bắc</div>
                            <div>Nhánh 2: Khu vực Tp Hồ Chí Minh và các tỉnh phía Nam </div>
                            <div>Nhánh 3: Khiếu nại và góp ý</div>
                        </Link>
                        <Link>
                            Doanh nghiệp: <span>0909.009.009</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

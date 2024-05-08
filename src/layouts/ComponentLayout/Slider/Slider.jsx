import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import img from "../../../assets/Image/no-image.png";

const cx = classNames.bind(styles);

const Slider = () => {
    return (
        <div className={cx("wrapper")}>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img} className={cx("img", "d-block w-100")} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img} className={cx("img", "d-block w-100")} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img} className={cx("img", "d-block w-100")} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img} className={cx("img", "d-block w-100")} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img} className={cx("img", "d-block w-100")} alt="..." />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-target="#carouselExampleIndicators"
                    data-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-target="#carouselExampleIndicators"
                    data-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Slider;

import Slider from "../../layouts/ComponentLayout/Slider";
import CardProducts from "./CardProducts";
import styles from "./Home.module.scss";
import bookApi from "../../apis/bookApi";
import Button from "../../components/Button";

import classNames from "classnames/bind";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

const Home = () => {
    const [topBooks, setTopBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTopBook = await bookApi.getTop();
                const resAllBook = await bookApi.getAll();
                // console.log("🚀 ~ fetchData ~ response:", response);
                setTopBooks(resTopBook.data);
                setAllBooks(resAllBook.data);
            } catch (error) {
                console.log("🚀 ~ fetchData ~ error:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <Slider />
            <div className={cx("top-products")}>Tóp sách bán chạy</div>

            <div className={cx("inner")}>
                {topBooks.map((data) => (
                    <CardProducts key={data._id} data={data} />
                ))}
            </div>

            <div className={cx("btn-kinds")}>
                <Button outline>Văn học</Button>
                <Button outline>Kinh tế</Button>
                <Button outline>Văn hoá</Button>
                <Button outline>Truyện</Button>
                <Button outline>Phật giáo</Button>
            </div>

            <div className={cx("inner")}>
                {allBooks.map((data) => (
                    <CardProducts key={data._id} data={data} />
                ))}

                {/* <div className={cx("list-page")}></div> */}
            </div>
        </div>
    );
};

export default Home;

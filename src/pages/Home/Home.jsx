import Slider from "../../layouts/ComponentLayout/Slider";
import CardProducts from "./CardProducts";
import styles from "./Home.module.scss";
import bookApi from "../../apis/bookApi";
import Button from "../../components/Button";

import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Home = () => {
    const [topBooks, setTopBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [booksKind, setBooksKind] = useState([]);

    const listKinds = useSelector((state) => state.kinds.listKinds);

    const handleKindClick = (kind) => {
        const formatKind = kind
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/đ/g, "d");

        const fetchApiGetBooks = async () => {
            try {
                const getBooksByKind = await bookApi.getBooksByKind(formatKind, 1, 8);
                setBooksKind(getBooksByKind.data.filterBooks);
            } catch (error) {
                console.log("🚀 ~ fetchApiGetBooks ~ error:", error);
            }
        };

        fetchApiGetBooks();
    };

    const fetchData = async () => {
        try {
            const resTopBook = await bookApi.getTop();
            const resAllBook = await bookApi.getAll();
            setTopBooks(resTopBook.data);
            setAllBooks(resAllBook.data);
        } catch (error) {
            console.log("🚀 ~ fetchData ~ error:", error);
        }
    };
    useEffect(() => {
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
                {listKinds &&
                    listKinds.map((item, index) => (
                        <Button key={index} outline onClick={(e) => handleKindClick(item.title)}>
                            {item.title}
                        </Button>
                    ))}
            </div>

            <div className={cx("inner")}>
                {booksKind.length > 0
                    ? booksKind.map((data) => <CardProducts key={data._id} data={data} />)
                    : allBooks.map((data) => <CardProducts key={data._id} data={data} />)}
                {/* {allBooks.map((data) => (
                    <CardProducts key={data._id} data={data} />
                ))} */}
            </div>
        </div>
    );
};

export default Home;

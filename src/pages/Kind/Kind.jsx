import classNames from "classnames/bind";

import styles from "./Kind.module.scss";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bookApi from "../../apis/bookApi";
import CardProducts from "../Home/CardProducts";
import config from "../../config";
import { se } from "date-fns/locale/se";

const cx = classNames.bind(styles);

const Kind = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [listData, setListData] = useState([]);
    const [titleKind, setTitleKind] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [kind, setKind] = useState("");
    const [page, setPage] = useState(1);
    console.log("🚀 ~ Kind ~ page:", page);
    const [pageSize, setPageSize] = useState(12);
    console.log("🚀 ~ Kind ~ pageSize:", pageSize);

    useEffect(() => {
        const searchParam = new URLSearchParams(location.search);

        setTitleKind(searchParam.get("title"));
        setPage(parseInt(searchParam.get("page")));
        setPageSize(parseInt(searchParam.get("pageSize")));
    }, [location]);

    useEffect(() => {
        setKind(location.pathname.split("/").pop());
    }, [location.pathname]);

    useEffect(() => {
        const fetchDatasByKind = async () => {
            try {
                console.log("11212", kind, page, pageSize);
                const getDatasByKind = await bookApi.getBooksByKind(kind, page, pageSize);
                setListData(getDatasByKind.data.filterBooks);
                setTotalPages(getDatasByKind.data.totalPages);
            } catch (error) {
                console.log("🚀 ~ fetchDatasByKind ~ error:", error);
            }
        };

        fetchDatasByKind();
    }, [kind, page, pageSize]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <span>Chủ đề: {titleKind}</span>
            </div>

            <div className={cx("products")}>
                {listData.map((item) => (
                    <CardProducts data={item} key={item._id} />
                ))}
            </div>
            <div className={cx("nav-page")}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <NavLink
                        to={`${config.routes.kind.replace(
                            ":kind",
                            location.pathname.split("/").pop(),
                        )}?title=${titleKind}&page=${index + 1}&pageSize=${pageSize}`}
                        key={index}
                        className={cx("btn-nav")}
                    >
                        {index + 1}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Kind;

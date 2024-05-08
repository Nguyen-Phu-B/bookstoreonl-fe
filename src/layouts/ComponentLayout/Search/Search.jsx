import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";

import ProductItem from "../../../components/ProductItem";
import PopperWrapper from "../../../components/Popper";
import styles from "./Search.module.scss";
import bookApi from "../../../apis/bookApi";

import { useDebounce } from "../../../hooks";

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await bookApi.getFindBooks(debounced);
            setSearchResult(result.data);

            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClearBtn = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleChangeSearch = (e) => {
        const valueSearch = e.target.value;

        if (!valueSearch.startsWith(" ")) {
            setSearchValue(valueSearch);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <PopperWrapper>
                        {/* <h4 className={cx("search-result")} tabIndex="-1" {...attrs}></h4> */}
                        {searchResult.map((result) => (
                            <ProductItem key={result._id} data={result} onClick={handleHideResult} />
                        ))}
                    </PopperWrapper>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx("search")}>
                    <input
                        placeholder="Tìm kiếm ..."
                        spellCheck={false}
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChangeSearch}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx("search-clear")} onClick={handleClearBtn}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}

                    {loading && (
                        <div className={cx("search-loading")}>
                            <i className="fa-solid fa-spinner"></i>
                        </div>
                    )}

                    <button className={cx("search-btn")} onMouseDown={(e) => e.preventDefault()}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;

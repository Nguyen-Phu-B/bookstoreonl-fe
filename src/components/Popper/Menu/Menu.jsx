import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { useState, useEffect, forwardRef } from "react";

import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import PopperWrapper from "../PopperWrapper";
import HeaderMenu from "./HeaderMenu";

const cx = classNames.bind(styles);
const defFunc = () => {};

const Menu = forwardRef(
    ({ children, items = [], hideOnClick = false, onClick = defFunc, onChange = defFunc, ...passProps }, ref) => {
        const [history, setHistory] = useState([{ data: items }]);
        const current = history[history.length - 1];

        useEffect(() => {
            setHistory([{ data: items }]);
        }, [items]);

        const renderItems = () => {
            return current.data.map((item, index) => {
                const isParent = !!item.children;
                const isOnClick = !!item.onClick;

                return (
                    <MenuItem
                        key={index}
                        data={item}
                        onClick={() => {
                            if (isParent) {
                                setHistory((prev) => [...prev, item.children]);
                            } else if (isOnClick) {
                                onClick();
                            } else {
                                onChange(item);
                            }
                        }}
                    />
                );
            });
        };

        const handleBack = () => {
            setHistory((prev) => prev.slice(0, prev.length - 1));
        };

        const renderResult = (attrs) => (
            <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx("menu-popper")}>
                    {history.length > 1 && <HeaderMenu title={current.title} onBack={handleBack} />}
                    <div className={cx("menu-body")}>{renderItems()}</div>
                </PopperWrapper>
            </div>
        );

        const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));

        return (
            <Tippy
                {...passProps}
                interactive
                hideOnClick={hideOnClick}
                delay={[0, 300]}
                offset={[10, 10]}
                placement="bottom-end"
                render={renderResult}
                onHide={handleResetMenu}
                reference={ref}
                appendTo={document.body}
            >
                {children}
            </Tippy>
        );
    },
);

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Menu;

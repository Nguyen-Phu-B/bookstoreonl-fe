import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { ref } from "yup";

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            primary = false,
            outline = false,
            text = false,
            disabled = false,
            rounded = false,
            small = false,
            large = false,
            children,
            className,
            leftIcon,
            rightIcon,
            onClick,
            ...passProp
        },
        ref,
    ) => {
        let Comp = "button";

        const _props = { onClick, ...passProp };

        if (disabled) {
            Object.keys(_props).forEach((key) => {
                if (key.startsWith("on") && typeof _props[key] === "function") {
                    delete _props[key];
                }
            });
        }

        if (to) {
            _props.to = to;
            Comp = Link;
        } else if (href) {
            _props.href = href;
            Comp = "a";
        }

        const classes = cx("wrapper", {
            [className]: className,
            primary,
            outline,
            text,
            disabled,
            rounded,
            small,
            large,
        });

        return (
            <Comp ref={ref} className={classes} {..._props}>
                {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
                <span className={cx("title")}>{children}</span>
                {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
            </Comp>
        );
    },
);

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;

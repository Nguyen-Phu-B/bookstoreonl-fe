import PropTypes from "prop-types";
import "./GlobalStyles.scss";
import React from "react";

const GlobalStyles = ({ children }) => {
   return React.Children.only(children);
};

GlobalStyles.propTypes = {
   children: PropTypes.node.isRequired,
};

export default GlobalStyles;

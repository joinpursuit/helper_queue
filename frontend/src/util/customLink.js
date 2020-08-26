import React from "react";
import { NavLink,Link, browserHistory } from "react-router";

export const CustomLink = ({ to, onClick, ...otherProps }) => (
  <Link
    to={to}
    onClick={(e) => {
      e.preventDefault();
      if (window.updateRequired) return (window.location = to);
      return browserHistory.push(to);
    }}
    {...otherProps}
  />
);

export const CustomNavLink = ({ to, onClick, ...otherProps }) => (
  <NavLink
    to={to}
    onClick={(e) => {
      e.preventDefault();
      if (window.updateRequired) return (window.location = to);
      return browserHistory.push(to);
    }}
    {...otherProps}
  />
);


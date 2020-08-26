import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

export const CustomLink = ({ to, onClick, ...otherProps }) => {
  const history = useHistory();
  return (
    <Link
      to={to}
      onClick={(e) => {
        e.preventDefault();
        if (window.updateRequired) return (window.location = to);
        return history.push(to);
      }}
      {...otherProps}
    />
  );
};

export const CustomNavLink = ({ to, onClick, ...otherProps }) => {
  const history = useHistory();
  return (
    <NavLink
      to={to}
      onClick={(e) => {
        e.preventDefault();
        if (window.updateRequired) return (window.location = to);
        return history.push(to);
      }}
      {...otherProps}
    />
  );
};

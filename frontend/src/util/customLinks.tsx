import React from "react";
import {
  NavLink,
  Link,
  useHistory,
  LinkProps,
  NavLinkProps,
} from "react-router-dom";

interface CustomLinkProps extends LinkProps {
  onClick: () => void;
}

interface CustomNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

declare global {
  interface Window {
    updateRequired: boolean;
  }
}

export const CustomLink = ({ to, onClick, ...otherProps }: CustomLinkProps) => {
  const history = useHistory();
  return (
    <Link
      to={to}
      onClick={(e) => {
        e.preventDefault();
        if (window.updateRequired) {
          window.location = to;
          return;
        }
        history.push(to);
        return;
      }}
      {...otherProps}
    />
  );
};

export const CustomNavLink = ({
  to,
  onClick,
  ...otherProps
}: CustomNavLinkProps) => {
  const history = useHistory();
  return (
    <NavLink
      to={to}
      onClick={(e) => {
        e.preventDefault();
        if (window.updateRequired) return (window.location = to);
        history.push(to);
        return;
      }}
      {...otherProps}
    />
  );
};

//inspired by Yan Takushevich stack overflow answer https://stackoverflow.com/questions/34388614/how-to-force-update-single-page-application-spa-pages

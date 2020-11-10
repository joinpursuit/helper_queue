import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const AuthRoute = ({ children, ...rest }: RouteProps) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => {
        return !currentUser ? children : <Redirect to="/" />;
      }}
    />
  );
};

export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser ? children : <Redirect to={"/"} />;
      }}
    />
  );
};

export const AdminRoute = ({ children, ...rest }: RouteProps) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser && currentUser.email === "admin@admin.com" ? (
          children
        ) : (
          <Redirect to={"/"} />
        );
      }}
    />
  );
};
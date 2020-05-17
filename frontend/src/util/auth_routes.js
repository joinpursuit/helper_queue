import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

export const AuthRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !currentUser ? children : <Redirect to="/" />;
      }}
    />
  );
};

export const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return currentUser ? children : <Redirect to={"/login"} />;
      }}
    />
  );
};

export const AdminRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return currentUser && currentUser.email === "admin@admin.com" ? children : <Redirect to={"/login"} />;
      }}
    />
  );
};
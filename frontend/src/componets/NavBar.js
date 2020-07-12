import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";
import { AuthContext } from "../providers/AuthProvider";
import { logout } from "../util/firebaseFunctions";
import { useLocation } from "react-router-dom";
import RequestHelp from "./RequestHelp";
import NavLogin from "./auth/NavLogin";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const regularUserView = () => {
    if (location.pathname === "/") {
      return (
        <nav className={"homeNav"}>
          <NavLink to={"/jobtracker"}>Job Tracker</NavLink>
          <div>
            <RequestHelp />
            <button className="logoutButton" onClick={logout}>
              Log Out
            </button>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="jobTrackerNav">
          <NavLink to={"/"}>Home</NavLink>
          <RequestHelp />
          <button className="logoutButton" onClick={logout}>
            Log Out
          </button>
        </nav>
      );
    }
  };

  const adminView = () => {
    return (
      <nav>
        <div className="navAdmin">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/admin">Student Queue</NavLink>
          <button className="logoutButton" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>
    );
  };

  const display = () => {
    if (currentUser) {
      if (currentUser.email !== "admin@admin.com") {
        return regularUserView();
      } else {
        return adminView();
      }
    } else if (location.pathname === "/") {
      return (
        <nav>
          <NavLogin />{" "}
        </nav>
      );
    } else if (location.pathname === "/login") {
      return (
        <nav>
          <NavLink className="signUpAndLogin" to={"/signup"}>
            Sign Up
          </NavLink>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to={"/login"} className="signUpAndLogin">
            Login
          </NavLink>
        </nav>
      );
    }
  };
  return <>{display()}</>;
}

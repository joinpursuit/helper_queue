import React, { useContext } from "react";
import {
  CustomNavLink as NavLink,
  CustomLink as Link,
} from "../../util/customLinks";
import "./NavBar.css";
import { AuthContext } from "../../providers/AuthProvider";
import { logout } from "../../util/firebaseFunctions";
import { useLocation } from "react-router-dom";
import RequestHelp from "../requests/RequestHelp";
import NavLogin from "../auth/NavLogin";
import { useDispatch, useSelector } from "react-redux";
import { setJobFormShow } from "../modal/modalSlice";
import { selectJobCount } from "../jobs/jobsSlice";
import { logoutUser as userLogOut } from "../auth/authSlice";
import Search from "../search/Search";
import { SocketContext } from "../../providers/SocketProvider";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const jobCount = useSelector(selectJobCount);

  const logoutUser = () => {
    dispatch(userLogOut);
    logout();
  };

  const majorUpdate = () => {
    socket.emit("majorUpdate");
  };

  const minorUpdate = () => {
    socket.emit("minorUpdate");
  };

  const regularUserView = () => {
    if (location.pathname === "/") {
      return (
        <nav className={"homeNav"}>
          <NavLink to={"/jobtracker"}>Job Tracker</NavLink>
          {/* <NavLink to={"/stats/jobtracker"}>Job Stats</NavLink> */}
          <div className="rightSide">
            <div>
              <RequestHelp />
            </div>
            <button className="logoutButton" onClick={logoutUser}>
              Log Out
            </button>
          </div>
        </nav>
      );
    } else if (location.pathname === "/gong") {
      return (
        <nav className={"homeNav"}>
          <NavLink to={"/jobtracker"}>Job Tracker</NavLink>

          <NavLink exact to={"/"}>
            Home
          </NavLink>

          <button className="logoutButton" onClick={logoutUser}>
            Log Out
          </button>
        </nav>
      );
    } else if (location.pathname === "/stats/jobtracker") {
      return (
        <nav className="jobTrackerNav">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/jobtracker"}>Job Tracker</NavLink>

          <div className="navRequestAndLogOut">
            <button className="logoutButton" onClick={logoutUser}>
              Log Out
            </button>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="jobTrackerNav">
          <NavLink to={"/"}>Home</NavLink>
          <div className="jobSearchAddContainer">
            <button
              className={"addJob"}
              onClick={() => dispatch(setJobFormShow(true))}
            >
              + Add Job
            </button>
            <Search />
            <div className="jobCount">
              <p>You've applied to {jobCount} jobs!</p>
              <Link id="statsPageLink" to={"/stats/jobtracker"}>
                See All Stats
              </Link>
            </div>
          </div>
          <div className="navRequestAndLogOut">
            <button className="logoutButton" onClick={logoutUser}>
              Log Out
            </button>
          </div>
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
          <NavLink to="/pairs">Pairs</NavLink>
          <div>
            <button className="logoutButton" onClick={majorUpdate}>
              Major Update
            </button>
            <button className="logoutButton" onClick={minorUpdate}>
              Minor Update
            </button>
          </div>
          <button className="logoutButton" onClick={logoutUser}>
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

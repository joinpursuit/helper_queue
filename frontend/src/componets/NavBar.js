import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
import { CustomNavLink } from '../util/customLinks';
import "../css/NavBar.css";
import { AuthContext } from "../providers/AuthProvider";
import { logout } from "../util/firebaseFunctions";
import { useLocation } from "react-router-dom";
import RequestHelp from "./RequestHelp";
import NavLogin from "./auth/NavLogin";
import { useDispatch, useSelector } from "react-redux";
import { setJobFormShow } from "../features/modal/modalSlice";
import { selectJobCount, receiveJobs } from "../features/jobs/jobsSlice";
import Search from "../features/search/Search";
import { SocketContext } from "../providers/SocketProvider";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const jobCount = useSelector(selectJobCount);

  const logoutUser = () => {
    dispatch(receiveJobs([]));
    logout();
  };

  const majorUpdate = () => {
    socket.emit("majorUpdate");
  }

  const minorUpdate = () => {
    socket.emit("minorUpdate");
  }

  const regularUserView = () => {
    if (location.pathname === "/") {
      return (
        <nav className={"homeNav"}>
          <CustomNavLink to={"/jobtracker"}>Job Tracker</CustomNavLink>
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
    } else {
      return (
        <nav className="jobTrackerNav">
          <CustomNavLink to={"/"}>Home</CustomNavLink>
          <div className="jobSearchAddContainer">
            <button
              className={"addJob"}
              onClick={() => dispatch(setJobFormShow(true))}
            >
              + Add Job
            </button>
            <Search />
            <div className="jobCount">You've applied to {jobCount} jobs!</div>
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
          <CustomNavLink exact to="/">
            Home
          </CustomNavLink>
          <CustomNavLink to="/admin">Student Queue</CustomNavLink>
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
          <CustomNavLink className="signUpAndLogin" to={"/signup"}>
            Sign Up
          </CustomNavLink>
        </nav>
      );
    } else {
      return (
        <nav>
          <CustomNavLink to={"/login"} className="signUpAndLogin">
            Login
          </CustomNavLink>
        </nav>
      );
    }
  };
  return <>{display()}</>;
}

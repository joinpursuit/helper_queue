import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
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

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const jobCount = useSelector(selectJobCount);

  const logoutUser = () => {
    dispatch(receiveJobs([]));
    logout();
  };

  const regularUserView = () => {
    if (location.pathname === "/") {
      return (
        <nav className={"homeNav"}>
          <NavLink to={"/jobtracker"}>Job Tracker</NavLink>
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
          <NavLink to={"/"}>Home</NavLink>
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
            {/* <RequestHelp /> */}
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

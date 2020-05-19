import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import "../css/NavBar.css";
import { AuthContext } from '../providers/AuthProvider';
import { logout } from '../util/firebaseFunctions';
import { useLocation } from 'react-router-dom'
import RequestHelp from './RequestHelp';
import NavLogin from './auth/NavLogin';

export default function NavBar() {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const display = () => {
        if(currentUser) {
            if(currentUser.email !== "admin@admin.com") {
                return (
                <>
                <RequestHelp />
                <button className="logoutButton" onClick={logout}>Log Out</button>
                </>
                )
            } else {
               return(
                   <>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/admin">Student Queue</NavLink>
                    <button className="logoutButton" onClick={logout}>Log Out</button> 
                   </>
               )
            }
        } else if(location.pathname === "/") {
            return <NavLogin />
         } else if(location.pathname === "/login") {
            return  <NavLink className="signUpAndLogin" to={"/signup"}>Sign Up</NavLink>
        } else {
           return <NavLink to={"/login"} className="signUpAndLogin" >Login</NavLink>
        }
    }
    return(
        <nav>
            {display()}         
        </nav>
    )
};
import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import "../css/NavBar.css";
import { AuthContext } from '../providers/AuthProvider';
import { logout } from '../util/firebaseFunctions';
import { useLocation } from 'react-router-dom'

export default function NavBar() {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const display = () => {
        if(currentUser) {
            return <button className="logoutButton" onClick={logout}>Log Out</button>;
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
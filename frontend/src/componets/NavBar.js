import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import "../css/NavBar.css";
import { AuthContext } from '../providers/AuthProvider';
import { logout } from '../util/firebaseFunctions';

export default function NavBar(params) {
    const { currentUser } = useContext(AuthContext);
    const display = () => {
        if(currentUser) {
            return <button className="logoutButton" onClick={logout}>Log Out</button>;
        } else {
            return (
              <>
                <NavLink to={"/signup"}>Sign Up</NavLink>
                <NavLink to={"/login"}>Log In</NavLink>
              </>
            );
        }
    }
    return(
        <nav>
            {display()}
            
        </nav>
    )
};
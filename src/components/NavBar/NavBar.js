import React, { useContext } from "react";
import "./NavBar.css"
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

const NavBar = () =>{
    
    const { user, updateUser } = useContext(UserContext)
    
    const handleSignout = () =>{
        localStorage.removeItem(`_token`)
        updateUser();
    }

    return(
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Jobly</Link>
            </div>
            <ul className="nav-NavLinks">
                {user ? 
                    <>
                        <li>
                        </li>
                        <li>
                            <NavLink to="/companies" >
                                Companies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/jobs" >
                                Jobs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" >
                                {user}
                            </NavLink>
                        </li>
                        <li>
                            <div className="signout" onClick={handleSignout}>
                                Signout
                            </div>
                        </li>
                    </>
                    :   //if !user
                    <>
                        <li>
                            <NavLink to="/login" >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" >
                                Signup
                            </NavLink>
                        </li>
                    </>
                 }


            </ul>
        </nav>
    )
}

export default NavBar;
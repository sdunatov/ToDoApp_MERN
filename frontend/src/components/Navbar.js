import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "./LogOutBtn";



function Navbar() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <div className="authContainer">
            {loggedIn === true && (<>
                <Link to="/"></Link>
                <LogoutBtn />
            </>)}


            {loggedIn === false && (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div >
    );
}


export default Navbar;
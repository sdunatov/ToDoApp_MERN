import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "./LogOutBtn";



function Navbar() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <div >
            {loggedIn === true && (
                <>
                    <div className="logOutContainer">
                        <Link to="/"></Link>
                        <LogoutBtn />
                    </div>
                </>)}


            {loggedIn === false && (
                <>
                    <div className="authContainer">
                        <Link to="/register">Registirajte se</Link>
                        <br></br>

                        <Link to="/login">Prijavite se</Link>
                    </div>
                </>
            )}
        </div >
    );
}


export default Navbar;
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function LogoutBtn() {
    const { getloggedIn } = useContext(AuthContext);
    async function logout() {

        await axios.get("http://localhost:3001/api/auth/logout");
        getloggedIn();
    }
    return <button onClick={logout}>Log out</button>

}

export default LogoutBtn;
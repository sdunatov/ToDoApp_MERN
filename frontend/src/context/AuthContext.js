import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getloggedIn() {
        const loggedInRes = await axios.get("http://localhost:3001/api/auth/loggedIn");
        setLoggedIn(loggedInRes.data);
    }
    useEffect(() => {
        getloggedIn();
    }, [])
    return <AuthContext.Provider value={{ loggedIn, getloggedIn }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export { AuthContextProvider };
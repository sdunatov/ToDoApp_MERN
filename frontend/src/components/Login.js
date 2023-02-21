import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getloggedIn } = useContext(AuthContext);
    const history = useHistory();


    async function login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password
            };

            await axios.post("http://localhost:3001/api/auth/login", loginData);
            await getloggedIn();
            history.push("/");

        } catch (err) {
            console.error(err);

        }
    }

    return <div>
        <form className="loginForm" onSubmit={login}>
            <input className="inputForm" type="email" placeholder="Unesite Vašu e-mail adresu"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <input className="inputForm" type="password" placeholder="Unesite Vašu lozinku"
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
            <button className="btnForm" type="submit">Prijavi se</button>

        </form>
    </div>
}

export default Login;
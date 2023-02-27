import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getloggedIn } = useContext(AuthContext);
    const history = useHistory();

    async function register(e) {
        e.preventDefault();
        try {
            const registerData = {
                email,
                password,
                passwordVerify
            };

            await axios.post("http://localhost:3001/api/auth", registerData);
            await getloggedIn();
            history.push("/");

        } catch (err) {
            console.error(err);

        }
    }

    return <div>
        <form className="registerForm" onSubmit={register}>
            <input className="inputForm" type="email" placeholder="Unestite Vašu e-mail adresu"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <input className="inputForm" type="password" placeholder="Unesite Vašu lozinku"
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
            <input className="inputForm" type="password" placeholder="Ponovite unos lozinke"
                onChange={(e) => setPasswordVerify(e.target.value)}
                value={passwordVerify} />
            <button className="btnForm" type="submit">Registriraj se</button>

        </form>
    </div>
}

export default Register;
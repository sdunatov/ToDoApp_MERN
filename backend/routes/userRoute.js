const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { route } = require("./todoRoute");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        if (!email || !password || !passwordVerify)
            return res
                .status(400)
                .json({ errorMessage: "Unesite sva polja." })
        if (password.length < 6)
            return res
                .status(400)
                .json({ errorMessage: "Unesite lozniku duzine barem 6 znakova." })
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ errorMessage: "Unesite istu lozinku dva put." })
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ errorMessage: "Vec postoji korisnik s tom email adresom." })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email, passwordHash
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({
            user: savedUser._id
        },
            process.env.JWTSECRET
        )

        res.cookie("token", token, {
            httpOnly: true
        }).send()

    } catch (err) {
        console.log(err);
        res.status(500).send();

    }

});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ errorMessage: "Unesite sva polja." })
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res
                .status(401)
                .json({ errorMessage: "Krivi email ili lozinka." })
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res
                .status(401)
                .json({ errorMessage: "Krivi email ili lozinka." })

        const token = jwt.sign({
            user: existingUser._id
        },
            process.env.JWTSECRET
        )

        res.cookie("token", token, {
            httpOnly: true
        }).send()

    } catch (error) {
        console.log(err);
        res.status(500).send();
    }
})

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
})

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWTSECRET);
        res.send(true);

    } catch (err) {
        console.error(err);
        res.json(false);
    }
})

module.exports = router;
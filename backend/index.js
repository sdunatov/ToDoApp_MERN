const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoute");
const authRoutes = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server")
})

const PORT = process.env.PORT || 3001

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
        });
        console.log("Spojeni smo na bazu");
    })
    .catch(error => {
        console.log("Greška pri spajanju", error.message);
    });


const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const ToDo = require("./models/todoModel");
const todoRoutes = require("./routes/todoRoute")

const app = express();

app.use(express.json());
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Server")
})

const PORT = process.env.PORT || 3001


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Poslužitelj je na portu ${PORT}`);
        });
    }catch(error){
        console.log(error)
    }
};

startServer();


 
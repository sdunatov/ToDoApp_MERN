const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoute")
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/todos", todoRoutes);


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



 
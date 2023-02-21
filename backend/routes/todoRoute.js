const express = require("express");
const { createToDo, getToDos, getToDo, deleteToDo, updateToDo } = require("../controllers/todoController");
const ToDo = require("../models/todoModel");
const router = express.Router()
//const auth = require("./middleware/auth")

router.post("/", createToDo);
router.get("/", getToDos);
router.get("/:id", getToDo);
router.delete("/:id", deleteToDo);
router.put("/:id", updateToDo);

module.exports = router;
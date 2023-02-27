const express = require("express");
const { createToDo, getToDos, getToDo, deleteToDo, updateToDo } = require("../controllers/todoController");
const ToDo = require("../models/todoModel");
const router = express.Router()
const auth = require("../middleware/auth")

router.post("/", auth, createToDo);
router.get("/", auth, getToDos);
router.get("/:id", auth, getToDo);
router.delete("/:id", auth, deleteToDo);
router.put("/:id", auth, updateToDo);

module.exports = router;
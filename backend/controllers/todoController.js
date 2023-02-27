const ToDo = require("../models/todoModel");

const createToDo = async (req, res) => {
    try {
        const todo = await ToDo.create(req.body)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

const getToDos = async (req, res) => {
    try {
        const todos = await ToDo.find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({msg: error.message})   
    }  
};

const getToDo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await ToDo.findById(id);
        if (!todo) {
            return res.status(404).json(`Nema zadatka čiji je id: ${id}`);  
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

const deleteToDo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await ToDo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json(`Nema zadatka čiji je id: ${id}`);  
        } 
        res.status(200).send("Zadatak je obrisan.")
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateToDo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await ToDo.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true});
        if (!todo) {
            return res.status(404).json(`Nema zadatka čiji je id: ${id}`);  
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    createToDo,
    getToDos,
    getToDo,
    deleteToDo,
    updateToDo
};
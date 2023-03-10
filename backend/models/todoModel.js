const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Unesite zadatak"]
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        },
        category: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: false
        }

    },
    {
        timestamps: true
    }
)

const ToDo = mongoose.model("ToDo", todoSchema)

module.exports = ToDo;
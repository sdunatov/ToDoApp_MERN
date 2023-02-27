const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        },
        passwordHash: {
            type: String,
            require: true
        }

    }
)

const User = mongoose.model("User", userSchema)

module.exports = User;
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required: true
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)
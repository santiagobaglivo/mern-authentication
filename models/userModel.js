const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true,

    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
    },
    role: {
        type: String,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dl43kwe5u/image/upload/v1675264076/avatar_cugq40_xacpjv.png",  
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)
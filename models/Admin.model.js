
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    image: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
        minlength: 6
    },
    role: {
        type: String,
        default: "admin",
    },
    created_ts: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("admin", adminSchema)

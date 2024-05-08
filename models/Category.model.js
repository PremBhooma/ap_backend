const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    // image: {
    //     type: String,
    //     default: null,
    // },
    name: {
        type: String,
        default: null,
    },
    created_ts: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Category", categorySchema)

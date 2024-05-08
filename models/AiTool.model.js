const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag: [String]
},);

const aiToolSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    image: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    shortDescription: {
        type: String,
        default: null,
    },
    SubscriptionTier: {
        type: String,
        enum: ["freemium", "trial"],
    },
    price: {
        type: Number,
        default: null,
    },
    tags: {
        type: [tagSchema], default: []
    },
    created_ts: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("AiTool", aiToolSchema);
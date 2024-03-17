const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    important: {
        type: Boolean,
        reuire: false,
        default: true,
    },
    upcoming: {
        type: Boolean,
        reuire: false,
        default: true,
    },
    past: {
        type: Boolean,
        reuire: false,
        default: true,
    },
    done: {
        type: Boolean,
        required: false,
        default: true,
    },
},{collection: "Categories"});

module.exports = mongoose.model("Categories",categorySchema);
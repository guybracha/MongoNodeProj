const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    status : String,
    dueDate : String
},{collection: "Tasks"});

module.exports = mongoose.model("Tasks",taskSchema);
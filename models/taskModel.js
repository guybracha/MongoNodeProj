const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        default: 'Todo'
    },
    dueDate: Date
}, { collection: "Tasks" });

module.exports = mongoose.model("Task", taskSchema);

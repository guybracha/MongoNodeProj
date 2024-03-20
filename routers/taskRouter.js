const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel.js');

router.use(express.json());

// Get tasks by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await taskModel.find({ userId: userId });
        res.send(tasks);
        console.log("Tasks route for user: " + userId);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get tasks by category
router.get("/category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const tasks = await taskModel.find({ category: category });
        res.send(tasks);
        console.log("Tasks route for category: " + category);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Create a new task
router.post("/", async (req, res) => {
    try {
        const newTask = req.body;
        const createdTask = await taskModel.create(newTask);
        res.send(createdTask);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update a task
router.put("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const update = req.body;
        const updatedTask = await taskModel.findOneAndUpdate({ _id: taskId }, update, { new: true });
        res.send(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const result = await taskModel.deleteOne({ _id: taskId });
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

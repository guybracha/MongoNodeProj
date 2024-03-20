const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel.js');

router.use(express.json());

router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await taskModel.find({ userId: userId });
        res.send(tasks);
        console.log("tasks route for user: " + userId);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const newTask = { userId: req.body.userId, ...req.body };
        const createdTask = await taskModel.create(newTask);
        res.send(createdTask);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

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

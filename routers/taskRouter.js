const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel.js');

router.use(express.json());

router.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    taskModel.find({ userId: userId }).then(
        function (docs) {
            res.send(docs);
            console.log("tasks route for user: " + userId);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    );
});

router.post("/", (req, res) => {
    const newTask = { userId: req.body.userId, ...req.body };
    console.log(newTask.name);
    taskModel.create(newTask).then(
        function (docs) {
            res.send(docs);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    );
});

router.put("/:id", function (req, res) {
    const taskId = req.params.id;
    const update = req.body;
    console.log(taskId, update);
    taskModel.findOneAndUpdate({ _id: taskId }, update, { new: true }).then(
        function (docs) {
            res.send(docs);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    );
});

router.delete("/:id", function (req, res) {
    const taskId = req.params.id;

    taskModel.deleteOne({ _id: taskId }).then(
        function (docs) {
            res.send(docs);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    );
});

module.exports = router;

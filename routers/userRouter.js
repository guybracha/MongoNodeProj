const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

// Middleware to check if the request has a valid JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // replace 'your_secret_key' with your actual secret key
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Apply the middleware to the entire userRouter
router.use(authenticateJWT);

// Your existing routes with authentication middleware applied
router.get("/", (req, res) => {
    userModel.find().then(
        function (docs) {
            res.send(docs);
            console.log("user route");
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    );
});

router.post("/", function (req, res) {
    const newUser = req.body;

    // Check if newUser is undefined or does not have userName property
    if (!newUser || !newUser.userName) {
        return res.status(400).json({ error: "Invalid request body. 'userName' is required." });
    }

    console.log(newUser.userName);

    userModel.create(newUser).then(
        function (docs) {
            res.status(201).json(docs); // 201 indicates resource creation
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    );
});

router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const update = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(userId, update, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        const result = await userModel.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json({ message: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

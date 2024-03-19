// userRouter.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

router.use(express.json());

// Middleware to check if the request has a valid JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Login route
router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await userModel.findOne({ userName });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, userName: user.userName }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Apply the authentication middleware to the entire userRouter
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

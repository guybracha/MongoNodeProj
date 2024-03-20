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

// Route for user registration (without authentication)
router.post("/register", async (req, res) => {
    try {
        const { userName, password, email } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new userModel({ userName, password, email });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to retrieve all users
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

// Route for user login
router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Find the user by username
        const user = await userModel.findOne({ userName });

        // If the user is not found or password doesn't match, return an error
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a new JWT token
        const newToken = jwt.sign({ userId: user._id, userName: user.userName }, 'your_secret_key', { expiresIn: '1h' });

        // Respond with "Login successful" and the new token
        res.json({ message: 'Login successful', token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a user's information
router.put("/:id", async (req, res) => {
    // Existing update route remains unchanged
});

// Route to delete a user
router.delete("/:id", async (req, res) => {
    // Existing delete route remains unchanged
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

router.use(express.json());

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

module.exports = router;

const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categoryModel.js');

// Create a new category
router.post("/", async (req, res) => {
    try {
        const newCategory = req.body;
        const createdCategory = await categoryModel.create(newCategory);
        res.status(201).json(createdCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve all categories
router.get("/", async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve category by ID
router.get("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update category by ID
router.put("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const update = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, update, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete category by ID
router.delete("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await categoryModel.deleteOne({ _id: categoryId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

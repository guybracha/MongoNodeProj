const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categoryModel.js');

router.use(express.json());

// Create a new category
router.post("/", async (req, res) => {
    try {
        const { name } = req.body; // Destructure the name field from req.body
        if (!name) {
            return res.status(400).json({ error: 'Name is required' }); // Check if name is provided
        }

        const existingCategory = await categoryModel.findOne({ name }); // Check if category with the same name already exists
        if (existingCategory) {
            return res.status(400).json({ error: 'Category with this name already exists' });
        }

        const createdCategory = await categoryModel.create({ name }); // Create the new category
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

const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
});

// GET task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.getById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task', error: error.message });
    }
});

// CREATE task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newTask = await Task.create({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
});

// UPDATE task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.update(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

// DELETE task
router.delete('/:id', async (req, res) => {
    try {
        const success = await Task.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById } = require('../data/taskData');

router.get('/', (req, res) => {
    res.json({
        message: 'Task API is working'
    })
})

router.post('/', (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    if (description && typeof description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string' });
    }

    const newTask = createTask(title.trim(), description?.trim());

    res.status(201).json({
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    console.error('Error in POST /tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.get('/:id', (req, res) => {
    const id = parseint(req.params.id, 10);
    const task = getTaskById(id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
});



module.exports = router;
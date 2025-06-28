const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById } = require('../data/taskData');


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 */

//post request to create a new task
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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */


//get all task
router.get('/', (req, res) => {
    try {
        const tasks = getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error in GET /tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */


//get task by id
router.get('/:id', (req, res) => {
    const id = parseint(req.params.id, 10);
    const task = getTaskById(id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
});
module.exports = router;
const express = require("express");

const authMiddleware = require("../middlewares/auth");

const tasksController = require("../controllers/taskController");

const router = express.Router();

router.get('/', authMiddleware, tasksController.getTasks);
router.get('/:id', authMiddleware, tasksController.getOneTask);
router.post('/', authMiddleware,  tasksController.addTask);
router.put('/:id', authMiddleware, tasksController.updateTask);
router.delete('/:id', authMiddleware, tasksController.removeTask);

module.exports = router;
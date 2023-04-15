const express = require('express');
const router = express.Router();
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../Controllers/goalController');
const {protect} = require('../Middleware/authMiddleware')
// Routes goes to GoalController.js
// @route Get /api/goals
router.get('/', protect, getGoals)

// @route Post /api/goals
router.post('/', protect, setGoal)

// @route Update /api/goals/:id
router.put('/:id', protect, updateGoal)

// @route Delete /api/goals/:id
router.delete('/:id', protect, deleteGoal)

module.exports = router;

// One Way of Making The Code Shorter.
// router.route('/').get(getGoals).post(setGoal);
// router.route('/:id').put(updateGoal).delete(deleteGoal)


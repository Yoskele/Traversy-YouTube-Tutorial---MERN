const express = require('express');
router = express.Router();
const { registerUser, loginUser, getMe } = require('../Controllers/userControllers');
const {protect} = require('../Middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;


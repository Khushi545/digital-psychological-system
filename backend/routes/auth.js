const express = require('express');
const { register, login, anonymous, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/anonymous', anonymous);
router.get('/me', protect, getMe);

module.exports = router;

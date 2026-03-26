const express = require('express');
const { chatRespond } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/respond', protect, chatRespond);

module.exports = router;

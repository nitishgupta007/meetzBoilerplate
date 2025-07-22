const router = require('express').Router();
const { getMessages } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.get('/:userId', auth, getMessages);

module.exports = router;

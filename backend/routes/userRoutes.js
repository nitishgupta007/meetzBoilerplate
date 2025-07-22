const router = require('express').Router();
const { getAllUsers, searchUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/search', auth, searchUsers);
router.get('/', auth, getAllUsers);

module.exports = router;
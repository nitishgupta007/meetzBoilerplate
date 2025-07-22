const router = require('express').Router();
const { getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAllUsers);

module.exports = router;
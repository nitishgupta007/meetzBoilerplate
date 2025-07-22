const router = require('express').Router();
const { sendRequest, acceptRequest, getFriends } = require('../controllers/friendController');
const auth = require('../middleware/authMiddleware');

router.post('/send', auth, sendRequest);
router.post('/accept', auth, acceptRequest);
router.get('/list', auth, getFriends);

module.exports = router;
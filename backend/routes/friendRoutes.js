const router = require('express').Router();
const { sendRequest, acceptRequest, getFriends, getFriendRequests } = require('../controllers/friendController');
const auth = require('../middleware/authMiddleware');

router.post('/send', auth, sendRequest);
router.post('/accept', auth, acceptRequest);
router.get('/list', auth, getFriends);
router.get('/requests', auth, getFriendRequests);

module.exports = router;
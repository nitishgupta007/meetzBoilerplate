const { FriendRequest, User } = require('../models/postgres');
const { Op } = require('sequelize');

exports.sendRequest = async (req, res) => {
  const { receiverId } = req.body;
  await FriendRequest.create({ senderId: req.userId, receiverId });
  res.json({ message: 'Request sent' });
};

exports.acceptRequest = async (req, res) => {
  const request = await FriendRequest.findOne({
    where: { senderId: req.body.senderId, receiverId: req.userId },
  });
  if (!request) return res.status(404).json({ message: 'Request not found' });

  request.status = 'accepted';
  await request.save();
  res.json({ message: 'Friend request accepted' });
};

exports.getFriends = async (req, res) => {
  const friends = await FriendRequest.findAll({
    where: {
      [Op.or]: [
        { senderId: req.userId },
        { receiverId: req.userId },
      ],
      status: 'accepted',
    },
    include: [
      { model: User, as: 'sender', attributes: ['id', 'username'] },
      { model: User, as: 'receiver', attributes: ['id', 'username'] },
    ],
  });

  const result = friends.map(fr => {
    return fr.senderId === req.userId ? fr.receiver : fr.sender;
  });

  res.json(result);
};

exports.getFriendRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.findAll({
      where: {
        [Op.or]: [
          { senderId: req.userId },
          { receiverId: req.userId },
        ],
        status: 'pending',
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username'] },
        { model: User, as: 'receiver', attributes: ['id', 'username'] },
      ],
    });

    res.json(requests);
  } catch (err) {
    console.error('Error fetching friend requests:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

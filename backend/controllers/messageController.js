const Message = require('../models/mongo/messageModel');

exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { senderId: req.userId, receiverId: req.params.userId },
      { senderId: req.params.userId, receiverId: req.userId },
    ],
  }).sort('timestamp');

  res.json(messages);
};

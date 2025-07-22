const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgres');

const FriendRequest = sequelize.define('FriendRequest', {
  senderId: DataTypes.INTEGER,
  receiverId: DataTypes.INTEGER,
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

module.exports = FriendRequest;
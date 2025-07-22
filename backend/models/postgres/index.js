const sequelize = require('../../config/postgres');
const User = require('./userModel');
const FriendRequest = require('./friendRequestModel');

User.hasMany(FriendRequest, { foreignKey: 'senderId', as: 'sentRequests' });
User.hasMany(FriendRequest, { foreignKey: 'receiverId', as: 'receivedRequests' });
FriendRequest.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
FriendRequest.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = { sequelize, User, FriendRequest };
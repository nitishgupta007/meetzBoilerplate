const { User } = require('../models/postgres');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ where: { id: { [require('sequelize').Op.ne]: req.userId } } });
  res.json(users);
};

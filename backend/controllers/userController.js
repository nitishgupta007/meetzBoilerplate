const { User } = require('../models/postgres');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ where: { id: { [require('sequelize').Op.ne]: req.userId } } });
  res.json(users);
};

exports.searchUsers = async (req, res) => {
  const { q } = req.query;

  if (!q) return res.status(400).json({ message: 'Search query is required' });

  try {
    const users = await User.findAll({
      where: {
        username: { [Op.iLike]: `%${q}%` }, // case-insensitive
        id: { [Op.ne]: req.userId }, // exclude self
      },
      attributes: ['id', 'username'],
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const { User } = require('../models/postgres');
const bcrypt = require('bcryptjs');
const generateToken = require('../config/jwt');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, 'cdcsds');
  const existing = await User.findOne({ where: { username } });
  if (existing) return res.status(400).json({ message: 'Username already taken' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });
  res.json({ token: generateToken(user.id), user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user.id), user });
};
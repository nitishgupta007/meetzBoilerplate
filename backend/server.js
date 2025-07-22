require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectMongo = require('./config/mongo');
const { sequelize } = require('./models/postgres');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const Message = require('./models/mongo/messageModel');

const app = express();
// ✅ Allow CORS from any origin (you can restrict if needed)
app.use(cors({
  origin: '*', // or use process.env.CLIENT_URL for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('send_message', async ({ senderId, receiverId, content }) => {
    const message = await Message.create({ senderId, receiverId, content });
    io.emit(`message_${receiverId}`, message);
  });
});

(async () => {
  try {
    await connectMongo();
    await sequelize.sync();
    server.listen(process.env.PORT || 5000, () => console.log('Server started'));
  } catch (err) {
    console.error(err);
  }
})();

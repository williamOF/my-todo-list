require('dotenv').config();
const {Server} = require('socket.io');
const io = new Server(process.env.SOCKET_PORT);

module.exports = io;
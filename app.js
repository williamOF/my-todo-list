require('dotenv').config();

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const cors = require('cors');
app.use(cors());
app.use(express.json());

const TarefasRouter = require('./routes/TarefasRouter');
app.use('/tarefas', TarefasRouter);

app.listen(process.env.PORT, ()=>{console.log(`Servidor rodando na porta ${process.env.PORT}`)});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("conectou","123456");
});
  
io.listen(3030,() => {
    console.log('listening on *:3030');
});

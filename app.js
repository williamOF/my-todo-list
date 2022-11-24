require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const TarefasRouter = require('./routes/TarefasRouter');
const AuthRouter = require('./routes/AuthRouter');

app.use('/api/tarefas', TarefasRouter);
app.use('/api/auth', AuthRouter);

app.listen(process.env.PORT, ()=>{console.log(`Servidor rodando na porta ${process.env.PORT}`)});
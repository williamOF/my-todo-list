require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const TarefasRouter = require('./routes/TarefasRouter');
app.use('/tarefas', TarefasRouter);

app.listen(process.env.PORT, ()=>{console.log(`Servidor rodando na porta ${process.env.PORT}`)});

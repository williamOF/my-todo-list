require('dotenv').config();
const express = require('express');
const TarefasRouter = require('./routes/TarefasRouter');
const app = express();
app.use(TarefasRouter);
app.listen(process.env.PORT, ()=>{console.log(`Servidor rodando na porta ${process.env.PORT}`)});

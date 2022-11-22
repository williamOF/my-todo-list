const express = require('express');
const TarefasController = require('../controllers/TarefasController');
const TarefasRouter = express.Router();

TarefasRouter.get('/', TarefasController.index);
TarefasRouter.post('/', TarefasController.store);
TarefasRouter.delete('/:id', TarefasController.delete);
TarefasRouter.put('/:id', TarefasController.update);
TarefasRouter.patch('/:id/feita', TarefasController.updateFeita);
TarefasRouter.patch('/:id/desfeita', TarefasController.updateDesfeita);

module.exports = TarefasRouter;
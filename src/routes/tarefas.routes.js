const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

const {
    getTarefas,
    createTarefas,
    updateTarefas,
    deleteTarefas,
    getTarefa
} = require('../controllers/tarefas.controller');



router.post('/tarefas', auth.controlaAcessoAdmin, createTarefas); //admins add tarefas
router.put('/tarefas/:id', auth.controlaAcessoAdmin, updateTarefas); //admins atualizam tarefas
router.delete('/tarefas/:id', auth.controlaAcessoAdmin, deleteTarefas); //admins deletam tarefas
//todos podem ver as tarefas
router.get('/tarefas', getTarefas); 
router.get('/tarefas/:id', getTarefa);



module.exports = router;
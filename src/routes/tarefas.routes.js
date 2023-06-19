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



router.post('/tarefas', auth.controlaAcessoAdmin, createTarefas);

router.put('/tarefas/:id', auth.controlaAcessoAdmin, updateTarefas);
router.delete('/tarefas/:id', auth.controlaAcessoAdmin, deleteTarefas);
router.get('/tarefas', auth.controlaAcesso, getTarefas);
router.get('/tarefas/:id', auth.controlaAcesso, getTarefa);



module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getTarefas,
    createTarefas,
    updateTarefas,
    deleteTarefas,
    getTarefa
} = require('../controllers/tarefas.controller');

router.post('/tarefas', createTarefas);
router.put('/tarefas/:id', updateTarefas);
router.delete('/tarefas/:id', deleteTarefas);
router.get('/tarefas', getTarefas);
router.get('/tarefas/:id', getTarefa);



module.exports = router;
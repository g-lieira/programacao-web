const express = require('express');
const router = express.Router();

//importa os controllers
const {
    addProject, 
    addTasks, 
    addUsers, 
    addAdmin
} = require('../controllers/install.controller');

router.get("/install", addUsers, addAdmin, addProject, addTasks ) //instalação do banco e inserção de dados

module.exports = router;
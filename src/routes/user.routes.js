const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

const {
    createUsers,
    deleteUsers,
    loginUsers,
    updateUsers,
    getUsers,
    updateMyUser
} = require('../controllers/user.controller');

router.post('/user', auth.controlaAcessoAdmin, createUsers); //admins add novos usuários

router.get('/user', auth.controlaAcessoAdmin, getUsers); //admins veem usuários

router.delete('/user/:id', auth.controlaAcessoAdmin, deleteUsers); //admins deletam usuários 

router.put('/user/:id', auth.controlaAcessoAdmin, updateUsers); //admins atualizam usuários

router.put('/user/edit/:name', auth.controlaAcesso, updateMyUser); //usuário atualiza seus próprios dados

router.post('/user/login', loginUsers); //login


module.exports = router;
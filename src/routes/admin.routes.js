const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

//importa os controllers
const {
    createAdmins,
    deleteAdmins,
    loginAdmins
} = require('../controllers/admin.controller');


router.post('/admin', auth.controlaAcessoAdmin, createAdmins); //somente admin pode adicionar novos admins

router.delete('/admin/:id', auth.controlaAcessoAdmin, deleteAdmins); //somente admin pode deletar outros admins

router.post('/admin/login', loginAdmins); //login


module.exports = router;
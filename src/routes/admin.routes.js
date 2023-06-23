const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

//importa os controllers
const {
    createAdmins,
    deleteAdmins,
    loginAdmins,
    getAdmins,
    updateAdmins
} = require('../controllers/admin.controller');

//somente admins podem realizar as rotas abaixo
router.post('/admin', auth.controlaAcessoAdmin, createAdmins); 

router.get('/admin', auth.controlaAcessoAdmin, getAdmins); 

router.put('/admin/:id', auth.controlaAcessoAdmin, updateAdmins);

router.delete('/admin/:id', auth.controlaAcessoAdmin, deleteAdmins); 

router.post('/admin/login', loginAdmins); //login


module.exports = router;

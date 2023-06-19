const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

const {
    createAdmins,
    deleteAdmins,
    loginAdmins
} = require('../controllers/admin.controller');


router.post('/admin',  createAdmins); //adicionar o auth.controlaAcessoAdmin

router.delete('/admin/:id', auth.controlaAcessoAdmin, deleteAdmins);

router.post('/admin/login', loginAdmins);


module.exports = router;
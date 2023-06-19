const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

const {
    createAdmins,
    deleteAdmins,
    loginAdmins
} = require('../controllers/admin.controller');

router.post('/admin', createAdmins);

router.delete('/admin/:id', auth.controlaAcessoAdmin, deleteAdmins);

router.post('/admin/login', auth.controlaAcessoAdmin, loginAdmins);


module.exports = router;
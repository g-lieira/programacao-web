const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

const {
    createUsers,
    deleteUsers,
    loginUsers,
    updateUsers,
    getUsers
    //updateMyUser
} = require('../controllers/user.controller');

router.post('/user', auth.controlaAcessoAdmin, createUsers);

router.get('/user', auth.controlaAcessoAdmin, getUsers);

router.delete('/user/:id', auth.controlaAcessoAdmin, deleteUsers);

router.put('/user/:id', auth.controlaAcessoAdmin, updateUsers);

//router.put('/user/edit/:id', auth.controlaAcesso, updateMyUser);

router.post('/user/login', loginUsers);


module.exports = router;
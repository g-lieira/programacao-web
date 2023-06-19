const express = require('express');
const router = express.Router();

const {
    createUsers,
    deleteUsers,
    loginUsers
} = require('../controllers/user.controller');

router.post('/user', createUsers);

router.post('/login', loginUsers);

router.delete('/user/:id', deleteUsers);


module.exports = router;
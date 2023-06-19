const express = require('express');
const router = express.Router();

const {
    createUsers,
    deleteUsers,
    loginUsers
} = require('../controllers/user.controller');

router.post('/user', createUsers);

router.delete('/user/:id', deleteUsers);

router.post('/login', loginUsers);


module.exports = router;
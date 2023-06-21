const express = require('express');
const router = express.Router();

const {addProject, addTasks, addUsers, addAdmin} = require('../controllers/install.controller');

router.get("/install", addProject, addTasks, addUsers, addAdmin)

module.exports = router;
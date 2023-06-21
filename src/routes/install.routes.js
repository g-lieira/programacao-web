const express = require('express');
const router = express.Router();

const {addProject, addTasks, addUsers, addAdmin} = require('../controllers/install.controller');

router.get("/install", addUsers, addAdmin, addProject, addTasks )

module.exports = router;
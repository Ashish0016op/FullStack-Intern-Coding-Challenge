const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
router.post('/user',userController.createUser);
router.post('/login',userController.loginUser);
module.exports = router;
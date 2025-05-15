const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
router.post('/user',userController.userController);

module.exports = router;
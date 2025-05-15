const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const storeController = require('../controllers/store.js'); // Assuming you have a store controller

// User Routes
router.post('/user', userController.createUser); // Create a new user
router.post('/login', userController.loginUser); // Login user
router.get('/users', userController.getAllUsers); // Fetch all users

// Store Routes
router.get('/stores', storeController.getAllStores); // Fetch all stores
router.post('/stores', storeController.createStore); // Add a new store
router.post('/stores/:storeId/rate', storeController.rateStore); // Submit a rating for a store
router.get('/store/:storeId', storeController.getStoreById); // Fetch a specific store by ID

module.exports = router;
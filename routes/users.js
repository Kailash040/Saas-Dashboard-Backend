const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validateProfileUpdate } = require('../middleware/validation');

// User management routes (protected)
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, validateProfileUpdate, userController.updateProfile);
router.delete('/profile', authenticate, userController.deleteProfile);
router.get('/settings', authenticate, userController.getSettings);
router.put('/settings', authenticate, userController.updateSettings);

// Admin routes (if needed)
router.get('/all', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router; 
const express = require('express');
const router = express.Router();

// Import the controller you are about to build
const authController = require('../controllers/authController');

// 1. Devotee Registration Route
router.post('/register/devotee', authController.registerDevotee);

// 2. Volunteer Registration Route (To be built next)
// router.post('/register/volunteer', authController.registerVolunteer);

// 3. Vendor Registration Route (To be built next)
// router.post('/register/vendor', authController.registerVendor);

// 4. Unified Login Route
router.post('/login', authController.login);

module.exports = router;
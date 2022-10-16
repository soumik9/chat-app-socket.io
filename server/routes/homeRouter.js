const express = require('express');
const router = express.Router();

// const User = require('../schema/userSchema');
const HomeController = require('../controllers/homeController');

//routes
router.get('/', HomeController.index);

module.exports = router;
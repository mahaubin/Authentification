const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


module.exports = router;
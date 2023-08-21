const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const registerController = require('../../controllers/registerController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, usersController.getUserNames)
    .post(registerController.registerNewUser);

module.exports = router;
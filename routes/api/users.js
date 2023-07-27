const express = require('express');
const router = express.Router();
const db = require('../../dbConnector');
const registerController = require('../../controllers/registerController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, registerController.getAllUsers)
    .post(registerController.registerNewUser);

module.exports = router;
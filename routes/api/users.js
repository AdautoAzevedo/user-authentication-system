const express = require('express');
const router = express.Router();
const db = require('../../dbConnector');
const registerController = require('../../controllers/registerController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .post(registerController.registerNewUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../../dbConnector');
const registerController = require('../../controllers/registerController');


router.route('/')
    .get(async (req, res) =>{
        const [users] = await db.query('SELECT * FROM users');
        console.log(users);
        return res.json(users);
    })
    .post(registerController.registerNewUser);

module.exports = router;
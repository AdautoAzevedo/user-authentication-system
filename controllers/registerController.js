const db = require('../dbConnector');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) =>{
    const [users] = await db.query('SELECT * FROM users');
    console.log(users);
    return res.json(users);
}

const registerNewUser = async (req, res) =>{
    const {userName, password} = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);  //Encrypt the password
        const data = await db.query('INSERT INTO users (userName, password) VALUES (?, ?)', [userName, encryptedPassword]);
        return res.json(data);
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
};

module.exports = {getAllUsers, registerNewUser};
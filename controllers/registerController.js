const Users = require('../model/users');
const bcrypt = require('bcrypt');

const registerNewUser = async (req, res) =>{
    const {userName, password} = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);  //Encrypt the password
        const data = await Users.create({
            userName: userName,
            password: encryptedPassword
        });
        
        return res.json(data);
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
};

module.exports = {registerNewUser};
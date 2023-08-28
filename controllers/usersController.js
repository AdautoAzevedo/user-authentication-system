/* TEST */
const Users = require('../model/users');

const getUserNames = async (req, res) =>{
    try {
        const users = await Users.findAll();
        return res.json(users);
    } catch (error) {
        console.log("ERROR: " + error.message);
        res.status(500).json({'message': error.message});
    }
};

module.exports = {getUserNames};
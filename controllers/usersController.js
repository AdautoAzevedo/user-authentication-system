/* TEST */
const db = require('../dbConnector');

const getUserNames = async (req, res) =>{
    try {
        const users = await db.query('SELECT userName FROM users');
        return res.json(users);
    } catch (error) {
        console.log("ERROR: " + error.message);
        res.status(500).json({'message': error.message});
    }
};

module.exports = {getUserNames};
const db = require('../dbConnector');
const bcrypt = require('bcrypt');

const handleAuth = async (req, res)=>{
    const {userName, password} = req.body;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE userName = (?)', [userName]);
        if(!user) return res.status(401); //Unauthorized
    
        const match = await bcrypt.compare(password, user[0].password);
        if (match) {
            return res.json({'sucess': `Welcome back ${user[0].userName}`});
        } else{
            return res.status(401);
        }
    } catch (error) { 
        res.status(500).json({'message': error.message});        
    }
};

module.exports = {handleAuth};
const db = require('../dbConnector');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleAuth = async (req, res)=>{
    const {userName, password} = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE userName = (?)', [userName]);
        if(!user) return res.status(401); //Unauthorized
    
        const match = await bcrypt.compare(password, user[0].password);
        if (match) {
            //create JWT
            const accessToken = jwt.sign(
                {"username": user[0].userName},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10m'}
            )
            const refreshToken = jwt.sign(
                {"username": user[0].userName},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )
            
            //Store the refresh token in the database
            await db.query('UPDATE users SET refreshToken = (?) WHERE userName = (?)', [refreshToken, userName]);
            
            res.cookie('jwt', refreshToken, {httpOnly:true, maxAge: 24*60*60*1000});
            res.json({accessToken});
        } else{
            return res.status(401);
        }
    } catch (error) { 
        res.status(500).json({'message': error.message});        
    }
};

module.exports = {handleAuth};
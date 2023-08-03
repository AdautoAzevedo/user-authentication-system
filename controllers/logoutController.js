const db = require('../dbConnector');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout = async (req, res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    try {
        //Search for the Refresh Token in the db
        const [user] = await db.query('SELECT * FROM users WHERE refreshToken = (?)', [refreshToken]);
        if(!user){
            res.clearCookie('jwt', {httpOnly:true, maxAge: 24*60*60*1000})
            return res.sendStatus(204);
        } 
        //Delete the Refresh token in the db
        await db.query('UPDATE users Set refreshToken = NULL WHERE userName = (?) ', [user[0].userName]); 
        res.clearCookie('jwt', {httpOnly:true, maxAge: 24*60*60*1000})
        res.sendStatus(204);
        console.log("Logout sucessful");
    } catch (error) { 
        res.status(500).json({'message': error.message});        
    }


};

module.exports = {handleLogout};
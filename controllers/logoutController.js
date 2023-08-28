const Users = require('../model/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout = async (req, res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    try {
        //Search for the Refresh Token in the db
        const user = await Users.findOne({
            where:{
                refreshToken: refreshToken
            },
        });
        if(!user){
            res.clearCookie('jwt', {httpOnly:true, sameSite:'none', secure:true, maxAge: 24*60*60*1000});
            return res.sendStatus(204);
        } 

        //Delete the Refresh token in the db
        await Users.update(
            {refreshToken:null},
            {where: {id: user.id}}
        );
        
        res.clearCookie('jwt', {httpOnly:true, sameSite:'none', secure:true, maxAge: 24*60*60*1000})
        res.sendStatus(204);

    } catch (error) { 
        res.status(500).json({'message': error.message});        
    }


};

module.exports = {handleLogout};
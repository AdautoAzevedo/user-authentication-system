const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleAuth = async (req, res)=>{
    const {userName, password} = req.body;

    try {
        const user = await Users.findOne({
            where: {
                userName: userName
            },
        });

        if(!user) return res.status(401); //Unauthorized

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            //create JWT
            const accessToken = jwt.sign(
                {"userName": user.userName},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10m'}
            )
            const refreshToken = jwt.sign(
                {"userName": user.userName},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )
            
            //Store the refresh token in the database
            await Users.update(
                {refreshToken: refreshToken},
                {where: {userName: userName}}
            );
            
            res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*1000});
            res.json({accessToken});
        } else{
            return res.sendStatus(401);
        }
    } catch (error) { 
        res.status(500).json({'message': error.message});        
    }
};

module.exports = {handleAuth};
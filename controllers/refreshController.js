const Users = require('../model/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res)=>{
    const cookies = req.cookies;
   
    if(!cookies?.jwt){
        return res.sendStatus(401); 
    };
    const refreshToken = cookies.jwt;

    try {
        const user = await Users.findOne({
            where: {
                refreshToken: refreshToken
            },
        });
        if(!user) return res.status(403); //Forbidden
        
        //Evaluate JWTs
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) =>{
                if(err || user.userName !== decoded.username) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {"userName": decoded.userName},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '10m'}
                );
                res.json({ accessToken })
            }
        );
    } catch (error) { 
        res.status(500).json({'message': error.message});        
    }
};

module.exports = {handleRefreshToken};
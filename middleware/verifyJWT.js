const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const headers = req.headers;
    console.log(headers);
//    const authHeader = req.headers['Authorization'];
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader){
        console.log("Não teve header");
        return res.sendStatus(401);
    } 
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            next()
        }
    )
};

module.exports = verifyJWT;

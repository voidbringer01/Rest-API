// Middleware used to check if there is authorization header in request from which we get token. 
// Use for protected routes.
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const verify_token = (req,res,next)=>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        // token
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(bearerToken,process.env.JWT_SECRET || 'neka tajna',(err,authData)=>{
            if (err){ 
                res.status(403).json({message:'Token didnt pass verification.'})
            }else{
                req.authData = authData
                next()
            }
        })
    }else{
        res.status(403).json({message:'You are not authenticated.'})
    }

}

module.exports = verify_token
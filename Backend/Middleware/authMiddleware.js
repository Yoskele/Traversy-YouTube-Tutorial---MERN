const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModels');

// next we use becouse this is a Middleware function.
// We are checking for values on the header response.
const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get Token from Header.
            // Split the values inside and grab the second value. Bearer
            token = req.headers.authorization.split(' ')[1]
            // Verify the token.
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from the token.
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('No authorized token')
    }
})

module.exports = {protect};
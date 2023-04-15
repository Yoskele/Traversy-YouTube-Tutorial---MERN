const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Handles exeptions
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModels')

const registerUser = asyncHandler( async(req,res) => {
    console.log('registerUser ', req.body)
    const {name, email, password} = req.body;
    // If the input fields are empty send Error
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if User exists in Mongodb.
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exist.')
    }
    // Create a hashed password for the new user.
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Send the new user to Database.
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword,
    })
    // return if the new User got created.
    if(user){
        // If we have a user send back the User Object from Mongo
        res.status(201).json({
            _id:user.id,
            name:name,
            email:email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler( async(req,res) => {
    const {email, password} = req.body;
    // Check if User exist.
    const user = await User.findOne({email});
    console.log('Found User.. ', user)
    // Check if Password Matches the input field.
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler( async(req,res) => {
    // We get access to this req.user.id through Middleware.
    const {_id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name:name,
        email:email
    })
       
})

// Generate a JWT token for user expires in 30 days.
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}
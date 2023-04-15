const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a Name']
    },
    email:{
        type:String,
        required:[true, 'Please add Email']
    },
    password:{
        type:String,
        required:[true, 'Please insert Password']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)
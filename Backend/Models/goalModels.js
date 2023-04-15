//Thema for Mongose DB.
const mongoose = require('mongoose')
// ref: 'User' is from userModel
const goalSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type:String,
            required:[true, 'Please add a text value']
        }
    }, {
        timestamps:true
    }
)

module.exports = mongoose.model('Goal', goalSchema)
const asyncHandler = require('express-async-handler')

// Bring Goal Model from DB so we are able to access its data.
const Goal = require('../Models/goalModels')
const User = require('../Models/userModels')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

const setGoal = asyncHandler( async (req, res) => {
    // If the  Body text value is empty throw error
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a textfield.')
    }
    // Create a goal object
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler( async (req, res) => {
    // Bring the Goal you want to update.
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw Error('Goal Not Found')
    }
    const user = await User.findById(req.user.id)
    // Check for User.
    if(!user){
        res.status(401)
        throw new Error('User not found...')
    }
    // Make sure the logged in user matches the goal user.
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }
    // If we find it Update it.
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json({message:`Updated Goal ${updatedGoal}`})
})

const deleteGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    // Check for User.
    if(!user){
        res.status(401)
        throw new Error('User not found...')
    }
    // Make sure the logged in user matches the goal user.
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }
    // Delete the goal from The database.
    await goal.deleteOne({id:goal.id})
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
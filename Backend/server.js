const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const {errorHandler} = require('./Middleware/errorMiddleware')
const connectDB = require('./Config/db')

connectDB();

const app = express();

// Middleware To get object not undefined message back from server.
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// This makes the urls cleaner on goalRoutes File
app.use('/api/goals', require('./Routes/goalRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))

// This will over write the default error handler to our settings.
// We will get an Json Object when we have an Error.
app.use(errorHandler)

app.listen(port, () => { 
    console.log(`Port is Runnig: ${port}`)
})


// Created customized Error handler.
// When we recieve an error it will be a json object
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message:err.message, 
        stack: process.env.NODE_ENV === 'produciton' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}


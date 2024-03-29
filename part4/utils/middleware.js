
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/users')


const requestLogger = (request, _, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (_, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    next(error)
}


// Getting token from POST request with authorization header
const tokenExtractor = (request, _, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } 
    next()
}

const userExtractor = async (request, _, next) => {
    const tok = request.token
    if (tok) {
    
    const decodedtok = jwt.verify(tok,process.env.SECRET)
    

    if (tok && decodedtok.id) {
        const user = await User.findById(decodedtok.id)
        request.user = user
    } }
    next()
}


module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor,userExtractor }
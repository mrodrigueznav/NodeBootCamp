const morgan = require('morgan')
const logger = require('../utils/logger')

const stream = {
    write: (message) => logger.http(message)
}

const skip = () => {

}

const morganMiddleware = morgan({stream})

module.exports = morganMiddleware
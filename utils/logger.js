const { createLogger, transports } = require('winston');
require('express-async-errors')

const logger = createLogger({
    level: 'error',
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs/debug.log'}),
    ],
    exceptionHandlers: [
      new transports.File({ filename: 'exceptions.log' })
    ]
})
module.exports = logger;
const config = require('../../../config')
const winston = require('winston')

const colorize = config.isDev

const logger = winston.createLogger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console({ colorize }),
  ],
})

module.exports = logger

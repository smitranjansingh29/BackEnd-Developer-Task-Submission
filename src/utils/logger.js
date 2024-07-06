const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/loadBalancer.log' }),
        new winston.transports.File({ filename: 'logs/queueManager.log' })
    ]
});

module.exports = { logger };
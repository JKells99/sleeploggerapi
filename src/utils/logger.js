const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
            ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
        )
    ),
    transports: [
        ...(process.env.NODE_ENV !== 'production'
            ? [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                })
            ]
            : []),
        new transports.File({ filename: 'logs/app.log' })
    ]
});

module.exports = logger;

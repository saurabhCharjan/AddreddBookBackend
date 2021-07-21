const { transports,createLogger,format, transport } = require('winston')

const logger = createLogger({
    'transports':[
        new transports.File({
            filename:'log/info.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'log/error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        })
    ]
})
module.exports = logger;
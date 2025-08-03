const  winston = require('winston');
const { createLogger, format, transports } = winston
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({level , message , timestamp})=>{
    return  `${timestamp} : ${level} : ${message}`
})

 const customlogger = createLogger({
  format: combine(
    timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
    customFormat
  ),
  transports: [
          new transports.Console(),
          new transports.File({filename : "combined.logger.file"})
        ]
});

module.exports = customlogger;
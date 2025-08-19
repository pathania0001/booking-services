const serverConfig = require('./server.config.js')
const loggerConfig =  require('./logger.config.js')
const DBConnections = require('./checkDBConnection.js')
const Queue = require('./queue.config.js');
module.exports ={
    ...serverConfig,
    ...DBConnections,
    loggerConfig,
    Queue,
}
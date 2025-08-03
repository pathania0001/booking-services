const serverConfig = require('./server.config.js')
const loggerConfig =  require('./logger.config.js')
const DBConnections = require('./checkDBConnection.js')

module.exports ={
    ...serverConfig,
    ...DBConnections,
    loggerConfig,
}
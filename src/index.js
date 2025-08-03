
const app  = require('./app');

const {PORT,loggerConfig, MysqlConnection} = require('./config');

//MysqlConnection();


app.listen(PORT, () => {
  console.log(`🚀 Server is running at port: ${PORT}`);
  loggerConfig.info("Successfully started the server", "root", {});
});

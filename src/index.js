
const app  = require('./app');

const {PORT , loggerConfig , Queue} = require('./config');

//MysqlConnection();


app.listen(PORT, async () => {
  console.log(`🚀 Server is running at port: ${PORT}`);
  loggerConfig.info("Successfully started the server", "root", {});
  await Queue.queueConnection();
});

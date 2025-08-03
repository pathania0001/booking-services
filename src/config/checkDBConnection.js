const { Sequelize } = require("sequelize")

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = require("./server.config")

const MysqlConnection = async ()=>{
   const sequelize =  new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
        host: DB_HOST,
        dialect: DB_DIALECT,
    });
     
    const testDB = async () =>{
        try {
            await sequelize.authenticate();
            console.log('✅ MY-SQL Database connection has been established successfully.');  
        } catch (error) {
           console.log('❌ Unable to connect to the MY-SQL database:', error.message);
        }
    }

    testDB();
}


module.exports = {
    MysqlConnection,
}


// You can make connection by this or by making config/config.json that consume by model.index.js file
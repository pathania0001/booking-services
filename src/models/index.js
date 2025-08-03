const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const configJson = require("../config/config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Read all model files in this directory
const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  });

// Import each model
for (const file of modelFiles) {
  const modelFunc = require(path.join(__dirname, file));
  const model = modelFunc(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Call associate methods if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;

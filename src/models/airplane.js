'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    static associate(models) {
      
    }
  }

  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isAlphanumeric:true,
        },
      },
      capacity:{
       type: DataTypes.INTEGER,
       defaultValue:0,
       validate:{
        max:1000,
       }
        
      } 
    },
    {
      sequelize,
      modelName: "Airplane",
      tableName: "airplanes",
      timestamps: true,
    }
  );

  return Airplane;
};

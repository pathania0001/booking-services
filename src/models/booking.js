'use strict';
const {
  Model
} = require('sequelize');
const { ENUM } = require('../utils/common');
const {CANCELLED,PENDING,INITIATED,BOOKED} = ENUM.BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    userId: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    status: {
      type:DataTypes.ENUM,
      values:[CANCELLED,PENDING,INITIATED,BOOKED],
      defaultValue:INITIATED,
    },
    numberOfSeats: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1,
    },
    totalCost: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:1
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  },{
    indexes:[
      { 
        uniqu:true,
        fields:['userId','flightId']
      },
      { 
        uniqu:true,
        fields:['flightId']
      }
    ]
  });
  return Booking;
};
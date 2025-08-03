'use strict';

const { ENUM } = require('../utils/common');
const {CANCELLED,PENDING,INITIATED,BOOKED} = ENUM.BOOKING_STATUS;

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      status: {
        type: Sequelize.ENUM,
         values:[CANCELLED,PENDING,INITIATED,BOOKED],
         defaultValue:INITIATED,
      },
      numberOfSeats: {
      type: Sequelize.INTEGER,
      allowNull:false,
      defaultValue:1,
    },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
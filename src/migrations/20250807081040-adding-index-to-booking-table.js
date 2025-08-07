'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex('Bookings',['userId','flightId'],{
       unique: true,
       name: 'bookings_userId_flightId'
    })

    await queryInterface.addIndex('Bookings',['flightId'],{
      name:'flightId_index'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('Bookings','bookings_userId_flightId');
    await queryInterface.removeIndex('Bookings','flightId_index');
  }
};

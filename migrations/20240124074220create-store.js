'use strict';
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      category: {
        type: Sequelize.STRING,
        allowNull : false
      },
      code: {
        type: Sequelize.STRING,
        allowNull : false
      },
      since: {
        type: Sequelize.DATE,
        allowNull : false
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
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Stores');
  }
};
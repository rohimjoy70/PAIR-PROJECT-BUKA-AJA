'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Products', 'StoreId',{
      type: Sequelize.INTEGER,
      allowNull: false,
      references :{
        model: {
          tableName : 'Stores'
        },
        key: 'id'
      }
    })
  },

   down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Products', 'StoreId')
  }
};

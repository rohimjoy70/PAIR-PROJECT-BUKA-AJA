'use strict';
const fs = require('fs');
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const dataStore = JSON.parse(fs.readFileSync("./data/user.json", 'utf8')).map((el) =>{
      el.createdAt = new Date(),
      el.updatedAt = new Date()
      return el;
  })
    return queryInterface.bulkInsert('Users', dataStore, {})
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {})
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: "Admin",
        phone: "(11)99111-9000",
        email: "email_admin@email.com.br",
        password: "SenhaForte123",
        birthday: "1980/09/15",
        created_at: new Date(),
        updated_at: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

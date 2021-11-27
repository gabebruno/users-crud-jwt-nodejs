const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: "First User Seeded",
        phone: "(11)99111-9000",
        email: "firstuser@gmail.com.br",
        password: await bcrypt.hash("SenhaForte123", 10),
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

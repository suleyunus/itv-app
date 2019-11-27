require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: process.env.FIRST_NAME,
    lastName: process.env.LAST_NAME,
    email: process.env.EMAIL,
    phone: process.env.PHONE,
    password: bcrypt.hashSync(process.env.PASSWORD, parseInt(process.env.SALT_ROUNDS, 10)),
    siteAdmin: Boolean(process.env.SITE_ADMIN),
    typeId: parseInt(process.env.TYPE_ID, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

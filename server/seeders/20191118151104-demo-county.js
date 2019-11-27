module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Counties', [{
    county: 'Nairobi',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    county: 'Mombasa',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    county: 'Kisumu',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    county: 'Eldoret',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    county: 'Nakuru',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Counties', null, {}),
};

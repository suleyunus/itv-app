module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UrbanCenters', [{
    urbanCenter: 'Kilimani',
    countyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    urbanCenter: 'Langata',
    countyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    urbanCenter: 'Donholm',
    countyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    urbanCenter: 'Kisumu',
    countyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    urbanCenter: 'Eldoret',
    countyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UrbanCenters', null, {}),
};

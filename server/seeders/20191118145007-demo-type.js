module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Types', [{
    type: 'Creator',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: 'Consumer',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: 'Sponsor',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: 'Stakeholder',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Types', null, {}),
};

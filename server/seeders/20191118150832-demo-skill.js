module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Skills', [{
    skill: 'Acting',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    skill: 'Singing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    skill: 'Dancing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    skill: 'Directing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    skill: 'Script Writing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  ], {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Skills', null, {}),
};

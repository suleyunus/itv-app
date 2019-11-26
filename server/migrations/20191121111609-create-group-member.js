module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('GroupMembers', {
    groupId: {
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
        as: 'groupId',
      },
    },
    userId: {
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    groupAdmin: {
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('GroupMembers'),
};

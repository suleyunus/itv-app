module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CreatorProfiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    stageName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    urbanCenterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UrbanCenters',
        key: 'id',
        as: 'urbanCenterId',
      },
    },
    majorSkillId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Skills',
        key: 'id',
        as: 'majorSkillId',
      },
    },
    minorSkillId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Skills',
        key: 'id',
        as: 'minorSkillId',
      },
    },
    agreeToLicense: {
      allowNull: false,
      defaultValue: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('CreatorProfiles'),
};

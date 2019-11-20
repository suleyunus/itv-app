module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CreatorProfiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id',
      },
    },
    stage_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    urban_center_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UrbanCenters',
        key: 'id',
        as: 'urban_center_id',
      },
    },
    major_skill_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Skills',
        key: 'id',
        as: 'major_skill_id',
      },
    },
    minor_skill_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Skills',
        key: 'id',
        as: 'minor_skill_id',
      },
    },
    agree_to_license: {
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

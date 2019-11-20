module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UrbanCenters', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    urban_center: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    county_id: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Counties',
        key: 'id',
        as: 'county_id',
      },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UrbanCenters'),
};

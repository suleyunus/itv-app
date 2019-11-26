module.exports = (sequelize, DataTypes) => {
  const UrbanCenter = sequelize.define('UrbanCenter', {
    urbanCenter: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Urban center must have a value',
        },
      },
    },
    countyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'County',
        key: 'id',
        as: 'countyId',
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  UrbanCenter.associate = (models) => {
    // associations can be defined here
    UrbanCenter.belongsTo(models.County, { foreignKey: 'countyId', onDelete: 'CASCADE' });
  };
  return UrbanCenter;
};

module.exports = (sequelize, DataTypes) => {
  const UrbanCenter = sequelize.define('UrbanCenter', {
    urban_center: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Urban center must have a value',
        },
      },
    },
    county_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'County',
        key: 'id',
        as: 'county_id',
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  UrbanCenter.associate = (models) => {
    // associations can be defined here
    UrbanCenter.belongsTo(models.County, { foreignKey: 'county_id', onDelete: 'CASCADE' });
  };
  return UrbanCenter;
};

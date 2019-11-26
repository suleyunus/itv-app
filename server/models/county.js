module.exports = (sequelize, DataTypes) => {
  const County = sequelize.define('County', {
    county: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'County must have a value',
        },
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  County.associate = (models) => {
    // associations can be defined here
  };
  return County;
};
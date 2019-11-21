module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Type must have a value',
        },
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Type.associate = (models) => {
    // associations can be defined here
  };
  return Type;
};

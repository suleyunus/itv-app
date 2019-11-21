module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Group must have a name',
        },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Group must be associated to user that created it',
        },
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Group must be associated to user that updated it',
        },
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Group.associate = (models) => {
    // associations can be defined here
    Group.belongsToMany(models.User, { through: models.GroupMember, foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return Group;
};

module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'Related group id is required',
        },
      },
      references: {
        model: 'Group',
        key: 'id',
        as: 'groupId',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'Related user id is required',
        },
      },
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      },
    },
    groupAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'Group admin status is required',
        },
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  GroupMember.associate = (models) => {
    // associations can be defined here
  };
  return GroupMember;
};

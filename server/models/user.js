module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your first name',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your last name',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already exists',
      },
      validate: {
        notNull: {
          msg: 'Please provide your email address',
        },
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Phone number already exists',
      },
      validate: {
        notNull: {
          msg: 'Please provide your phone number',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a password',
        },
        isNotShort: (value) => {
          if (value.length < 9) {
            throw new Error('Password should be at least 9 characters');
          }
        },
      },
    },
    bio: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    typeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Type',
        key: 'id',
        as: 'typeId',
      },
    },
    siteAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: DataTypes.DATE,
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Type, { foreignKey: 'typeId', onDelete: 'CASCADE', as: 'type' });
    User.belongsToMany(models.Group, {
      through: models.GroupMember,
      as: 'members',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

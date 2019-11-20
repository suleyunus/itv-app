module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your first name',
        },
      },
    },
    last_name: {
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
        msg: 'Email address already exists'
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
        msg: 'Phone number already exists'
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
    avatar_url: DataTypes.STRING,
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Type',
        key: 'id',
        as: 'type_id',
      },
    },
    site_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    last_login: DataTypes.DATE,
  }, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Type, { foreignKey: 'type_id', onDelete: 'CASCADE' });
  };
  return User;
};

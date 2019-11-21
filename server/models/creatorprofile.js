module.exports = (sequelize, DataTypes) => {
  const CreatorProfile = sequelize.define('CreatorProfile', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      },
    },
    stageName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your stage name',
        },
      },
    },
    urbanCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your urban center',
        },
      },
      references: {
        model: 'UrbanCenter',
        key: 'id',
        as: 'urbanCenterId',
      },
    },
    majorSkillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your major skill',
        },
      },
      references: {
        model: 'Skill',
        key: 'id',
        as: 'majorSkillId',
      },
    },
    minorSkillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your minor skill',
        },
      },
      references: {
        model: 'Skill',
        key: 'id',
        as: 'minorSkillId',
      },
    },
    agreeToLicense: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        hasAgreed: (value) => {
          if (value !== true) {
            throw new Error('You must agree to the terms and conditions in the creator license agreement');
          }
        },
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  CreatorProfile.associate = (models) => {
    // associations can be defined here
    CreatorProfile.belongsTo(models.UrbanCenter, { foreignKey: 'urbanCenterId', onDelete: 'CASCADE' });
    CreatorProfile.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    CreatorProfile.belongsTo(models.Skill, { foreignKey: 'majorSkillId', onDelete: 'CASCADE' });
    CreatorProfile.belongsTo(models.Skill, { foreignKey: 'minorSkillId', onDelete: 'CASCADE' });
  };
  return CreatorProfile;
};

module.exports = (sequelize, DataTypes) => {
  const CreatorProfile = sequelize.define('CreatorProfile', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'user_id',
      },
    },
    stage_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your stage name',
        },
      },
    },
    urban_center_id: {
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
        as: 'urban_center_id',
      },
    },
    major_skill_id: {
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
        as: 'major_skill_id',
      },
    },
    minor_skill_id: {
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
        as: 'minor_skill_id',
      },
    },
    agree_to_license: {
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
    CreatorProfile.belongsTo(models.UrbanCenter, { foreignKey: 'urban_center_id', onDelete: 'CASCADE' });
    CreatorProfile.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    CreatorProfile.belongsTo(models.Skill, { foreignKey: 'major_skill_id', onDelete: 'CASCADE' });
    CreatorProfile.belongsTo(models.Skill, { foreignKey: 'minor_skill_id', onDelete: 'CASCADE' });
  };
  return CreatorProfile;
};

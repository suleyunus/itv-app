module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    skill: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Skill must have a value',
        },
      },
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Skill.associate = (models) => {
    // associations can be defined here
  };
  return Skill;
};

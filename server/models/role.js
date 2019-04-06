export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'value is required',
      },
      unique: {
        args: true,
        msg: 'Role value is already registered',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'name is required',
      },
      unique: {
        args: true,
        msg: 'This role is already registered',
      },
    },
  }, {});
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'role',
    });
  };
  return Role;
};

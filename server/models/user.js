export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'firsName is required',
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'lastName is required',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'email is required',
      },
    },
    role: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Roles',
        key: 'roleId',
        as: 'role',
      },
    },
    phoneNumber: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    status: DataTypes.STRING,
    handle: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'password is required',
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    },
    salt: DataTypes.STRING,
    hash: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'role',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

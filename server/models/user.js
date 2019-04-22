import crypto from 'crypto';
import auth from '../middleware/auth';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'fullName is required',
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'username is required',
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
        key: 'id',
        as: 'role',
      },
    },
    phoneNumber: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    approved: DataTypes.STRING,
    salt: DataTypes.STRING,
    hash: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(user) {
        user.salt = crypto.randomBytes(16).toString('hex');
        user.hash = auth.generateHash(user.hash, user.salt);
      },
    }
  });
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'role',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

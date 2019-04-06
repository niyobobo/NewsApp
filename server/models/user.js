'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
    profile_url: DataTypes.STRING,
    status: DataTypes.STRING,
    handle: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    hash: DataTypes.STRING,
    created_at: DataTypes.NOW,
    updated_at: DataTypes.DATE,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
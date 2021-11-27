const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {};

  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: true
  });

  return User;
};
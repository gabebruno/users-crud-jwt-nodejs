const Sequelize = require('sequelize');
const configDatabase = require('./database');

module.exports = new Sequelize(configDatabase);
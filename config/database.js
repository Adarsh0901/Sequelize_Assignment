const {Sequelize} = require('sequelize');

module.exports = new Sequelize('Assignment1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
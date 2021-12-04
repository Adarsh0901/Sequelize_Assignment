const sequelize = require('sequelize');
const { models } = require('../config/database');
const db = require('../config/database');

const Employee = db.define('Employee', {
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    first_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    salary: {
        type: sequelize.BIGINT(11),
        allowNull: false
    },
    joining_date: {
        type: sequelize.DATE,
        allowNull: false
    },
    department: {
        type: sequelize.STRING,
        allowNull: false
    },
});

module.exports = Employee;
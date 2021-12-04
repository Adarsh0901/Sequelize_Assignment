const sequelize = require('sequelize');
const db = require('../config/database');

const Reward = db.define('Reward', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    date_reward: {
        type: sequelize.DATE,
        allowNull: false
    },
    amount: {
        type:sequelize.BIGINT(11),
        allowNull: false
    }
});

module.exports = Reward;
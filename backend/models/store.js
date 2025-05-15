const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Store = sequelize.define('Store', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Store;
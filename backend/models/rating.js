const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = require('./store'); // Assuming you have a Store model

const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Store, // Reference to the Store model
            key: 'id',
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5, // Ensure the rating is between 1 and 5
        },
    },
});

Store.hasMany(Rating, { foreignKey: 'storeId', as: 'ratings' });
Rating.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

module.exports = Rating;
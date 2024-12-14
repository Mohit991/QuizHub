const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define(
    'Category',
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'categories',
        timestamps: false
    }
);

module.exports = Category;

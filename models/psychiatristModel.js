const { sequelizeCon, DataTypes } = require('../config/dbConfig');
const { Model } = require('sequelize');

class Psychiatrist extends Model {}

Psychiatrist.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelizeCon,
    modelName: 'Psychiatrist',
    tableName: 'psychiatrists',
    timestamps: true
});

module.exports = Psychiatrist;

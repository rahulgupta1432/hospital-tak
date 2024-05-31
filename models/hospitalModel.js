const { sequelizeCon, DataTypes } = require('../config/dbConfig');
const { Model } = require('sequelize');
const { Patient } = require('./patientModel');
const Psychiatrist = require('./psychiatristModel');

class Hospital extends Model {}

Hospital.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeCon,
    modelName: 'Hospital',
    tableName: 'hospitals',
    timestamps: true
});

// models/hospital.js
Hospital.hasMany(Psychiatrist, { as: 'psychiatrists', foreignKey: 'hospitalId' });

// models/psychiatrist.js
Psychiatrist.belongsTo(Hospital, { as: 'hospital', foreignKey: 'hospitalId' });
Psychiatrist.hasMany(Patient, { as: 'patients', foreignKey: 'psychiatristId' });

// models/patient.js
Patient.belongsTo(Psychiatrist, { as: 'psychiatrist', foreignKey: 'psychiatristId' });
Patient.belongsTo(Hospital, { as: 'hospital', foreignKey: 'hospitalId' });


module.exports = Hospital;

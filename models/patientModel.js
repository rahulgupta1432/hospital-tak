const { sequelizeCon, DataTypes } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const joi = require('joi');

class Patient extends Model {}

Patient.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [10]
        // }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [8, 15],
        //     is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
        // }
    },
    patientPicture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'hospitals',
            key: 'id'
        }
    },
    psychiatristId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'psychiatrists',
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeCon,
    modelName: 'Patient',
    tableName: 'patients',
    timestamps: true
});

Patient.beforeCreate(async (patient, options) => {
    if (patient.password) {
        const hashedPassword = await bcrypt.hash(patient.password, 10);
        patient.password = hashedPassword;
    }
});

const validatePatientInfo= async (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        address: joi.string().min(10).required(),
        email: joi.string().email().required(),
        // phoneNumber: joi.string().min(10).required(),
        phoneNumber: joi.string().regex(/^\+\d{1,3}\d{10}$/).required(),
        password: joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).required(),
        // patientPicture: joi.string().uri().required(),
        hospitalId: joi.number().required(),
        psychiatristId: joi.number().required()
    });
    let valid = await schema
    .validateAsync(user, { abortEarly: false })
    .catch((error) => {
      return { error };
    });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
};

module.exports = { Patient, validatePatientInfo};

// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Therapist = require('./Therapist.js');

// Defining the Patient model
const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    degree: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    first_consultation: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    last_consultation: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    type_of_disability: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    background: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    file_name_image: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    TherapistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

// Defining associations between Therapist and Patient
Therapist.hasMany(Patient, { foreignKey: 'TherapistId' });
Patient.belongsTo(Therapist, { foreignKey: 'TherapistId' });

// Exporting the Patient model
module.exports = Patient;
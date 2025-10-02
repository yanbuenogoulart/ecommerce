const { DataTypes } = require('sequelize');
const db = require('../db/conn');


const Cliente = db.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefone: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false});


module.exports = Cliente;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/conn');


const Cliente = sequelize.define('Cliente', {
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
}, {timeStamp: false});


module.exports = Cliente;
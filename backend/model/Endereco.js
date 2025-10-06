const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Endereco = db.define('Endereco', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    idCliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false, tableName: 'enderecos'})

module.exports = Endereco
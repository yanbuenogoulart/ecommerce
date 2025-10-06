const {DataTypes} = require('sequelize')
const db = require('../db/conn')


const Telefone = db.define('Telefone', {
    idTelefone: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    idCliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {timestamps: false, tableName: 'telefones'})

module.exports = Telefone
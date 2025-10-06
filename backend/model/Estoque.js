const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Estoque = db.define('Estoque', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    idProduto: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    dataAtualizacao: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
}, {timestamps: false, tableName: 'estoque'})

module.exports = Estoque
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  dataPedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Pedido;
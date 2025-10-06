const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Carrinho = db.define('Carrinho', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  idCliente: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, { 
  timestamps: false, 
  tableName: 'carrinhos' 
});

module.exports = Carrinho;

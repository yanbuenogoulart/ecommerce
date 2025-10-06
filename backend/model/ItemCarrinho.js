const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const ItemCarrinho = db.define('ItemCarrinho', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  idCarrinho: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  idProduto: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, { 
  timestamps: false, 
  tableName: 'itens_carrinho' 
});

module.exports = ItemCarrinho;

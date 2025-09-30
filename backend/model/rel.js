// Defina relacionamentos aqui
const Cliente = require('./Cliente');
const Pedido = require('./Pedido');
const Produto = require('./Produto');

// Cliente 1 - N Pedidos
Cliente.hasMany(Pedido, { foreignKey: 'clienteId', as: 'pedidos', onDelete: 'CASCADE' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Produto 1 - N Pedidos
Produto.hasMany(Pedido, { foreignKey: 'produtoId', as: 'pedidos' });
Pedido.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });

module.exports = { Cliente, Pedido, Produto };
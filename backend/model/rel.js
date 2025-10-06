// Defina relacionamentos aqui
const Cliente = require('./Cliente')
const Pedido = require('./Pedido')
const Produto = require('./Produto')
const Estoque = require('./Estoque')
const Telefone = require('./Telefone')
const Endereco = require('./Endereco')
const Carrinho = require('./Carrinho')
const ItemCarrinho = require('./ItemCarrinho')

// Cliente 1 - N Pedidos
Cliente.hasMany(Pedido, { foreignKey: 'clienteId', as: 'pedidos', onDelete: 'CASCADE' })
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' })

// Produto 1 - N Pedidos
Produto.hasMany(Pedido, { foreignKey: 'produtoId', as: 'pedidos' })
Pedido.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' })

Estoque.belongsTo(Produto, {foreignKey: 'idProduto', as: 'produto'})
Produto.hasOne(Estoque, {foreignKey: 'idProduto', as: 'estoqueProduto'})

Cliente.hasMany(Telefone, { foreignKey: 'idCliente', as: 'telefones', onDelete: 'CASCADE' })
Telefone.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'cliente' })

Cliente.hasMany(Endereco, { foreignKey: 'idCliente', as: 'enderecos', onDelete: 'CASCADE' })
Endereco.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'cliente' })

Cliente.hasOne(Carrinho, { foreignKey: 'idCliente', as: 'carrinho', onDelete: 'CASCADE' })
Carrinho.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'cliente' })

Carrinho.hasMany(ItemCarrinho, { foreignKey: 'idCarrinho', as: 'itens', onDelete: 'CASCADE' })
ItemCarrinho.belongsTo(Carrinho, { foreignKey: 'idCarrinho', as: 'carrinho' })

module.exports = { Cliente, Pedido, Produto, Estoque, Telefone, Endereco, Carrinho, ItemCarrinho }
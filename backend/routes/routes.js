const express = require('express');
const authController = require('../controllers/authController');
const clienteController = require('../controllers/clienteController');
const produtoController = require('../controllers/produtoController');
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ------------------- Público -------------------


// ------------------- Auth -------------------
router.post('/register', authController.register);
router.post('/login', authController.login);



// ------------------- Privado -------------------


// ------------------- Clientes -------------------
router.get('/clientes', authMiddleware, clienteController.getAllClientes);
router.get('/clientes/id/:id', authMiddleware, clienteController.getClienteById);
router.get('/clientes/nome/:nome', authMiddleware, clienteController.getClienteByName);
router.post('/clientes', authMiddleware, clienteController.createCliente);
router.put('/clientes/:id', authMiddleware, clienteController.updateCliente);
router.delete('/clientes/:id', authMiddleware, clienteController.deleteCliente);

// ------------------- Produtos -------------------
router.get('/produtos', authMiddleware, produtoController.getAllProdutos);
router.get('/produtos/id/:id', authMiddleware, produtoController.getProdutoById);
router.get('/produtos/nome/:nome', authMiddleware, produtoController.getProdutoByName);
router.post('/produtos', authMiddleware, produtoController.createProduto);
router.put('/produtos/:id', authMiddleware, produtoController.updateProduto);
router.delete('/produtos/:id', authMiddleware, produtoController.deleteProduto);

// ------------------- Pedidos -------------------
router.get('/pedidos', authMiddleware, pedidoController.getAllPedidos);
router.get('/pedidos/:id', authMiddleware, pedidoController.getPedidoById);
router.post('/pedidos', authMiddleware, pedidoController.createPedido);
router.put('/pedidos/:id', authMiddleware, pedidoController.updatePedido);
router.delete('/pedidos/:id', authMiddleware, pedidoController.deletePedido);

module.exports = router;

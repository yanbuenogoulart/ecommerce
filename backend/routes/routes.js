const express = require('express');
const clienteController = require('../controllers/clienteController');
const produtoController = require('../controllers/produtoController');
const pedidoController = require('../controllers/pedidoController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');
const router = express.Router();

// ------------------- Público -------------------
router.get('/clientes', clienteController.getAllClientes);
router.post('/clientes', clienteController.createCliente);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// ------------------- Auth -------------------
router.use('/auth', authRoutes);




// ------------------- Privado -------------------


// ------------------- Clientes -------------------
router.get('/clientes/id/:id', authMiddleware, clienteController.getClienteById);
router.get('/clientes/nome/:nome', authMiddleware, clienteController.getClienteByName);
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

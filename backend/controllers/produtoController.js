const Produto = require('../model/Produto');
const { Op } = require('sequelize');

async function createProduto(req, res) {
    try {
        const { nome, preco, estoque } = req.body;
        if (!nome || preco == null) 
            return res.status(400).json({ message: 'nome e preco são obrigatórios' });

        const produto = await Produto.create({ nome, preco, estoque });
        res.status(201).json(produto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
}

async function getAllProdutos(req, res) {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}

async function getProdutoById(req, res) {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(produto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
}

async function getProdutoByName(req, res) {
    try {
        const { nome } = req.query;
        if (!nome) return res.status(400).json({ message: 'Parâmetro nome é obrigatório' });

        const produtos = await Produto.findAll({
            where: { nome: { [Op.like]: `%${nome}%` } }
        });

        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produto por nome' });
    }
}

async function updateProduto(req, res) {
    try {
        const { id } = req.params;
        const { nome, preco, estoque } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

        await produto.update({ nome, preco, estoque });
        res.json({ message: 'Atualizado', produto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
}

async function deleteProduto(req, res) {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

        await produto.destroy();
        res.json({ message: 'Produto deletado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
}

module.exports = { 
    createProduto, 
    getAllProdutos, 
    getProdutoById, 
    getProdutoByName, 
    updateProduto, 
    deleteProduto 
};

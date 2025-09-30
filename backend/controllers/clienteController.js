const { Op } = require('sequelize')
const Cliente = require('../model/Cliente')


async function createCliente(req, res) {
    try {
        const { nome, email, senha, telefone } = req.body
        if (!nome || !email || !senha) return res.status(400).json({ message: 'nome, email e senha são obrigatórios' })
        const cliente = await Cliente.create({ nome, email, senha, telefone })
        res.status(201).json(cliente)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao criar cliente' })
    }
}


async function getAllClientes(req, res) {
    try {
        const clientes = await Cliente.findAll({ attributes: { exclude: ['senha'] } })
        res.json(clientes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar clientes' })
    }
}


async function getClienteById(req, res) {
    try {
        const { id } = req.params
        const cliente = await Cliente.findByPk(id, { attributes: { exclude: ['senha'] } })
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' })
        res.json(cliente)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar cliente' })
    }
}


async function getClienteByName(req, res) {
    try {
        const { nome } = req.query
        if (!nome) return res.status(400).json({ message: 'Parâmetro nome é obrigatório' })


        const clientes = await Cliente.findAll({
            where: { nome: { [Op.like]: `%${nome}%` } },
            attributes: { exclude: ['senha'] }
        })


        res.json(clientes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar cliente por nome' })
    }
}


async function updateCliente(req, res) {
    try {
        const { id } = req.params
        const { nome, email, telefone } = req.body
        const cliente = await Cliente.findByPk(id)
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' })


        await cliente.update({ nome, email, telefone })
        res.json({ message: 'Atualizado', cliente })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao atualizar cliente' })
    }
}


async function deleteCliente(req, res) {
    try {
        const { id } = req.params
        const cliente = await Cliente.findByPk(id)
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' })


        await cliente.destroy()
        res.json({ message: 'Cliente deletado' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao deletar cliente' })
    }
}


module.exports = { createCliente, getAllClientes, getClienteById, getClienteByName, updateCliente, deleteCliente }
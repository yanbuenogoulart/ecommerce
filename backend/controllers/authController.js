const Cliente = require('../model/Cliente');
const { hashPassword, comparePassword, generateToken } = require('../service/authService');

async function register(req, res) {
  try {
    const { nome, email, senha, telefone } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });

    const existing = await Cliente.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'E-mail já cadastrado' });

    const hashed = await hashPassword(senha);
    const cliente = await Cliente.create({ nome, email, senha: hashed, telefone });
    const token = generateToken({ id: cliente.id, email: cliente.email });

    res.status(201).json({ cliente: { id: cliente.id, nome: cliente.nome, email: cliente.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: 'email e senha são obrigatórios' });

    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) return res.status(401).json({ message: 'Credenciais inválidas' });

    const ok = await comparePassword(senha, cliente.senha);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = generateToken({ id: cliente.id, email: cliente.email });
    res.json({ token, cliente: { id: cliente.id, nome: cliente.nome, email: cliente.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
}

module.exports = { register, login };
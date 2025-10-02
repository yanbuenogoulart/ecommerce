// controllers/authController.js
const { hashPassword, comparePassword, generateToken, findUserByEmail } = require('../services/authService');

async function register(req, res) {
  try {
    const { nome, email, senha, telefone } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });

    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email já cadastrado' });

    const hashed = await hashPassword(senha);

    // usar model Cliente direto para criar (não expõe senha no retorno)
    const Cliente = require('../model/Cliente');
    const novo = await Cliente.create({ nome, email, senha: hashed, telefone });

    // retornar sem senha
    const { senha: _, ...userWithoutSenha } = novo.toJSON();
    res.status(201).json(userWithoutSenha);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: 'email e senha são obrigatórios' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const ok = await comparePassword(senha, user.senha);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = generateToken({ id: user.id, email: user.email });

    // retorna token e infos básicas (sem senha)
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
}

module.exports = { register, login };

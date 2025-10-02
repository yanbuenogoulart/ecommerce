// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/authService');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function auth(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

  const parts = authHeader.split(' ');
  const token = parts.length === 2 ? parts[1] : (parts[0] === authHeader ? authHeader : null);
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    // anexar usuário ao request sem a senha
    const { senha, ...userSemSenha } = user.toJSON();
    req.user = userSemSenha;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

module.exports = auth
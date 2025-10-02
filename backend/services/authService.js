// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cliente = require('../model/Cliente');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function findUserByEmail(email) {
  return Cliente.findOne({ where: { email } });
}

async function findUserById(id) {
  return Cliente.findByPk(id);
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  findUserByEmail,
  findUserById
};

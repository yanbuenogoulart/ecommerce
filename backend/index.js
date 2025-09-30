const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const sequelize = require('./db/conn');
const { Cliente, Pedido, Produto } = require('./model/rel');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.send('API rodando'));

async function start() {
  await testConnection();

  await sequelize.sync({ alter: true });

  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

start();
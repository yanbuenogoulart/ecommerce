const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            underscored: false
        }
    }
);

// Função para testar conexão
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida.');
    } catch (err) {
        console.error('Erro na conexão!', err);
    }
}

module.exports = { sequelize, testConnection };

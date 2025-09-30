const { Cliente, Pedido, Produto } = require('./model/rel');
const { sequelize, testConnection } = require('./db/conn');

const sync = async () => {
    try {
        await testConnection();
        await sequelize.sync({ force: true });
        console.log('Banco sincronizado!');
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
};

sync();

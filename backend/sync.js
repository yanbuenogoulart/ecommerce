const { Cliente, Pedido, Produto, Endereco, Telefone, Estoque } = require('./model/rel');
const db = require('./db/conn');

async function sync() {
    try {
        await db.sync({ force: true });
        console.log('Banco sincronizado!');
    } catch (error) {
        console.error(error);
    } finally {
        await db.close();
    }
}

sync()

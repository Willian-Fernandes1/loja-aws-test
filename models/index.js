// models/index.js
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  });
} else {
  sequelize = new Sequelize('railway', 'root', 'WXNfxBJXvAhTTffFXFKbeZrpxiDQfWXO', {
    host: 'nozomi.proxy.rlwy.net',
    port: 44062,
    dialect: 'mysql',
    logging: false
  });
}

// Importar a função que define o modelo
const defineProduto = require('./produto.model');

// Criar o modelo
const Produto = defineProduto(sequelize);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('✅ Banco de dados sincronizado!');
  } catch (error) {
    console.error('❌ Erro ao sincronizar:', error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  syncDatabase();
}

module.exports = { 
  Produto, 
  sequelize,
  defineProduto 
};
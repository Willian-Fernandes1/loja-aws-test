const sequelize = require('../config/database');
const Produto = require('./produto.model');

const syncDatabase = async () => {
  try {
   //await sequelize.sync({ alter: true }); // Se você mudar o model (adicionar/remover campo, mudar tipo de dado), ele tenta ajustar a tabela automaticamente.
    await sequelize.sync(); // apenas sincroniza sem apagar dados

    console.log('✅ Banco de dados sincronizado!');
  } catch (error) {
    console.error('❌ Erro ao sincronizar:', error);
  }
};

syncDatabase();

module.exports = { Produto };

const { Sequelize } = require('sequelize');

// Configuração definitiva: banco na nuvem Railway
const sequelize = new Sequelize('railway', 'root', 'WXNfxBJXvAhTTffFXFKbeZrpxiDQfWXO', {
  host: 'nozomi.proxy.rlwy.net',
  port: 44062,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

// Teste de conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão bem-sucedida com o banco Railway (produção)');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error.message);
  }
})();

module.exports = sequelize;

// tests/database.config.js
const { Sequelize } = require('sequelize');

// Configuração do banco em memória para testes
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

module.exports = sequelize;
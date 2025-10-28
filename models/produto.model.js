// models/produto.model.js
const { DataTypes } = require('sequelize');

// Exportamos uma função que define o modelo
module.exports = (sequelize) => {
  const Produto = sequelize.define('Produto', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'produtos',
    timestamps: false,
  });

  return Produto;
};
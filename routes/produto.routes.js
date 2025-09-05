const express = require('express');
const { Produto } = require('../models');

const router = express.Router();

// Criar produto
router.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    const novoProduto = await Produto.create({ nome, preco, estoque });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos produtos
router.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

// Buscar um produto por ID
router.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (produto) res.json(produto);
  else res.status(404).json({ error: 'Produto não encontrado' });
});

// Atualizar um produto
router.put('/produtos/:id', async (req, res) => {
  const { nome, preco, estoque } = req.body;
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;
  produto.estoque = estoque || produto.estoque;
  await produto.save();

  res.json(produto);
});

// Deletar um produto
router.delete('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

  await produto.destroy();
  res.json({ message: 'Produto deletado com sucesso' });
});

module.exports = router;

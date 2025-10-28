// routes/produto.routes.js
const express = require('express');
const router = express.Router();

// Middleware para injetar o modelo nas rotas
router.use((req, res, next) => {
  // Em ambiente de teste, usa o modelo global
  if (process.env.NODE_ENV === 'test' && global.testProduto) {
    req.Produto = global.testProduto;
  } else {
    // Em ambiente de produção, usa o modelo padrão
    const { Produto } = require('../models');
    req.Produto = Produto;
  }
  next();
});

// CREATE - Adicionar um novo produto
router.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    const produto = await req.Produto.create({ nome, preco, estoque });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Listar todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await req.Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Listar um produto por ID
router.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await req.Produto.findByPk(id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Atualizar um produto
router.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, estoque } = req.body;
    const produto = await req.Produto.findByPk(id);
    if (produto) {
      await produto.update({ nome, preco, estoque });
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Deletar um produto
router.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await req.Produto.findByPk(id);
    if (produto) {
      await produto.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const express = require('express');
const { Produto } = require('../models');

const router = express.Router();

// Criar produto
router.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    if (!nome || !preco || estoque === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, preco, estoque' });
    }

    const novoProduto = await Produto.create({ nome, preco, estoque });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('❌ Erro ao criar produto:', error);
    res.status(400).json({ error: error.message });
  }
});

// Listar todos produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Buscar um produto por ID
router.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) res.json(produto);
    else res.status(404).json({ error: 'Produto não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// Atualizar um produto
router.put('/produtos/:id', async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    // Atualiza apenas os campos enviados
    if (nome !== undefined) produto.nome = nome;
    if (preco !== undefined) produto.preco = preco;
    if (estoque !== undefined) produto.estoque = estoque;

    await produto.save();

    res.json(produto);
  } catch (error) {
    console.error('❌ Erro ao atualizar produto:', error);
    res.status(400).json({ error: error.message });
  }
});

// Deletar um produto
router.delete('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    await produto.destroy();
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;

// tests/products.test.js
const request = require('supertest');
const { Sequelize } = require('sequelize');
const { defineProduto } = require('../models');
const app = require('../index.js');

// Configurar banco em memória para os testes
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

// Criar o modelo com a instância de teste
const Produto = defineProduto(sequelize);

// Variável global para armazenar o modelo
global.testProduto = Produto;

// Sincronizar o banco antes dos testes
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Fechar a conexão após os testes
afterAll(async () => {
  await sequelize.close();
});

// Testes para produtos (CRUD completo)
describe('API de Produtos - CRUD', () => {
  let produtoId;

  // CREATE
  describe('POST /api/produtos', () => {
    it('Deve criar um novo produto', async () => {
      const newProduct = {
        nome: 'Produto Teste',
        preco: 29.99,
        estoque: 10
      };

      const response = await request(app)
        .post('/api/produtos')
        .send(newProduct);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(newProduct.nome);
      expect(response.body.preco).toBe(newProduct.preco);
      expect(response.body.estoque).toBe(newProduct.estoque);

      // Salva o ID para os próximos testes
      produtoId = response.body.id;
    });
  });

  // READ - Listar todos
  describe('GET /api/produtos', () => {
    it('Deve listar todos os produtos', async () => {
      const response = await request(app).get('/api/produtos');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // READ - Listar um por ID
  describe('GET /api/produtos/:id', () => {
    it('Deve listar um produto pelo ID', async () => {
      const response = await request(app).get(`/api/produtos/${produtoId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(produtoId);
      expect(response.body.nome).toBe('Produto Teste');
    });

    it('Deve retornar 404 para produto inexistente', async () => {
      const response = await request(app).get('/api/produtos/99999');
      expect(response.statusCode).toBe(404);
    });
  });

  // UPDATE
  describe('PUT /api/produtos/:id', () => {
    it('Deve atualizar um produto', async () => {
      const updatedProduct = {
        nome: 'Produto Atualizado',
        preco: 39.99,
        estoque: 20
      };

      const response = await request(app)
        .put(`/api/produtos/${produtoId}`)
        .send(updatedProduct);

      expect(response.statusCode).toBe(200);
      expect(response.body.nome).toBe(updatedProduct.nome);
      expect(response.body.preco).toBe(updatedProduct.preco);
      expect(response.body.estoque).toBe(updatedProduct.estoque);
    });

    it('Deve retornar 404 ao atualizar produto inexistente', async () => {
      const response = await request(app)
        .put('/api/produtos/99999')
        .send({ nome: 'Teste' });

      expect(response.statusCode).toBe(404);
    });
  });

  // DELETE
  describe('DELETE /api/produtos/:id', () => {
    it('Deve deletar um produto', async () => {
      const response = await request(app).delete(`/api/produtos/${produtoId}`);
      expect(response.statusCode).toBe(204);

      // Verifica se o produto foi realmente deletado
      const getResponse = await request(app).get(`/api/produtos/${produtoId}`);
      expect(getResponse.statusCode).toBe(404);
    });

    it('Deve retornar 404 ao deletar produto inexistente', async () => {
      const response = await request(app).delete('/api/produtos/99999');
      expect(response.statusCode).toBe(404);
    });
  });
});
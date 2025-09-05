const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produto.routes');

const app = express();

// CORS liberado para tudo (front + Postman + navegador)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para interpretar JSON (necessário para POST/PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api', produtoRoutes);

// Rota teste
app.get('/', (req, res) => {
  res.send('API de Loja funcionando 🚀');
});

// Porta 3000 local ou Render define via process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

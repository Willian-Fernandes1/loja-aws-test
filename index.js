// index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const produtoRoutes = require('./routes/produto.routes');
const app = express();

// CORS liberado para tudo
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', produtoRoutes);

// Rota principal - serve o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota API teste
app.get('/api/status', (req, res) => {
    res.json({ status: 'API de Loja funcionando 🚀', database: 'Railway MySQL' });
});

// Só inicia o servidor se não for ambiente de teste
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
}

// Exporta o app para os testes
module.exports = app;
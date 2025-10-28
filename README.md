# Loja AWS - Sistema de Gerenciamento de Produtos

Projeto web completo com backend em Node.js/Express e frontend vanilla, implementando um sistema de CRUD para produtos com testes automatizados e integração contínua.

## 🚀 Funcionalidades

- **CRUD Completo de Produtos**:
  - ✅ Criar produtos
  - ✅ Listar todos os produtos
  - ✅ Buscar produto por ID
  - ✅ Atualizar produtos
  - ✅ Deletar produtos

- **Frontend Responsivo**:
  - Formulário de cadastro de produtos
  - Tabela de listagem com ações de editar e excluir
  - Interface limpa e intuitiva

- **Testes Automatizados**:
  - ✅ Testes de unidade para o backend (Jest + Supertest)
  - ✅ Testes de integração para o frontend (Jest + JSDOM)
  - ✅ Cobertura completa das operações CRUD

- **Integração Contínua**:
  - ✅ Pipeline CI com GitHub Actions
  - ✅ Execução automática de testes
  - ✅ Validação do código em cada push/pull request

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados em memória para testes
- **MySQL** - Banco de dados de produção (Railway)
- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript Vanilla** - Lógica do frontend
- **Jest** - Framework de testes
- **JSDOM** - Simulação de ambiente de navegador

### CI/CD
- **GitHub Actions** - Automação de pipeline
- **Cross-env** - Configuração de variáveis de ambiente

## 📦 Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Passos
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Willian-Fernandes1/loja-aws.git
   cd loja-aws

# Loja AWS - Sistema de Gerenciamento de Produtos

Projeto web completo com backend em Node.js/Express e frontend vanilla, implementando um sistema de CRUD para produtos com testes automatizados, integração contínua e deploy automático.

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

- **Integração Contínua e Deploy**:
  - ✅ Pipeline CI com GitHub Actions
  - ✅ Execução automática de testes
  - ✅ Deploy automático para produção com Render
  - ✅ Validação do código em cada push/pull request

## 🌐 Aplicação no Ar

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados em memória para testes
- **PostgreSQL** - Banco de dados de produção (Render)
- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript Vanilla** - Lógica do frontend
- **Jest** - Framework de testes
- **JSDOM** - Simulação de ambiente de navegador

### CI/CD e Deploy
- **GitHub Actions** - Automação de pipeline
- **Render** - Plataforma de deploy na nuvem
- **Cross-env** - Configuração de variáveis de ambiente
- **Webhooks** - Integração GitHub-Render

## 📦 Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Passos
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Willian-Fernandes1/loja-aws-testes.git
   cd loja-aws-testes

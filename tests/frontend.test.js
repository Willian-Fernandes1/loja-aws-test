// tests/frontend.test.js
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Carrega o HTML principal
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000',
  pretendToBeVisual: true
});
global.document = dom.window.document;
global.window = dom.window;

// Mock do fetch para evitar chamadas reais
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve([])
}));

// Mock do console.log
const originalLog = console.log;
console.log = jest.fn();

// Mock do alert
global.alert = jest.fn();

// Mock do confirm
global.confirm = jest.fn(() => true);

// Carrega o script principal
require('../public/js/index.js');

describe('Frontend da Loja AWS', () => {
  it('Deve ter título correto', () => {
    expect(document.title).toBe('Sistema de Gerenciamento de Produtos');
  });

  it('Deve ter formulário de cadastro de produtos', () => {
    const form = document.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('Deve ter campos de nome, preço e estoque', () => {
    const nomeInput = document.querySelector('input[name="nome"]');
    const precoInput = document.querySelector('input[name="preco"]');
    const estoqueInput = document.querySelector('input[name="estoque"]');
    
    expect(nomeInput).toBeTruthy();
    expect(precoInput).toBeTruthy();
    expect(estoqueInput).toBeTruthy();
  });

  it('Deve ter botão de submit', () => {
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    // Aceita "adicionar produto" ou as outras opções
    expect(submitButton.textContent.toLowerCase()).toMatch(/cadastrar|salvar|enviar|adicionar/);
  });

  it('Deve ter tabela de produtos', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('Deve executar o JavaScript', () => {
    expect(console.log).toHaveBeenCalled();
  });

  afterAll(() => {
    // Limpar o JSDOM
    if (global.window) {
      global.window.close();
    }
    
    // Restaurar o console.log original
    console.log = originalLog;
  });
});
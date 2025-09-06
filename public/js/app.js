class ProdutoManager {
    constructor() {
        this.apiURL = '/api/produtos';
        this.init();
    }

    init() {
        this.carregarProdutos();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Formulário de adição
        document.getElementById('produtoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarProduto();
        });

        // Formulário de edição
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarEdicao();
        });

        // Fechar modal
        document.querySelector('.close').addEventListener('click', () => {
            this.fecharModal();
        });

        // Fechar modal ao clicar fora
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('editModal');
            if (e.target === modal) {
                this.fecharModal();
            }
        });
    }

    async carregarProdutos() {
        try {
            const response = await fetch(this.apiURL);
            const produtos = await response.json();
            this.exibirProdutos(produtos);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            alert('Erro ao carregar produtos');
        }
    }

    exibirProdutos(produtos) {
        const tbody = document.getElementById('produtosBody');
        tbody.innerHTML = '';

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
                <td>${produto.estoque}</td>
                <td>
                    <button class="btn-edit" onclick="produtoManager.editarProduto(${produto.id})">Editar</button>
                    <button class="btn-delete" onclick="produtoManager.deletarProduto(${produto.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    async adicionarProduto() {
        const form = document.getElementById('produtoForm');
        const formData = new FormData(form);
        
        const produto = {
            nome: formData.get('nome'),
            preco: parseFloat(formData.get('preco')),
            estoque: parseInt(formData.get('estoque'))
        };

        try {
            const response = await fetch(this.apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                form.reset();
                this.carregarProdutos();
            } else {
                const error = await response.json();
                alert('Erro ao adicionar produto: ' + error.error);
            }
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            alert('Erro ao adicionar produto');
        }
    }

    async editarProduto(id) {
        try {
            const response = await fetch(`${this.apiURL}/${id}`);
            const produto = await response.json();

            document.getElementById('editId').value = produto.id;
            document.getElementById('editNome').value = produto.nome;
            document.getElementById('editPreco').value = produto.preco;
            document.getElementById('editEstoque').value = produto.estoque;

            document.getElementById('editModal').style.display = 'block';
        } catch (error) {
            console.error('Erro ao carregar produto para edição:', error);
            alert('Erro ao carregar produto para edição');
        }
    }

    async salvarEdicao() {
        const id = document.getElementById('editId').value;
        const produto = {
            nome: document.getElementById('editNome').value,
            preco: parseFloat(document.getElementById('editPreco').value),
            estoque: parseInt(document.getElementById('editEstoque').value)
        };

        try {
            const response = await fetch(`${this.apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                this.fecharModal();
                this.carregarProdutos();
            } else {
                const error = await response.json();
                alert('Erro ao atualizar produto: ' + error.error);
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto');
        }
    }

    async deletarProduto(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                const response = await fetch(`${this.apiURL}/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Produto excluído com sucesso!');
                    this.carregarProdutos();
                } else {
                    const error = await response.json();
                    alert('Erro ao excluir produto: ' + error.error);
                }
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto');
            }
        }
    }

    fecharModal() {
        document.getElementById('editModal').style.display = 'none';
    }
}

// Inicializar o gerenciador de produtos
const produtoManager = new ProdutoManager();
